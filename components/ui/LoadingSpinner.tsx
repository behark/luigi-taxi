'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'yellow' | 'white' | 'gray' | 'black';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'yellow', 
  className 
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colors = {
    yellow: 'text-yellow-500',
    white: 'text-white',
    gray: 'text-gray-600',
    black: 'text-black',
  };

  return (
    <motion.div
      className={cn(
        'inline-block rounded-full border-2 border-solid border-current border-r-transparent',
        sizes[size],
        colors[color],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

interface TaxiLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TaxiLoading({ size = 'md', className }: TaxiLoadingProps) {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  return (
    <motion.div
      className={cn('flex items-center justify-center', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={sizes[size]}
        animate={{ 
          x: [0, 10, 0, -10, 0],
          rotate: [0, 2, 0, -2, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🚕
      </motion.div>
    </motion.div>
  );
}