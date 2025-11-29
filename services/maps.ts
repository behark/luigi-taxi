import { BUSINESS_INFO } from '@/lib/constants/business';

// Types
interface DistanceResult {
  success: boolean;
  distanceKm?: number;
  distanceText?: string;
  durationMinutes?: number;
  durationText?: string;
  error?: string;
}

interface PriceCalculation {
  distanceKm: number;
  basePrice: number;
  serviceMultiplier: number;
  nightMultiplier: number;
  totalPrice: number;
  priceBreakdown: {
    distance: string;
    duration: string;
    baseRate: number;
    nightSurcharge: boolean;
  };
}

// Google Maps Distance Matrix API
export async function calculateDistance(
  origin: string,
  destination: string
): Promise<DistanceResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.warn('GOOGLE_MAPS_API_KEY not configured, using fallback estimation');
    return fallbackDistanceEstimation(origin, destination);
  }

  try {
    // Add Austria context to improve geocoding accuracy
    const originWithContext = `${origin}, ${BUSINESS_INFO.city}, Austria`;
    const destinationWithContext = destination.toLowerCase().includes('flughafen') ||
      destination.toLowerCase().includes('airport') ||
      destination.toLowerCase().includes('wien')
      ? `${destination}, Austria`
      : `${destination}, ${BUSINESS_INFO.city}, Austria`;

    const url = new URL('https://maps.googleapis.com/maps/api/distancematrix/json');
    url.searchParams.append('origins', originWithContext);
    url.searchParams.append('destinations', destinationWithContext);
    url.searchParams.append('mode', 'driving');
    url.searchParams.append('language', 'de');
    url.searchParams.append('units', 'metric');
    url.searchParams.append('key', apiKey);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Maps API error:', data.status, data.error_message);
      return fallbackDistanceEstimation(origin, destination);
    }

    const element = data.rows?.[0]?.elements?.[0];

    if (!element || element.status !== 'OK') {
      console.warn('No route found, using fallback');
      return fallbackDistanceEstimation(origin, destination);
    }

    const distanceKm = element.distance.value / 1000; // Convert meters to km
    const durationMinutes = Math.ceil(element.duration.value / 60); // Convert seconds to minutes

    return {
      success: true,
      distanceKm: Math.round(distanceKm * 10) / 10, // Round to 1 decimal
      distanceText: element.distance.text,
      durationMinutes,
      durationText: element.duration.text,
    };
  } catch (error) {
    console.error('Failed to calculate distance with Google Maps:', error);
    return fallbackDistanceEstimation(origin, destination);
  }
}

// Fallback distance estimation when Google Maps is not available
function fallbackDistanceEstimation(
  origin: string,
  destination: string
): DistanceResult {
  // Known distances from Wiener Neustadt (approximate)
  const knownDestinations: Record<string, { km: number; minutes: number }> = {
    // Airports
    'wien schwechat': { km: 45, minutes: 40 },
    'flughafen wien': { km: 45, minutes: 40 },
    'vienna airport': { km: 45, minutes: 40 },
    'schwechat': { km: 45, minutes: 40 },
    'vie': { km: 45, minutes: 40 },
    'bratislava': { km: 85, minutes: 75 },

    // Cities
    'wien': { km: 55, minutes: 50 },
    'vienna': { km: 55, minutes: 50 },
    'graz': { km: 110, minutes: 90 },
    'eisenstadt': { km: 45, minutes: 40 },
    'baden': { km: 20, minutes: 20 },
    'mödling': { km: 35, minutes: 30 },
    'neunkirchen': { km: 25, minutes: 25 },
    'ternitz': { km: 15, minutes: 15 },

    // Train stations
    'hauptbahnhof': { km: 3, minutes: 8 },
    'hbf': { km: 3, minutes: 8 },
    'bahnhof': { km: 3, minutes: 8 },

    // Local areas
    'zentrum': { km: 2, minutes: 5 },
    'innenstadt': { km: 2, minutes: 5 },
  };

  // Check if destination matches known locations
  const destLower = destination.toLowerCase();
  for (const [key, value] of Object.entries(knownDestinations)) {
    if (destLower.includes(key)) {
      return {
        success: true,
        distanceKm: value.km,
        distanceText: `${value.km} km`,
        durationMinutes: value.minutes,
        durationText: `${value.minutes} Min.`,
      };
    }
  }

  // Default estimation based on text complexity
  // This is a rough heuristic - real distances should use Google Maps
  const complexity = Math.max(
    5,
    Math.min(30, Math.floor((origin.length + destination.length) / 4))
  );

  return {
    success: true,
    distanceKm: complexity,
    distanceText: `~${complexity} km (geschätzt)`,
    durationMinutes: Math.ceil(complexity * 1.5),
    durationText: `~${Math.ceil(complexity * 1.5)} Min. (geschätzt)`,
  };
}

// Calculate price based on distance and booking details
export async function calculatePrice(
  origin: string,
  destination: string,
  options: {
    vehicleType: 'standard' | 'executive' | 'minivan';
    serviceType: 'oneway' | 'roundtrip' | 'hourly' | 'airport';
    pickupTime: string;
  }
): Promise<PriceCalculation> {
  const { pricing } = BUSINESS_INFO;

  // Get distance
  const distanceResult = await calculateDistance(origin, destination);
  const distanceKm = distanceResult.distanceKm || 10;

  // Get base rate for vehicle type
  const baseRate =
    pricing.baseRates[options.vehicleType] || pricing.baseRates.standard;

  // Get service multiplier
  const serviceMultiplier =
    pricing.serviceMultipliers[options.serviceType] || 1;

  // Check for night surcharge
  const hour = parseInt(options.pickupTime.split(':')[0], 10);
  const isNightTime =
    hour >= pricing.nightHoursStart || hour < pricing.nightHoursEnd;
  const nightMultiplier = isNightTime ? pricing.nightSurchargeMultiplier : 1;

  // Calculate base price
  const basePrice = distanceKm * baseRate;

  // Calculate total price
  let totalPrice = basePrice * serviceMultiplier * nightMultiplier;

  // Special handling for hourly rate
  if (options.serviceType === 'hourly') {
    totalPrice = Math.max(
      pricing.hourlyRate * pricing.minimumHours,
      totalPrice
    );
  }

  // Apply minimum fare
  totalPrice = Math.max(pricing.minimumFare, totalPrice);

  // Round to nearest euro
  totalPrice = Math.round(totalPrice);

  return {
    distanceKm,
    basePrice: Math.round(basePrice),
    serviceMultiplier,
    nightMultiplier,
    totalPrice,
    priceBreakdown: {
      distance: distanceResult.distanceText || `${distanceKm} km`,
      duration: distanceResult.durationText || 'N/A',
      baseRate,
      nightSurcharge: isNightTime,
    },
  };
}

// Get distance for client-side price preview (simplified)
export async function getDistancePreview(
  origin: string,
  destination: string
): Promise<{
  distance: string;
  duration: string;
  isEstimate: boolean;
}> {
  const result = await calculateDistance(origin, destination);

  return {
    distance: result.distanceText || `${result.distanceKm || 10} km`,
    duration: result.durationText || 'N/A',
    isEstimate: !process.env.GOOGLE_MAPS_API_KEY,
  };
}
