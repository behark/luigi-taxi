import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { bookingApiSchema } from '@/lib/validations/booking';
import { BUSINESS_INFO } from '@/lib/constants/business';
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from '@/lib/utils/rate-limit';
import { calculatePrice } from '@/services/maps';
import {
  sendBookingConfirmationEmail,
  sendBookingNotificationToAdmin,
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
    const rateLimitResult = checkRateLimit(clientId, RATE_LIMITS.booking);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many booking requests. Please wait a moment before trying again.',
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
    const bookingData = bookingApiSchema.parse(body);

    // Generate booking reference
    const bookingRef = `LT${Date.now().toString().slice(-8)}${Math.random().toString(36).slice(-3).toUpperCase()}`;

    // Calculate price using Google Maps (or fallback estimation)
    const priceCalculation = await calculatePrice(
      bookingData.pickupLocation,
      bookingData.dropoffLocation,
      {
        vehicleType: bookingData.vehicleType,
        serviceType: bookingData.serviceType,
        pickupTime: bookingData.pickupTime,
      }
    );

    // Format pickup date for display
    const pickupDate =
      bookingData.pickupDate instanceof Date
        ? bookingData.pickupDate.toLocaleDateString('de-AT')
        : new Date(bookingData.pickupDate).toLocaleDateString('de-AT');

    // Save booking to database
    await prisma.booking.create({
      data: {
        pickupLocation: bookingData.pickupLocation,
        dropoffLocation: bookingData.dropoffLocation,
        date: bookingData.pickupDate,
        time: bookingData.pickupTime,
        passengers: bookingData.passengers,
        luggage: bookingData.luggage || 0,
        name: bookingData.customerName,
        email: bookingData.customerEmail,
        phone: bookingData.customerPhone,
        notes: bookingData.specialRequests || null,
        estimatedPrice: priceCalculation.totalPrice,
        status: 'PENDING',
      },
    });

    console.log('✅ Booking saved to database:', bookingRef);

    // Prepare email data
    const emailData = {
      bookingReference: bookingRef,
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone,
      pickupLocation: bookingData.pickupLocation,
      dropoffLocation: bookingData.dropoffLocation,
      pickupDate,
      pickupTime: bookingData.pickupTime,
      passengers: bookingData.passengers,
      vehicleType: bookingData.vehicleType,
      serviceType: bookingData.serviceType,
      paymentMethod: bookingData.paymentMethod,
      estimatedPrice: priceCalculation.totalPrice,
      specialRequests: bookingData.specialRequests,
    };

    // Send emails (non-blocking - don't wait for completion to respond)
    const emailPromises = [
      sendBookingConfirmationEmail(emailData).catch((err) => {
        console.error('Failed to send customer confirmation email:', err);
        return { success: false, error: err.message };
      }),
      sendBookingNotificationToAdmin(emailData).catch((err) => {
        console.error('Failed to send admin notification email:', err);
        return { success: false, error: err.message };
      }),
    ];

    // Execute emails in background
    Promise.all(emailPromises).then((results) => {
      const [customerResult, adminResult] = results;
      if (customerResult.success) {
        console.log(`✉️ Customer confirmation sent for ${bookingRef}`);
      }
      if (adminResult.success) {
        console.log(`✉️ Admin notification sent for ${bookingRef}`);
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking request received successfully! We'll confirm within 15 minutes.",
        bookingReference: bookingRef,
        estimatedPrice: priceCalculation.totalPrice,
        distance: priceCalculation.priceBreakdown.distance,
        duration: priceCalculation.priceBreakdown.duration,
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
    console.error('Booking submission error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please check your booking details and try again.',
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
        message: `Failed to process booking. Please try again or call us directly at ${BUSINESS_INFO.phone}.`,
      },
      { status: 500 }
    );
  }
}
