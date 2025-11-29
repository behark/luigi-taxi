export interface BookingFormData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date;
  pickupTime: string;
  passengers: number;
  vehicleType: 'standard' | 'executive' | 'minivan';
  serviceType: 'oneway' | 'roundtrip' | 'hourly' | 'airport';
  returnDate?: Date;
  returnTime?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: 'cash' | 'card' | 'online';
  specialRequests?: string;
}

export interface BookingApiRequest {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string; // ISO string for API
  pickupTime: string;
  passengers: number;
  vehicleType: 'standard' | 'executive' | 'minivan';
  serviceType: 'oneway' | 'roundtrip' | 'hourly' | 'airport';
  returnDate?: string;
  returnTime?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: 'cash' | 'card' | 'online';
  specialRequests?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingReference?: string;
  estimatedPrice?: number;
  errors?: Array<{ path: string[]; message: string }>;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface VehicleType {
  id: string;
  name: string;
  description: string;
  capacity: number;
  image: string;
  imageAlt: string;
  imageFallback: string;
  priceMultiplier: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageFallback: string;
  features: string[];
}

export interface NavigationItem {
  href: string;
  label: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}