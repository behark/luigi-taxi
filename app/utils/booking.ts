export interface BookingData {
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  passengers: string;
  luggage: string;
  serviceType: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export const validateBooking = (data: BookingData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!data.pickupLocation) errors.push('Pickup location is required');
  if (!data.dropoffLocation) errors.push('Dropoff location is required');
  if (!data.date) errors.push('Date is required');
  if (!data.time) errors.push('Time is required');
  if (!data.name) errors.push('Name is required');
  if (!data.email) errors.push('Email is required');
  if (!data.phone) errors.push('Phone number is required');

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Phone validation - basic format
  const phoneRegex = /^\+?[\d\s-]+$/;
  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.push('Invalid phone number format');
  }

  // Date validation
  const selectedDate = new Date(data.date + 'T' + data.time);
  const now = new Date();
  if (selectedDate < now) {
    errors.push('Selected date and time must be in the future');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const formatBookingConfirmation = (data: BookingData): string => {
  return `
Booking Confirmation

Dear ${data.name},

Thank you for choosing Luigi Taxi. Your booking has been received with the following details:

Pickup: ${data.pickupLocation}
Dropoff: ${data.dropoffLocation}
Date: ${data.date}
Time: ${data.time}
Passengers: ${data.passengers}
Service Type: ${data.serviceType}
${data.luggage !== '0' ? `Luggage: ${data.luggage} pieces` : ''}
${data.notes ? `\nSpecial Notes: ${data.notes}` : ''}

We will contact you shortly to confirm your booking.

Contact Details:
Phone: ${data.phone}
Email: ${data.email}

If you need to modify or cancel your booking, please call us at +43 660 900 2700.

Best regards,
Luigi Taxi
Wr. Str. 60, 2700 Wiener Neustadt
  `.trim();
};

export const calculatePrice = async (
  pickup: string,
  dropoff: string,
  serviceType: string,
  passengers: number,
  luggage: number
): Promise<number> => {
  // This is a placeholder implementation
  // In a real application, you would:
  // 1. Use Google Maps API to calculate distance
  // 2. Apply your pricing formula based on:
  //    - Distance
  //    - Service type (standard, business, van)
  //    - Time of day (night rate)
  //    - Number of passengers
  //    - Amount of luggage
  //    - Special requirements
  
  const baseRates = {
    standard: 4,
    business: 6,
    van: 8,
    airport: 10
  };

  // Placeholder: return a dummy calculation
  const baseRate = baseRates[serviceType as keyof typeof baseRates] || baseRates.standard;
  const estimatedDistance = 10; // km
  
  // Add fees based on passengers and luggage
  const passengerFee = Math.max(0, passengers - 4) * 5; // €5 per extra passenger over 4
  const luggageFee = luggage * 2; // €2 per piece of luggage
  
  const price = (baseRate * estimatedDistance) + passengerFee + luggageFee;

  return price;
};
