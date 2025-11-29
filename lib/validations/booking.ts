import { z } from 'zod';

// Austrian phone number regex: supports +43, 0043, or local format
const austrianPhoneRegex = /^(\+43|0043|0)?[1-9][0-9]{3,14}$/;

// Sanitize phone number for validation (remove spaces, dashes, parentheses)
const sanitizePhone = (phone: string) => phone.replace(/[\s\-\(\)]/g, '');

// Phone validation that accepts common Austrian formats
export const phoneValidation = z
  .string()
  .min(10, 'Phone number must be at least 10 characters')
  .max(20, 'Phone number is too long')
  .refine(
    (val) => austrianPhoneRegex.test(sanitizePhone(val)),
    'Please enter a valid Austrian phone number (e.g., +43 660 123 4567)'
  );

// Email validation with additional checks
export const emailValidation = z
  .string()
  .email('Please enter a valid email address')
  .max(254, 'Email address is too long')
  .refine(
    (val) => !val.includes('..') && !val.startsWith('.') && !val.endsWith('.'),
    'Please enter a valid email address'
  );

// Booking form schema (client-side with Date objects)
export const bookingFormSchema = z.object({
  pickupLocation: z
    .string()
    .min(5, 'Pickup location must be at least 5 characters')
    .max(200, 'Pickup location is too long'),
  dropoffLocation: z
    .string()
    .min(5, 'Dropoff location must be at least 5 characters')
    .max(200, 'Dropoff location is too long'),
  pickupDate: z.date({ message: 'Please select a pickup date' }),
  pickupTime: z.string().min(1, 'Please select a pickup time'),
  passengers: z
    .number()
    .min(1, 'At least 1 passenger required')
    .max(8, 'Maximum 8 passengers'),
  vehicleType: z.enum(['standard', 'executive', 'minivan']),
  serviceType: z.enum(['oneway', 'roundtrip', 'hourly', 'airport']),
  returnDate: z.date().optional(),
  returnTime: z.string().optional(),
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  customerEmail: emailValidation,
  customerPhone: phoneValidation,
  paymentMethod: z.enum(['cash', 'card', 'online']),
  specialRequests: z.string().max(1000, 'Special requests text is too long').optional(),
});

// API booking schema (server-side with date strings)
export const bookingApiSchema = z.object({
  pickupLocation: z.string().min(5).max(200),
  dropoffLocation: z.string().min(5).max(200),
  pickupDate: z.string().transform((str) => new Date(str)),
  pickupTime: z.string().min(1),
  passengers: z.number().min(1).max(8),
  vehicleType: z.enum(['standard', 'executive', 'minivan']),
  serviceType: z.enum(['oneway', 'roundtrip', 'hourly', 'airport']),
  returnDate: z
    .string()
    .transform((str) => (str ? new Date(str) : undefined))
    .optional(),
  returnTime: z.string().optional(),
  customerName: z.string().min(2).max(100),
  customerEmail: emailValidation,
  customerPhone: phoneValidation,
  paymentMethod: z.enum(['cash', 'card', 'online']),
  specialRequests: z.string().max(1000).optional(),
});

// Legacy schema export for backward compatibility
export const bookingSchema = bookingFormSchema;

// Contact form schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: emailValidation,
  phone: phoneValidation,
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long'),
});

// Type exports
export type BookingFormInput = z.infer<typeof bookingFormSchema>;
export type BookingApiInput = z.infer<typeof bookingApiSchema>;
export type ContactFormInput = z.infer<typeof contactSchema>;
