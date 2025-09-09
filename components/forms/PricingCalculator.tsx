'use client';

import { useState } from 'react';
import { Calculator, MapPin, Car } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Route {
  id: string;
  name: string;
  nameEn: string;
  distance: number; // km
  basePrice: number; // EUR
}

interface Vehicle {
  id: string;
  name: string;
  nameEn: string;
  multiplier: number;
}

const COMMON_ROUTES: Route[] = [
  { id: 'vienna-airport', name: 'Flughafen Wien', nameEn: 'Vienna Airport', distance: 45, basePrice: 65 },
  { id: 'vienna-center', name: 'Wien Zentrum', nameEn: 'Vienna Center', distance: 50, basePrice: 70 },
  { id: 'train-station', name: 'Hauptbahnhof WN', nameEn: 'Main Train Station', distance: 3, basePrice: 15 },
  { id: 'baden', name: 'Baden bei Wien', nameEn: 'Baden bei Wien', distance: 20, basePrice: 35 },
  { id: 'bratislava', name: 'Bratislava', nameEn: 'Bratislava', distance: 85, basePrice: 120 },
  { id: 'graz', name: 'Graz', nameEn: 'Graz', distance: 150, basePrice: 200 },
];

const VEHICLES: Vehicle[] = [
  { id: 'sedan', name: 'Limousine', nameEn: 'Sedan', multiplier: 1.0 },
  { id: 'executive', name: 'Executive', nameEn: 'Executive', multiplier: 1.3 },
  { id: 'minivan', name: 'Kleinbus', nameEn: 'Minivan', multiplier: 1.5 },
];

export default function PricingCalculator() {
  const t = useTranslations();
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('sedan');
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const calculatePrice = (): number => {
    if (!selectedRoute) return 0;
    
    const route = COMMON_ROUTES.find(r => r.id === selectedRoute);
    const vehicle = VEHICLES.find(v => v.id === selectedVehicle);
    
    if (!route || !vehicle) return 0;
    
    let price = route.basePrice * vehicle.multiplier;
    if (isRoundTrip) price *= 2;
    
    return Math.round(price);
  };

  const selectedRouteData = COMMON_ROUTES.find(r => r.id === selectedRoute);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Calculator className="text-blue-600" size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">
          {t('pricing.calculator')}
        </h3>
      </div>

      <div className="space-y-4">
        {/* Route Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-1" />
            {t('pricing.destination')}
          </label>
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('pricing.selectDestination')}</option>
            {COMMON_ROUTES.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name} ({route.distance}km)
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Car size={16} className="inline mr-1" />
            {t('pricing.vehicle')}
          </label>
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {VEHICLES.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </div>

        {/* Round Trip Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="roundtrip"
            checked={isRoundTrip}
            onChange={(e) => setIsRoundTrip(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="roundtrip" className="text-sm font-medium text-gray-700">
            {t('pricing.roundTrip')}
          </label>
        </div>

        {/* Price Display */}
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('pricing.estimatedPrice')}</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                €{calculatePrice()}
              </div>
              {selectedRouteData && (
                <div className="text-xs text-gray-500">
                  {selectedRouteData.distance}km {isRoundTrip ? '(return)' : '(one way)'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 text-center mt-4">
          {t('pricing.disclaimer')}
        </div>
      </div>
    </div>
  );
}