import { Service } from '@/types';
import { IMAGES } from './images';

export const SERVICES: Service[] = [
  {
    id: 'city-tours',
    title: 'City Tours',
    description: 'Explore Wiener Neustadt with our experienced drivers',
    image: IMAGES.services.cityTour.src,
    imageAlt: IMAGES.services.cityTour.alt,
    imageFallback: IMAGES.services.cityTour.fallback,
    features: [
      'Local expertise',
      'Flexible duration',
      'Historical insights',
      'Comfortable vehicles'
    ],
  },
  {
    id: 'airport-transfers',
    title: 'Airport Transfers',
    description: 'Reliable transportation to and from airports',
    image: IMAGES.services.airportTransfer.src,
    imageAlt: IMAGES.services.airportTransfer.alt,
    imageFallback: IMAGES.services.airportTransfer.fallback,
    features: [
      'Flight monitoring',
      'Meet and greet service',
      'Luggage assistance',
      'Fixed rates'
    ],
  },
  {
    id: 'business-travel',
    title: 'Business Travel',
    description: 'Professional service for business clients',
    image: IMAGES.services.businessTravel.src,
    imageAlt: IMAGES.services.businessTravel.alt,
    imageFallback: IMAGES.services.businessTravel.fallback,
    features: [
      'Professional drivers',
      'Executive vehicles',
      'Wi-Fi available',
      'Corporate accounts'
    ],
  },
];