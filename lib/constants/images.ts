// Image constants with fallbacks for taxi-related images
export const IMAGES = {
  // Hero section
  hero: {
    src: '/images/jaecoo-j7-front.jpg',
    alt: 'Luigi Taxi Jaecoo J7 - professional taxi service in Wiener Neustadt',
    fallback: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop&crop=center&q=80',
  },

  // Fleet vehicles
  fleet: {
    sedan: {
      src: '/images/sedan.jpg', 
      alt: 'Mercedes sedan - comfortable taxi for up to 4 passengers',
      fallback: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center&q=80',
    },
    executive: {
      src: '/images/jaecoo-j7-feature.jpg',
      alt: 'Luigi Taxi Jaecoo J7 SUV - executive vehicle for business and comfort travel',
      fallback: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center&q=80',
    },
    minivan: {
      src: '/images/minivan.jpg',
      alt: 'Spacious minivan for groups and luggage',
      fallback: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop&crop=center&q=80',
    },
  },

  // Services
  services: {
    cityTour: {
      src: '/images/city-tour.jpg',
      alt: 'City tour service - Explore Wiener Neustadt',
      fallback: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center&q=80',
    },
    airportTransfer: {
      src: '/images/airport-transfer.jpg', 
      alt: 'Airport transfer service - Reliable transportation to airports',
      fallback: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop&crop=center&q=80',
    },
    businessTravel: {
      src: '/images/business-travel.jpg',
      alt: 'Business travel service - Professional transportation',
      fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center&q=80',
    },
  },

  // About/Company
  company: {
    wienerNeustadt: {
      src: '/images/wiener-neustadt.jpg',
      alt: 'Wiener Neustadt - Our service area',
      fallback: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop&crop=center&q=80',
    },
    driver: {
      src: '/images/professional-driver.jpg',
      alt: 'Professional taxi driver - Experienced and courteous',
      fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center&q=80',
    },
  },

  // Newest vehicle: Jaecoo J7 SUV
  jaecoo: {
    video: '/videos/jaecoo-j7.mp4',
    poster: '/images/jaecoo-j7-front.jpg',
    gallery: [
      {
        src: '/images/jaecoo-j7-front.jpg',
        alt: 'Luigi Taxi Jaecoo J7 - front view in Wiener Neustadt',
        fallback: '/images/placeholder.svg',
      },
      {
        src: '/images/jaecoo-j7-side.jpg',
        alt: 'Luigi Taxi Jaecoo J7 - side profile',
        fallback: '/images/placeholder.svg',
      },
      {
        src: '/images/jaecoo-j7-rear.jpg',
        alt: 'Luigi Taxi Jaecoo J7 - rear view',
        fallback: '/images/placeholder.svg',
      },
    ],
  },

  // Previous vehicle (heritage): Luigi's branded Tesla Model S
  tesla: {
    src: '/images/luigi-tesla.jpg',
    alt: 'Luigi Taxi Tesla Model S - our trusted previous vehicle in Wiener Neustadt',
    fallback: '/images/placeholder.svg',
  },
};