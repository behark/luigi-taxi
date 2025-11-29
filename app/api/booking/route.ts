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
    console.log('New booking received:', {
      reference: bookingRef,
      customer: bookingData.customerName,
      route: `${bookingData.pickupLocation} → ${bookingData.dropoffLocation}`,
      distance: `${priceCalculation.distanceKm} km`,
      date: `${pickupDate} ${bookingData.pickupTime}`,
      price: `€${priceCalculation.totalPrice}`,
      nightSurcharge: priceCalculation.priceBreakdown.nightSurcharge,
    });

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
