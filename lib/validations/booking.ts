import { z } from 'zod';

export const bookingSchema = z.object({
  pickupLocation: z.string().min(3, 'Pickup location must be at least 3 characters'),
  destination: z.string().min(3, 'Destination must be at least 3 characters'),
  pickupDate: z.string().min(1, 'Please select a pickup date'),
  pickupTime: z.string().min(1, 'Please select a pickup time'),
  passengers: z.number().min(1, 'At least 1 passenger required').max(8, 'Maximum 8 passengers'),
  vehicleType: z.enum(['sedan', 'executive', 'minivan']),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  specialRequests: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});