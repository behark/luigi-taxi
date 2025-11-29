import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { contactSchema } from '@/lib/validations/booking';
import { BUSINESS_INFO } from '@/lib/constants/business';
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from '@/lib/utils/rate-limit';

// Generate contact notification email content (for future email integration)
function generateContactEmailContent(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  return `
New contact form submission from ${BUSINESS_INFO.name} website:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}

Message:
${data.message}

Submitted at: ${new Date().toLocaleString('de-AT', {
  timeZone: BUSINESS_INFO.timezone
})}
  `.trim();
}

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

    // Generate email content (ready for email service integration)
    const _emailContent = generateContactEmailContent(contactData);

    // Production implementation checklist:
    // 1. Send email notification (Resend, SendGrid, etc.)
    // 2. Store in database for tracking
    // 3. Send to CRM system if applicable
    // 4. Send auto-reply to customer

    // Development logging only
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', {
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        timestamp: new Date().toISOString(),
      });
    }

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
    // Development logging only
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact form error:', error);
    }

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
