'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface TaxiImageProps {
  src: string;
  alt: string;
  fallback: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function TaxiImage({
  src,
  alt,
  fallback,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: TaxiImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (imageSrc === src) {
      // First error, try fallback
      setImageSrc(fallback);
      setHasError(false);
    } else {
      // Fallback also failed
      setHasError(true);
      setIsLoading(false);
    }
  };

  if (hasError) {
    return (
      <div className={cn(
        'bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center text-yellow-800',
        fill ? 'w-full h-full absolute inset-0' : '',
        className
      )}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🚕</div>
          <p className="text-sm font-medium">Luigi Taxi</p>
        </div>
      </div>
    );
  }

  const imageProps = {
    src: imageSrc,
    alt,
    onLoad: handleLoad,
    onError: handleError,
    priority,
    sizes,
    className: cn(
      'transition-all duration-500',
      isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100',
      className
    ),
  };

  if (fill) {
    return (
      <div className="relative w-full h-full">
        <Image {...imageProps} fill style={{ objectFit: 'cover' }} alt={alt} />
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-200 animate-pulse flex items-center justify-center">
            <div className="text-yellow-600 text-2xl">🚕</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Image {...imageProps} width={width} height={height} alt={alt} />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-200 animate-pulse flex items-center justify-center rounded-lg">
          <div className="text-yellow-600 text-2xl">🚕</div>
        </div>
      )}
    </div>
  );
}