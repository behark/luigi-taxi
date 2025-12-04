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
import { prisma } from '@/lib/prisma';
import { verifyCors, handleCorsPreflightRequest, getCorsHeaders } from '@/lib/utils/cors';
import { checkBodySize } from '@/lib/utils/body-size';

/**
 * Handle CORS preflight request
 */
export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflightRequest(request);
}

export async function POST(request: NextRequest) {
  try {
    // CORS check
    const corsError = verifyCors(request);
    if (corsError) {
      return corsError;
    }

    // Body size check
    const bodySizeError = await checkBodySize(request);
    if (bodySizeError) {
      return bodySizeError;
    }

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

    // Save contact form submission to database
    const contact = await prisma.contact.create({
      data: {
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || null,
        subject: contactData.subject,
        message: contactData.message,
        status: 'NEW',
      },
    });

    console.log('✅ Contact form saved to database:', contact.id);

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
          ...getCorsHeaders(request),
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
