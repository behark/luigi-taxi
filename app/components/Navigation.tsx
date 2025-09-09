'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('navigation');

  return (
    <nav className="bg-yellow-400 dark:bg-yellow-500 p-4 sticky top-0 z-50 transition-colors">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
            <span>Luigi Taxi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-800">{t('home')}</Link>
            <Link href="/services" className="hover:text-gray-800">{t('services')}</Link>
            <Link href="/fleet" className="hover:text-gray-800">{t('fleet')}</Link>
            <Link href="/booking" className="hover:text-gray-800">{t('booking')}</Link>
            <Link href="/contact" className="hover:text-gray-800">{t('contact')}</Link>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <LanguageToggle />
              <a href="tel:+436609002700" className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                +43 660 900 2700
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4" role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-gray-800">{t('home')}</Link>
              <Link href="/services" className="hover:text-gray-800">{t('services')}</Link>
              <Link href="/fleet" className="hover:text-gray-800">{t('fleet')}</Link>
              <Link href="/booking" className="hover:text-gray-800">{t('booking')}</Link>
              <Link href="/contact" className="hover:text-gray-800">{t('contact')}</Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
                <a href="tel:+436609002700" className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 text-center transition-colors">
                  +43 660 900 2700
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
