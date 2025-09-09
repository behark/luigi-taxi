import { defineRouting } from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'de',
  pathnames: {
    '/': '/',
    '/services': '/services',
    '/fleet': '/fleet',
    '/booking': '/booking',
    '/contact': '/contact'
  }
});