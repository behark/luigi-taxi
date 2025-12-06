'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export default function GooglePlacesAutocomplete({
  value,
  onChange,
  onPlaceSelected,
  placeholder = 'Enter address',
  className = '',
  error,
}: GooglePlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already loading
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for it to load
      const checkGoogleMaps = setInterval(() => {
        if (typeof google !== 'undefined' && google.maps && google.maps.places) {
          setIsLoaded(true);
          clearInterval(checkGoogleMaps);
        }
      }, 100);

      return () => clearInterval(checkGoogleMaps);
    }

    // Load Google Maps script
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set, autocomplete disabled');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=de&region=AT`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Google Maps script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts during loading
      if (!isLoaded) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    // Initialize autocomplete
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: ['at', 'sk', 'cz'] }, // Austria, Slovakia, Czech Republic
      fields: ['formatted_address', 'geometry', 'name', 'place_id'],
      types: ['geocode', 'establishment'],
    });

    // Bias results to Austria
    autocompleteRef.current.setBounds({
      north: 49.02,
      south: 46.37,
      east: 17.17,
      west: 9.53,
    });

    // Handle place selection
    const listener = autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();

      if (place && place.formatted_address) {
        onChange(place.formatted_address);
        onPlaceSelected?.(place);
      }
    });

    return () => {
      if (listener) {
        google.maps.event.removeListener(listener);
      }
    };
  }, [isLoaded, onChange, onPlaceSelected]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MapPin className="h-5 w-5 text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        } rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
        placeholder={placeholder}
        autoComplete="off"
      />
      {!isLoaded && value.length === 0 && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
