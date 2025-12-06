import { VehicleType } from '@/types';
import { IMAGES } from './images';

export const VEHICLE_TYPES: VehicleType[] = [
  {
    id: 'standard',
    name: 'Standard Sedan',
    description: 'Comfortable and reliable transportation for up to 4 passengers',
    capacity: 4,
    image: IMAGES.fleet.sedan.src,
    imageAlt: IMAGES.fleet.sedan.alt,
    imageFallback: IMAGES.fleet.sedan.fallback,
    priceMultiplier: 1,
  },
  {
    id: 'executive',
    name: 'Executive Service',
    description: 'Premium vehicles for business and luxury travel',
    capacity: 4,
    image: IMAGES.fleet.executive.src,
    imageAlt: IMAGES.fleet.executive.alt,
    imageFallback: IMAGES.fleet.executive.fallback,
    priceMultiplier: 1.5,
  },
  {
    id: 'minivan',
    name: 'Minivan',
    description: 'Spacious vehicles for groups and luggage',
    capacity: 8,
    image: IMAGES.fleet.minivan.src,
    imageAlt: IMAGES.fleet.minivan.alt,
    imageFallback: IMAGES.fleet.minivan.fallback,
    priceMultiplier: 1.8,
  },
];