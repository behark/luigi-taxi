import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'de',
  localePrefix: 'always',
  localeDetection: false, // Disable browser language detection - always use default (de)
  pathnames: {
    '/': '/',
    '/services': '/services',
    '/fleet': '/fleet',
    '/booking': '/booking',
    '/contact': '/contact'
  }
});