'use client';

import { useEffect, useRef } from 'react';

interface LocationMapProps {
  className?: string;
}

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

export default function LocationMap({ className = '' }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      // Luigi Taxi location in Wiener Neustadt (placeholder coordinates)
      // TODO: Replace with actual Luigi Taxi address coordinates
      const location = { lat: 47.8167, lng: 16.2333 }; // Wiener Neustadt center

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: location,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      const marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: 'Luigi Taxi - Wiener Neustadt',
        icon: {
          url: '/images/taxi-marker.svg',
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 40),
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-lg mb-2">Luigi Taxi</h3>
            <p class="text-gray-600 mb-2">Professional taxi service in Wiener Neustadt</p>
            <div class="space-y-1 text-sm">
              <p><strong>Phone:</strong> +43 XXX XXX XXXX</p>
              <p><strong>Email:</strong> info@luigitaxi.at</p>
              <p><strong>Available:</strong> 24/7</p>
            </div>
            <button 
              onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}', '_blank')"
              class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Get Directions
            </button>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    };

    if (window.google) {
      loadGoogleMaps();
    } else {
      window.initMap = loadGoogleMaps;
      
      // Load Google Maps API if not already loaded
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <div className={`w-full h-80 bg-gray-200 rounded-lg overflow-hidden ${className}`}>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}