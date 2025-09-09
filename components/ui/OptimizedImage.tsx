'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className={cn(
        'bg-gray-200 dark:bg-gray-700 flex items-center justify-center',
        fill ? 'w-full h-full' : '',
        className
      )}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    onLoad: handleLoad,
    onError: handleError,
    priority,
    placeholder,
    blurDataURL,
    sizes,
    className: cn(
      'transition-opacity duration-300',
      isLoading ? 'opacity-0' : 'opacity-100',
      className
    ),
    ...props,
  };

  if (fill) {
    return <Image {...imageProps} fill alt={alt} />;
  }

  return <Image {...imageProps} width={width} height={height} alt={alt} />;
};