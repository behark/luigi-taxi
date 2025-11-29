import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { bookingApiSchema } from '@/lib/validations/booking';
import { BUSINESS_INFO } from '@/lib/constants/business';
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from '@/lib/utils/rate-limit';

// Helper functions for formatting
function getVehicleName(type: string): string {
  const names: Record<string, string> = {
    standard: 'Standard Sedan',
    executive: 'Executive Car',
    minivan: 'Minivan',
  };
  return names[type] || type;
}

function getServiceTypeName(type: string): string {
  const names: Record<string, string> = {
    oneway: 'One Way',
    roundtrip: 'Round Trip',
    hourly: 'Hourly Rate',
    airport: 'Airport Transfer',
  };
  return names[type] || type;
}

function getPaymentMethodName(method: string): string {
  const names: Record<string, string> = {
    cash: 'Cash Payment',
    card: 'Credit/Debit Card',
    online: 'Online Payment',
  };
  return names[method] || method;
}

// Calculate price based on booking details
function calculatePrice(booking: {
  vehicleType: string;
  serviceType: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
}): number {
  const { pricing } = BUSINESS_INFO;
  const baseRate =
    pricing.baseRates[booking.vehicleType as keyof typeof pricing.baseRates] ||
    pricing.baseRates.standard;

  // Estimate distance based on location complexity
  // Note: In production, use Google Maps Distance Matrix API for accurate pricing
  const estimatedDistance = Math.max(
    5,
    Math.min(50, Math.floor((booking.pickupLocation.length + booking.dropoffLocation.length) / 2))
  );

  // Get service multiplier
  const serviceMultiplier =
    pricing.serviceMultipliers[
      booking.serviceType as keyof typeof pricing.serviceMultipliers
    ] || 1;

  // Calculate night surcharge
  const hour = parseInt(booking.pickupTime.split(':')[0], 10);
  const isNightTime =
    hour >= pricing.nightHoursStart || hour < pricing.nightHoursEnd;
  const nightMultiplier = isNightTime ? pricing.nightSurchargeMultiplier : 1;

  // Calculate total
  const estimated = estimatedDistance * baseRate * serviceMultiplier * nightMultiplier;
  return Math.max(pricing.minimumFare, Math.round(estimated));
}

// Generate booking confirmation email content (for future email integration)
function generateEmailContent(
  bookingData: z.infer<typeof bookingApiSchema>,
  bookingRef: string,
  estimatedPrice: number
): string {
  const pickupDate =
    bookingData.pickupDate instanceof Date
      ? bookingData.pickupDate.toLocaleDateString('de-AT')
      : new Date(bookingData.pickupDate).toLocaleDateString('de-AT');

  return `
Booking Confirmation - ${BUSINESS_INFO.name}

Dear ${bookingData.customerName},

Thank you for choosing ${BUSINESS_INFO.name}! Your booking has been received and is being processed.

Booking Details:
Reference: ${bookingRef}
Pickup: ${bookingData.pickupLocation}
Destination: ${bookingData.dropoffLocation}
Date: ${pickupDate}
Time: ${bookingData.pickupTime}
Passengers: ${bookingData.passengers}
Vehicle: ${getVehicleName(bookingData.vehicleType)}
Service Type: ${getServiceTypeName(bookingData.serviceType)}
Payment: ${getPaymentMethodName(bookingData.paymentMethod)}
${bookingData.specialRequests ? `Special Requests: ${bookingData.specialRequests}` : ''}

Estimated Price: ${BUSINESS_INFO.currencySymbol}${estimatedPrice}

We will contact you within 15 minutes to confirm your booking and provide driver details.

For any questions, please call us at ${BUSINESS_INFO.phone}.

Best regards,
${BUSINESS_INFO.name} Team
  `.trim();
}

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

    // Calculate estimated price
    const estimatedPrice = calculatePrice({
      vehicleType: bookingData.vehicleType,
      serviceType: bookingData.serviceType,
      pickupLocation: bookingData.pickupLocation,
      dropoffLocation: bookingData.dropoffLocation,
      pickupTime: bookingData.pickupTime,
    });

    // Prepare booking object for storage
    const booking = {
      ...bookingData,
      bookingReference: bookingRef,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      estimatedPrice,
    };

    // Generate email content (ready for email service integration)
    const _emailContent = generateEmailContent(bookingData, bookingRef, estimatedPrice);

    // Production implementation checklist:
    // 1. Store booking in database (Prisma, Drizzle, etc.)
    // 2. Send confirmation email (Resend, SendGrid, etc.)
    // 3. Send SMS notification (Twilio, etc.)
    // 4. Process payment if online (Stripe)
    // 5. Notify admin/drivers

    // Development logging only
    if (process.env.NODE_ENV === 'development') {
      console.log('New booking received:', {
        reference: bookingRef,
        customer: bookingData.customerName,
        pickup: bookingData.pickupLocation,
        destination: bookingData.dropoffLocation,
        date: booking.createdAt,
        estimatedPrice,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking request received successfully! We'll confirm within 15 minutes.",
        bookingReference: bookingRef,
        estimatedPrice: booking.estimatedPrice,
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
      console.error('Booking submission error:', error);
    }

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
