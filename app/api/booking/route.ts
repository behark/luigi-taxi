import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bookingSchema = z.object({
  pickupLocation: z.string().min(5),
  dropoffLocation: z.string().min(5),
  pickupDate: z.string().transform((str) => new Date(str)),
  pickupTime: z.string(),
  passengers: z.number().min(1).max(8),
  vehicleType: z.enum(['standard', 'executive', 'minivan']),
  serviceType: z.enum(['oneway', 'roundtrip', 'hourly', 'airport']),
  returnDate: z.string().transform((str) => str ? new Date(str) : undefined).optional(),
  returnTime: z.string().optional(),
  specialRequests: z.string().optional(),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  paymentMethod: z.enum(['cash', 'card', 'online']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bookingData = bookingSchema.parse(body);

    // Generate booking reference
    const bookingRef = `LT${Date.now().toString().slice(-8)}${Math.random().toString(36).slice(-3).toUpperCase()}`;

    // Here you would typically:
    // 1. Store booking in database
    // 2. Send confirmation email
    // 3. Notify drivers
    // 4. Process payment if online
    // 5. Send SMS confirmation

    // For now, we'll log the booking and simulate processing
    const booking = {
      ...bookingData,
      bookingReference: bookingRef,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedPrice: calculatePrice(bookingData),
    };

    console.log('New booking received:', booking);

    // Simulate booking confirmation email content
    /* const emailContent = `
      Booking Confirmation - Luigi Taxi
      
      Dear ${bookingData.customerName},
      
      Thank you for choosing Luigi Taxi! Your booking has been received and is being processed.
      
      Booking Details:
      Reference: ${bookingRef}
      Pickup: ${bookingData.pickupLocation}
      Destination: ${bookingData.dropoffLocation}
      Date: ${bookingData.pickupDate.toLocaleDateString('de-AT')}
      Time: ${bookingData.pickupTime}
      Passengers: ${bookingData.passengers}
      Vehicle: ${getVehicleName(bookingData.vehicleType)}
      Service Type: ${getServiceTypeName(bookingData.serviceType)}
      Payment: ${getPaymentMethodName(bookingData.paymentMethod)}
      ${bookingData.specialRequests ? `Special Requests: ${bookingData.specialRequests}` : ''}
      
      Estimated Price: €${booking.estimatedPrice}
      
      We will contact you within 15 minutes to confirm your booking and provide driver details.
      
      For any questions, please call us at +43 660 900 2700.
      
      Best regards,
      Luigi Taxi Team
      
      This booking was made on ${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' })}
    `; */

    // TODO: Replace with actual services
    // await sendEmail({
    //   to: bookingData.customerEmail,
    //   subject: `Booking Confirmation - ${bookingRef}`,
    //   text: emailContent,
    // });

    // await sendSMS({
    //   to: bookingData.customerPhone,
    //   message: `Luigi Taxi: Booking ${bookingRef} received. We'll confirm within 15 minutes. Call +43 660 900 2700 for urgent matters.`,
    // });

    // await storeBooking(booking);

    return NextResponse.json({
      success: true,
      message: 'Booking request received successfully! We\'ll confirm within 15 minutes.',
      bookingReference: bookingRef,
      estimatedPrice: booking.estimatedPrice,
    }, { status: 200 });

  } catch (error) {
    console.error('Booking submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid booking data',
        errors: error.issues
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to process booking. Please try again or call us directly.'
    }, { status: 500 });
  }
}

function calculatePrice(booking: { vehicleType: string; serviceType: string; pickupLocation: string; dropoffLocation: string; pickupTime: string }): number {
  const vehicleRates = {
    standard: 2.5,
    executive: 3.5,
    minivan: 4.0
  };

  // Simple distance estimation (in real app, use Google Maps API)
  const estimatedDistance = Math.max(5, Math.min(50, 
    booking.pickupLocation.length + booking.dropoffLocation.length
  ));

  const baseRate = vehicleRates[booking.vehicleType as keyof typeof vehicleRates];
  
  let multiplier = 1;
  if (booking.serviceType === 'roundtrip') multiplier = 1.8;
  if (booking.serviceType === 'hourly') multiplier = 2.5;
  if (booking.serviceType === 'airport') multiplier = 1.2;

  // Time-based surcharge (night hours: 22:00-06:00)
  const hour = parseInt(booking.pickupTime.split(':')[0]);
  if (hour >= 22 || hour < 6) multiplier *= 1.2;

  const estimated = estimatedDistance * baseRate * multiplier;
  return Math.round(estimated);
}

// Helper functions for future email templates
// export function getVehicleName(type: string): string {
//   const names = {
//     standard: 'Standard Sedan',
//     executive: 'Executive Car',
//     minivan: 'Minivan'
//   };
//   return names[type as keyof typeof names] || type;
// }

// export function getServiceTypeName(type: string): string {
//   const names = {
//     oneway: 'One Way',
//     roundtrip: 'Round Trip',
//     hourly: 'Hourly Rate',
//     airport: 'Airport Transfer'
//   };
//   return names[type as keyof typeof names] || type;
// }

// export function getPaymentMethodName(method: string): string {
//   const names = {
//     cash: 'Cash Payment',
//     card: 'Credit/Debit Card',
//     online: 'Online Payment'
//   };
//   return names[method as keyof typeof names] || method;
// }
