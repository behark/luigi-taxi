'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

interface BaseAnimatedButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  animate?: 'bounce' | 'pulse' | 'scale' | 'none';
}

interface AnimatedButtonAsButton extends BaseAnimatedButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  as?: 'button';
  href?: never;
}

interface AnimatedButtonAsLink extends BaseAnimatedButtonProps {
  as: typeof Link;
  href: string;
}

interface AnimatedButtonAsAnchor extends BaseAnimatedButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  as: 'a';
  href: string;
}

type AnimatedButtonProps = AnimatedButtonAsButton | AnimatedButtonAsLink | AnimatedButtonAsAnchor;

export function AnimatedButton({ animate = 'scale', ...props }: AnimatedButtonProps) {
  const animations = {
    bounce: {
      whileHover: { y: -2 },
      whileTap: { y: 0 },
      transition: { type: 'spring' as const, stiffness: 400, damping: 10 }
    },
    pulse: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: { type: 'spring' as const, stiffness: 400, damping: 17 }
    },
    scale: {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: 'spring' as const, stiffness: 400, damping: 17 }
    },
    none: {}
  };

  return (
    <motion.div
      {...animations[animate]}
      style={{ display: 'inline-block' }}
    >
      <Button {...props} />
    </motion.div>
  );
}