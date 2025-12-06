/**
 * Client-side Google Maps utilities for real-time distance calculation
 */

import { BUSINESS_INFO } from '@/lib/constants/business';

interface DistanceResult {
  distanceKm: number;
  distanceText: string;
  durationMinutes: number;
  durationText: string;
  success: boolean;
}

interface PriceEstimate {
  distance: number;
  price: number;
  distanceText: string;
  durationText: string;
}

/**
 * Calculate distance between two addresses using Google Maps Distance Matrix API
 */
export async function calculateClientDistance(
  origin: string,
  destination: string
): Promise<DistanceResult> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.warn('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set');
    return getFallbackDistance();
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/distancematrix/json');
    url.searchParams.append('origins', `${origin}, Austria`);
    url.searchParams.append('destinations', `${destination}, Austria`);
    url.searchParams.append('mode', 'driving');
    url.searchParams.append('language', 'de');
    url.searchParams.append('units', 'metric');
    url.searchParams.append('key', apiKey);

    // Use CORS proxy or make request through your API route
    const response = await fetch('/api/maps/distance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination }),
    });

    if (!response.ok) {
      throw new Error('Distance API failed');
    }

    const data = await response.json();

    if (data.success && data.distanceKm) {
      return {
        distanceKm: data.distanceKm,
        distanceText: data.distanceText || `${data.distanceKm} km`,
        durationMinutes: data.durationMinutes || Math.ceil(data.distanceKm * 1.5),
        durationText: data.durationText || `${Math.ceil(data.distanceKm * 1.5)} min`,
        success: true,
      };
    }

    return getFallbackDistance();
  } catch (error) {
    console.error('Distance calculation error:', error);
    return getFallbackDistance();
  }
}

/**
 * Calculate price estimate for a trip
 */
export async function calculatePriceEstimate(
  origin: string,
  destination: string,
  vehicleType: 'standard' | 'executive' | 'minivan',
  serviceType: 'oneway' | 'roundtrip' | 'hourly' | 'airport',
  pickupTime?: string
): Promise<PriceEstimate> {
  const distance = await calculateClientDistance(origin, destination);

  const { pricing } = BUSINESS_INFO;
  const baseRate = pricing.baseRates[vehicleType];
  const serviceMultiplier = pricing.serviceMultipliers[serviceType];

  // Check for night surcharge
  let nightMultiplier = 1;
  if (pickupTime) {
    const hour = parseInt(pickupTime.split(':')[0], 10);
    const isNightTime = hour >= pricing.nightHoursStart || hour < pricing.nightHoursEnd;
    nightMultiplier = isNightTime ? pricing.nightSurchargeMultiplier : 1;
  }

  // Calculate price
  let price = distance.distanceKm * baseRate * serviceMultiplier * nightMultiplier;

  // Handle hourly rate
  if (serviceType === 'hourly') {
    price = Math.max(pricing.hourlyRate * pricing.minimumHours, price);
  }

  // Apply minimum fare
  price = Math.max(pricing.minimumFare, price);

  return {
    distance: distance.distanceKm,
    price: Math.round(price),
    distanceText: distance.distanceText,
    durationText: distance.durationText,
  };
}

/**
 * Fallback distance estimation
 */
function getFallbackDistance(): DistanceResult {
  const defaultDistance = 15;
  return {
    distanceKm: defaultDistance,
    distanceText: `~${defaultDistance} km (geschätzt)`,
    durationMinutes: Math.ceil(defaultDistance * 1.5),
    durationText: `~${Math.ceil(defaultDistance * 1.5)} min (geschätzt)`,
    success: false,
  };
}
