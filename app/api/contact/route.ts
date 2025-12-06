import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { contactSchema } from '@/lib/validations/booking';
import { BUSINESS_INFO } from '@/lib/constants/business';
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from '@/lib/utils/rate-limit';
import {
  sendContactFormEmail,
  sendContactAutoReply,
} from '@/services/email';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientId = getClientIdentifier(request);
    const rateLimitResult = checkRateLimit(clientId, RATE_LIMITS.contact);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many messages sent. Please wait a moment before trying again.',
          retryAfter: Math.ceil(rateLimitResult.resetIn / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(rateLimitResult.resetIn / 1000)),
          },
        }
      );
    }

    const body = await request.json();
    const contactData = contactSchema.parse(body);

    // Log contact submission
    console.log('Contact form submission:', {
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      timestamp: new Date().toISOString(),
    });

    // Send emails with proper error handling
    const emailResults = await Promise.allSettled([
      sendContactFormEmail(contactData),
      sendContactAutoReply(contactData),
    ]);

    const [adminResult, autoReplyResult] = emailResults;

    // Log email results
    if (adminResult.status === 'fulfilled' && adminResult.value.success) {
      console.log(`✉️ Contact form notification sent to admin`);
    } else {
      console.error(`❌ Failed to send contact form to admin:`,
        adminResult.status === 'fulfilled' ? adminResult.value.error : adminResult.reason
      );
    }

    if (autoReplyResult.status === 'fulfilled' && autoReplyResult.value.success) {
      console.log(`✉️ Auto-reply sent to ${contactData.email}`);
    } else {
      console.error(`❌ Failed to send auto-reply:`,
        autoReplyResult.status === 'fulfilled' ? autoReplyResult.value.error : autoReplyResult.reason
      );
    }

    // Determine response message based on email success
    const autoReplyFailed = autoReplyResult.status === 'rejected' ||
      (autoReplyResult.status === 'fulfilled' && !autoReplyResult.value.success);

    let message = "Message sent successfully! We'll get back to you soon.";
    let warning: string | undefined;

    if (autoReplyFailed) {
      message = "Your message was received, but we couldn't send the confirmation email.";
      warning = `We received your message and will respond to ${contactData.email} shortly.`;
    }

    return NextResponse.json(
      {
        success: true,
        message,
        warning,
        emailSent: !autoReplyFailed,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please check your form details and try again.',
          errors: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong. Please try again or call us at ${BUSINESS_INFO.phone}.`
      },
      { status: 500 }
    );
  }
}
