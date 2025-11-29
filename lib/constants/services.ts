import { Service } from '@/types';
import { IMAGES } from './images';

export const SERVICES: Service[] = [
  {
    id: 'city-tours',
    title: 'City Tours',
    titleDE: 'Stadttouren',
    description: 'Explore Wiener Neustadt with our experienced drivers',
    descriptionDE: 'Entdecken Sie Wiener Neustadt mit unseren erfahrenen Fahrern',
    image: IMAGES.services.cityTour.src,
    imageAlt: IMAGES.services.cityTour.alt,
    imageFallback: IMAGES.services.cityTour.fallback,
    features: [
      'Local expertise',
      'Flexible duration',
      'Historical insights',
      'Comfortable vehicles'
    ],
    featuresDE: [
      'Lokale Expertise',
      'Flexible Dauer',
      'Historische Einblicke',
      'Komfortable Fahrzeuge'
    ],
  },
  {
    id: 'airport-transfers',
    title: 'Airport Transfers',
    titleDE: 'Flughafentransfers',
    description: 'Reliable transportation to and from airports',
    descriptionDE: 'Zuverlässiger Transport zu und von Flughäfen',
    image: IMAGES.services.airportTransfer.src,
    imageAlt: IMAGES.services.airportTransfer.alt,
    imageFallback: IMAGES.services.airportTransfer.fallback,
    features: [
      'Flight monitoring',
      'Meet and greet service',
      'Luggage assistance',
      'Fixed rates'
    ],
    featuresDE: [
      'Flugüberwachung',
      'Meet-and-Greet-Service',
      'Gepäckhilfe',
      'Festpreise'
    ],
  },
  {
    id: 'business-travel',
    title: 'Business Travel',
    titleDE: 'Geschäftsreisen',
    description: 'Professional service for business clients',
    descriptionDE: 'Professioneller Service für Geschäftskunden',
    image: IMAGES.services.businessTravel.src,
    imageAlt: IMAGES.services.businessTravel.alt,
    imageFallback: IMAGES.services.businessTravel.fallback,
    features: [
      'Professional drivers',
      'Executive vehicles',
      'Wi-Fi available',
      'Corporate accounts'
    ],
    featuresDE: [
      'Professionelle Fahrer',
      'Executive-Fahrzeuge',
      'WLAN verfügbar',
      'Firmenkonten'
    ],
  },
  {
    id: 'special-events',
    title: 'Special Events',
    titleDE: 'Besondere Anlässe',
    description: 'Transportation for weddings, parties, and special occasions',
    descriptionDE: 'Transport für Hochzeiten, Feiern und besondere Anlässe',
    image: IMAGES.services.businessTravel.src,
    imageAlt: 'Special event transportation',
    imageFallback: IMAGES.services.businessTravel.fallback,
    features: [
      'Wedding packages',
      'Party transportation',
      'VIP service',
      'Custom arrangements'
    ],
    featuresDE: [
      'Hochzeitspakete',
      'Party-Transport',
      'VIP-Service',
      'Individuelle Arrangements'
    ],
  },
];
