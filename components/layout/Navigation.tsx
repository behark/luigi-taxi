'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/Button';
import ThemeToggle from '../../app/components/ThemeToggle';
import LanguageToggle from '../../app/components/LanguageToggle';
import { NAVIGATION_ITEMS, PHONE_NUMBER } from '@/lib/constants/navigation';
import { NavigationItem } from '@/types';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  const renderNavLink = (item: NavigationItem) => (
    <Link 
      key={item.href}
      href={item.href} 
      className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
    >
      {t(item.label)}
    </Link>
  );

  return (
    <nav className="bg-yellow-400 dark:bg-yellow-500 p-4 sticky top-0 z-50 transition-colors">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
            <span>Luigi Taxi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {NAVIGATION_ITEMS.map(renderNavLink)}
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <LanguageToggle />
              <Button
                variant="secondary"
                size="sm"
                as="a"
                href={`tel:${PHONE_NUMBER}`}
              >
                {PHONE_NUMBER}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-yellow-300 dark:hover:bg-yellow-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-yellow-300 dark:border-yellow-600" role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4 pt-4">
              {NAVIGATION_ITEMS.map(renderNavLink)}
              
              <div className="flex items-center gap-2 pt-2">
                <ThemeToggle />
                <LanguageToggle />
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  as="a"
                  href={`tel:${PHONE_NUMBER}`}
                >
                  {PHONE_NUMBER}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}