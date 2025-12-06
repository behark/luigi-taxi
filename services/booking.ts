import { BookingFormData, ContactFormData } from '@/types';

export class BookingService {
  private static BASE_URL = '/api';

  static async submitBooking(data: BookingFormData): Promise<{ success: boolean; message?: string; id?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit booking');
      }

      return result;
    } catch (error) {
      console.error('Booking submission error:', error);
      throw error;
    }
  }

  static async submitContact(data: ContactFormData): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit contact form');
      }

      return result;
    } catch (error) {
      console.error('Contact submission error:', error);
      throw error;
    }
  }

  static calculateEstimatedPrice(
    distance: number,
    vehicleType: string,
    duration?: number
  ): number {
    const basePrices = {
      standard: 2.5,
      executive: 3.5,
      minivan: 4.0,
    };

    const basePrice = basePrices[vehicleType as keyof typeof basePrices] || basePrices.standard;
    const distancePrice = distance * basePrice;
    const timePrice = duration ? (duration / 60) * 15 : 0; // €15 per hour waiting

    return Math.round((distancePrice + timePrice) * 100) / 100;
  }
}