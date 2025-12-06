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

export async function POST(request: NextRequest) {
  try {
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

    // Prepare booking object
    const booking = {
      ...bookingData,
      bookingReference: bookingRef,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      estimatedPrice: priceCalculation.totalPrice,
      distanceKm: priceCalculation.distanceKm,
    };

    // Log booking (in production, save to database)
    console.log('New booking received:', booking);

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

    // Send emails with proper error handling
    const emailResults = await Promise.allSettled([
      sendBookingConfirmationEmail(emailData),
      sendBookingNotificationToAdmin(emailData),
    ]);

    const [customerResult, adminResult] = emailResults;

    // Log email results
    if (customerResult.status === 'fulfilled' && customerResult.value.success) {
      console.log(`✉️ Customer confirmation sent for ${bookingRef}`);
    } else {
      console.error(`❌ Failed to send customer confirmation for ${bookingRef}:`,
        customerResult.status === 'fulfilled' ? customerResult.value.error : customerResult.reason
      );
    }

    if (adminResult.status === 'fulfilled' && adminResult.value.success) {
      console.log(`✉️ Admin notification sent for ${bookingRef}`);
    } else {
      console.error(`❌ Failed to send admin notification for ${bookingRef}:`,
        adminResult.status === 'fulfilled' ? adminResult.value.error : adminResult.reason
      );
    }

    // Determine response message based on email success
    const customerEmailFailed = customerResult.status === 'rejected' ||
      (customerResult.status === 'fulfilled' && !customerResult.value.success);

    let message = "Booking request received successfully! We'll confirm within 15 minutes.";
    let warning: string | undefined;

    if (customerEmailFailed) {
      message = `Booking ${bookingRef} received, but we couldn't send the confirmation email.`;
      warning = `Please save your booking reference: ${bookingRef}. We'll contact you via phone at ${bookingData.customerPhone}.`;
    }

    return NextResponse.json(
      {
        success: true,
        message,
        warning,
        bookingReference: bookingRef,
        estimatedPrice: priceCalculation.totalPrice,
        distance: priceCalculation.priceBreakdown.distance,
        duration: priceCalculation.priceBreakdown.duration,
        emailSent: !customerEmailFailed,
      },
      {
        status: 200,
        headers: {
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
