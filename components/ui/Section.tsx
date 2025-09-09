import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'gray' | 'dark';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', containerSize = 'xl', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white dark:bg-gray-900',
      gray: 'bg-gray-50 dark:bg-gray-800',
      dark: 'bg-black text-white',
    };

    const containers = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-6xl', 
      xl: 'max-w-7xl',
      full: 'max-w-none',
    };

    return (
      <section
        ref={ref}
        className={cn('py-20', variants[variant], className)}
        {...props}
      >
        <div className={cn('mx-auto px-4', containers[containerSize])}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  centered = true, 
  className 
}: SectionHeaderProps) => {
  return (
    <div className={cn(
      'mb-12',
      centered && 'text-center',
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export { Section, SectionHeader };