import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { TaxiImage } from './TaxiImage';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors',
          hover && 'hover:shadow-xl transition-shadow duration-300',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6', className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = 'CardContent';

interface CardImageProps {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
}

const CardImage = ({ src, alt, fallback, className }: CardImageProps) => {
  return (
    <div className={cn('relative h-48', className)}>
      <TaxiImage
        src={src}
        alt={alt}
        fallback={fallback}
        fill
        className="object-cover rounded-t-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export { Card, CardContent, CardImage };