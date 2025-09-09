'use client';

import { MapPin, Navigation, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SimpleLocationMapProps {
  className?: string;
}

export default function SimpleLocationMap({ className = '' }: SimpleLocationMapProps) {
  const t = useTranslations();

  const handleDirectionsClick = () => {
    // Using your actual Google Maps business URL
    window.open('https://maps.app.goo.gl/gzyL2AG2NeWYRTjqQ', '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+436609002700', '_self');
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <MapPin size={24} />
          <h3 className="text-xl font-bold">{t('location.title')}</h3>
        </div>
        <p className="text-blue-100">{t('location.subtitle')}</p>
      </div>

      {/* Map Preview - Static image placeholder */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-blue-600 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Luigi Taxi</p>
            <p className="text-sm text-gray-500">Wiener Neustadt</p>
          </div>
        </div>
        
        {/* Overlay with action buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleDirectionsClick}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-blue-50 transition-colors"
          >
            {t('location.getDirections')}
          </button>
        </div>
      </div>

      {/* Location Details */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">{t('common.businessName')}</p>
              <p className="text-gray-600">{t('location.address')}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">24/7 Service</p>
              <a 
                href="tel:+436609002700" 
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                +43 660 900 2700
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleDirectionsClick}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Navigation size={18} />
            {t('location.getDirections')}
          </button>
          
          <button
            onClick={handleCallClick}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Phone size={18} />
            {t('navigation.callNow')}
          </button>
        </div>
      </div>
    </div>
  );
}