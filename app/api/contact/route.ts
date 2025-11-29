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

    // Send emails (non-blocking)
    const emailPromises = [
      sendContactFormEmail(contactData).catch((err) => {
        console.error('Failed to send contact form email to admin:', err);
        return { success: false, error: err.message };
      }),
      sendContactAutoReply(contactData).catch((err) => {
        console.error('Failed to send auto-reply email:', err);
        return { success: false, error: err.message };
      }),
    ];

    // Execute emails in background
    Promise.all(emailPromises).then((results) => {
      const [adminResult, autoReplyResult] = results;
      if (adminResult.success) {
        console.log(`✉️ Contact form notification sent to admin`);
      }
      if (autoReplyResult.success) {
        console.log(`✉️ Auto-reply sent to ${contactData.email}`);
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! We'll get back to you soon."
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
