'use client';

import { useState } from 'react';
import { Calculator, MapPin, Car } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { BUSINESS_INFO } from '@/lib/constants/business';

const { pricing } = BUSINESS_INFO;

export default function PricingCalculator() {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<keyof typeof pricing.vehicles>('standard');
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const vehicles = Object.values(pricing.vehicles);
  const routes = pricing.commonRoutes;

  const calculatePrice = (): number => {
    if (!selectedRoute) return 0;

    const route = routes.find(r => r.id === selectedRoute);
    const vehicle = pricing.vehicles[selectedVehicle];

    if (!route || !vehicle) return 0;

    // Calculate price based on base route price and vehicle rate difference
    const vehicleMultiplier = vehicle.ratePerKm / pricing.vehicles.standard.ratePerKm;
    let price = route.basePrice * vehicleMultiplier;

    if (isRoundTrip) {
      price *= pricing.serviceMultipliers.roundtrip;
    }

    // Apply minimum fare
    price = Math.max(pricing.minimumFare, price);

    return Math.round(price);
  };

  const selectedRouteData = routes.find(r => r.id === selectedRoute);
  const selectedVehicleData = pricing.vehicles[selectedVehicle];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <Calculator className="text-yellow-600 dark:text-yellow-400" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {t('pricing.calculator')}
        </h3>
      </div>

      <div className="space-y-4">
        {/* Route Selection */}
        <div>
          <label
            htmlFor="route-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            <MapPin size={16} className="inline mr-1" />
            {t('pricing.destination')}
          </label>
          <select
            id="route-select"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       transition-colors"
          >
            <option value="">{t('pricing.selectDestination')}</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {locale === 'de' ? route.name : route.nameEN} ({route.distanceKm}km)
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Selection */}
        <div>
          <label
            htmlFor="vehicle-select"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            <Car size={16} className="inline mr-1" />
            {t('pricing.vehicle')}
          </label>
          <select
            id="vehicle-select"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value as keyof typeof pricing.vehicles)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                       focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       transition-colors"
          >
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {locale === 'de' ? vehicle.nameDE : vehicle.name} ({BUSINESS_INFO.currencySymbol}{vehicle.ratePerKm}/km)
              </option>
            ))}
          </select>
        </div>

        {/* Round Trip Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="roundtrip-toggle"
            checked={isRoundTrip}
            onChange={(e) => setIsRoundTrip(e.target.checked)}
            className="w-4 h-4 text-yellow-600 border-gray-300 dark:border-gray-600 rounded
                       focus:ring-yellow-500 focus:ring-2
                       bg-white dark:bg-gray-700"
          />
          <label
            htmlFor="roundtrip-toggle"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('pricing.roundTrip')}
          </label>
        </div>

        {/* Price Display */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mt-6 transition-colors">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('pricing.estimatedPrice')}
            </span>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {BUSINESS_INFO.currencySymbol}{calculatePrice()}
              </div>
              {selectedRouteData && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedRouteData.distanceKm}km {isRoundTrip
                    ? (locale === 'de' ? '(Hin- und Rückfahrt)' : '(return)')
                    : (locale === 'de' ? '(einfache Fahrt)' : '(one way)')}
                </div>
              )}
            </div>
          </div>

          {/* Vehicle info */}
          {selectedVehicleData && selectedRoute && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {locale === 'de' ? selectedVehicleData.descriptionDE : selectedVehicleData.description}
                {' '}({locale === 'de' ? 'max.' : 'max'} {selectedVehicleData.capacity} {locale === 'de' ? 'Passagiere' : 'passengers'})
              </p>
            </div>
          )}
        </div>

        {/* Night surcharge notice */}
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
          <strong>{locale === 'de' ? 'Hinweis:' : 'Note:'}</strong>{' '}
          {locale === 'de'
            ? `Nachtzuschlag von ${((pricing.nightSurchargeMultiplier - 1) * 100).toFixed(0)}% zwischen ${pricing.nightHoursStart}:00 und ${pricing.nightHoursEnd}:00 Uhr.`
            : `${((pricing.nightSurchargeMultiplier - 1) * 100).toFixed(0)}% night surcharge between ${pricing.nightHoursStart}:00 and ${pricing.nightHoursEnd}:00.`
          }
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          {t('pricing.disclaimer')}
        </div>
      </div>
    </div>
  );
}
