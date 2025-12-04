/**
 * Client-side price estimation utilities
 *
 * NOTE: This is a simplified estimation for UX purposes only.
 * Actual pricing is calculated server-side using Google Maps API
 * for accurate distance and route information.
 */

export type VehicleType = 'standard' | 'executive' | 'minivan';
export type ServiceType = 'oneway' | 'roundtrip' | 'hourly' | 'airport';

/**
 * Vehicle type configurations with base rates
 */
export const VEHICLE_TYPES = {
  standard: {
    name: 'Standard Sedan',
    capacity: 4,
    baseRate: 2.5,
    description: 'Comfortable sedan for up to 4 passengers',
  },
  executive: {
    name: 'Executive Car',
    capacity: 4,
    baseRate: 3.5,
    description: 'Premium vehicle for business travel',
  },
  minivan: {
    name: 'Minivan',
    capacity: 8,
    baseRate: 4.0,
    description: 'Spacious vehicle for groups and luggage',
  },
} as const;

/**
 * Service type multipliers for pricing
 */
const SERVICE_MULTIPLIERS: Record<ServiceType, number> = {
  oneway: 1.0,
  roundtrip: 1.8,
  hourly: 2.5,
  airport: 1.2,
};

/**
 * Estimate distance based on location string lengths
 * This is a very rough approximation for UX feedback only
 *
 * @param pickupLocation - Pickup location string
 * @param dropoffLocation - Dropoff location string
 * @returns Estimated distance in kilometers
 */
function estimateDistanceFromStrings(
  pickupLocation: string,
  dropoffLocation: string
): number {
  // Very rough estimate: longer strings might indicate longer distances
  // Clamped between 5km and 50km for reasonable UX
  const estimatedKm = Math.max(
    5,
    Math.min(50, pickupLocation.length + dropoffLocation.length)
  );
  return estimatedKm;
}

/**
 * Calculate estimated price for a taxi booking (client-side approximation)
 *
 * IMPORTANT: This is only for UI feedback. The actual price is calculated
 * on the server using Google Maps Distance Matrix API for accuracy.
 *
 * @param options - Booking options for price calculation
 * @returns Estimated price in EUR
 */
export function calculateClientSideEstimatedPrice(options: {
  pickupLocation: string;
  dropoffLocation: string;
  vehicleType: VehicleType;
  serviceType: ServiceType;
}): number | null {
  const { pickupLocation, dropoffLocation, vehicleType, serviceType } = options;

  // Validate required fields
  if (!pickupLocation || !dropoffLocation || !vehicleType) {
    return null;
  }

  // Get vehicle base rate
  const baseRate = VEHICLE_TYPES[vehicleType]?.baseRate;
  if (!baseRate) {
    return null;
  }

  // Estimate distance (very rough approximation)
  const estimatedDistance = estimateDistanceFromStrings(
    pickupLocation,
    dropoffLocation
  );

  // Apply service type multiplier
  const multiplier = SERVICE_MULTIPLIERS[serviceType] || 1.0;

  // Calculate estimated price
  const estimated = estimatedDistance * baseRate * multiplier;

  return Math.round(estimated);
}

/**
 * Format price in EUR currency
 *
 * @param price - Price in EUR
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}
