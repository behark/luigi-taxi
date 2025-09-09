export interface BookingFormData {
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  vehicleType: 'sedan' | 'executive' | 'minivan';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
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