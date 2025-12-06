export const BUSINESS_INFO = {
  name: 'Luigi Taxi e.U',
  legalName: 'Luigi Taxi e.U',
  address: 'Wr. Str. 60',
  city: 'Wiener Neustadt',
  postalCode: '2700',
  state: 'Lower Austria',
  country: 'Austria',
  countryCode: 'AT',
  phone: '+43 660 900 2700',
  phoneFormatted: '+43 660 900 2700',
  phoneClean: '+436609002700', // For WhatsApp and tel: links
  email: 'booking@luigitaxi.at',
  infoEmail: 'info@luigitaxi.at',
  website: 'https://luigitaxi.at',
  hours: '24/7',
  timezone: 'Europe/Vienna',
  currency: 'EUR',
  currencySymbol: '€',
  languages: ['de', 'en'] as const,
  defaultLanguage: 'de' as const,
  features: [
    'LGBTQ+ friendly',
    'Available 24/7',
    'Airport transfers',
    'City tours',
    'Business travel',
    'Professional drivers'
  ],
  social: {
    facebook: 'https://facebook.com/luigitaxi',
    whatsapp: 'https://wa.me/+436609002700',
  },
  location: {
    coordinates: {
      lat: 47.8167,
      lng: 16.2333
    },
    googleMapsUrl: 'https://share.google/6nXqNx1cpvhoR6Qae',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2740.0!2d16.2333!3d47.8167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDQ5JzAwLjEiTiAxNsKwMTMnNTkuOSJF!5e0!3m2!1sen!2sat!4v1234567890'
  },
  pricing: {
    // Base rates per km for each vehicle type
    baseRates: {
      standard: 2.5,
      executive: 3.5,
      minivan: 4.0,
    } as const,
    // Vehicle type display info (single source of truth)
    vehicles: {
      standard: {
        id: 'standard',
        name: 'Standard Sedan',
        nameDE: 'Limousine',
        capacity: 4,
        ratePerKm: 2.5,
        description: 'Comfortable sedan for up to 4 passengers',
        descriptionDE: 'Bequeme Limousine für bis zu 4 Passagiere',
      },
      executive: {
        id: 'executive',
        name: 'Executive Car',
        nameDE: 'Executive',
        capacity: 4,
        ratePerKm: 3.5,
        description: 'Premium vehicle for business travel',
        descriptionDE: 'Premium-Fahrzeug für Geschäftsreisen',
      },
      minivan: {
        id: 'minivan',
        name: 'Minivan',
        nameDE: 'Kleinbus',
        capacity: 8,
        ratePerKm: 4.0,
        description: 'Spacious vehicle for groups and luggage',
        descriptionDE: 'Geräumiges Fahrzeug für Gruppen und Gepäck',
      },
    } as const,
    minimumFare: 8,
    nightSurchargeMultiplier: 1.2,
    nightHoursStart: 22,
    nightHoursEnd: 6,
    serviceMultipliers: {
      oneway: 1,
      roundtrip: 1.8,
      hourly: 2.5,
      airport: 1.2,
    } as const,
    hourlyRate: 35,
    minimumHours: 2,
    // Common routes with fixed prices (from Wiener Neustadt)
    commonRoutes: [
      { id: 'vienna-airport', name: 'Flughafen Wien', nameEN: 'Vienna Airport', distanceKm: 45, basePrice: 65 },
      { id: 'vienna-center', name: 'Wien Zentrum', nameEN: 'Vienna Center', distanceKm: 50, basePrice: 70 },
      { id: 'train-station', name: 'Hauptbahnhof WN', nameEN: 'Main Train Station', distanceKm: 3, basePrice: 15 },
      { id: 'baden', name: 'Baden bei Wien', nameEN: 'Baden bei Wien', distanceKm: 20, basePrice: 35 },
      { id: 'bratislava', name: 'Bratislava', nameEN: 'Bratislava', distanceKm: 85, basePrice: 120 },
      { id: 'graz', name: 'Graz', nameEN: 'Graz', distanceKm: 150, basePrice: 200 },
    ] as const,
  },
} as const;

// Type for BUSINESS_INFO
export type BusinessInfo = typeof BUSINESS_INFO;