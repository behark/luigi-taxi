import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsButton extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  as?: 'button';
  href?: never;
}

interface ButtonAsLink extends BaseButtonProps {
  as: typeof Link;
  href: string;
}

interface ButtonAsAnchor extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  as: 'a';
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export function Button({ className, variant = 'primary', size = 'md', fullWidth = false, as, ...props }: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-yellow-500',
      secondary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500',
      outline: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black focus:ring-yellow-500',
      ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      widthClass,
      className
    );

    if (as === Link) {
      const { href, children } = props as ButtonAsLink;
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    if (as === 'a') {
      const { children, ...anchorProps } = props as ButtonAsAnchor;
      return (
        <a className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    const { children, ...buttonProps } = props as ButtonAsButton;
    return (
      <button className={classes} {...buttonProps}>
        {children}
      </button>
    );
}

Button.displayName = 'Button';