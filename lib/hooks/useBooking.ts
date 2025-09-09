'use client';

import { useState } from 'react';
import { BookingFormData } from '@/types';
import { BookingService } from '@/services/booking';
import toast from 'react-hot-toast';

export const useBooking = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBooking = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await BookingService.submitBooking(data);
      
      if (result.success) {
        toast.success('Booking submitted successfully! We will contact you shortly.');
        return result;
      } else {
        throw new Error(result.message || 'Failed to submit booking');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePrice = (distance: number, vehicleType: string, duration?: number) => {
    return BookingService.calculateEstimatedPrice(distance, vehicleType, duration);
  };

  return {
    isSubmitting,
    submitBooking,
    calculatePrice,
  };
};