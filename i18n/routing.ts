import { defineRouting } from 'next-intl/routing';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/constants/locales';

export const routing = defineRouting({
  locales: [...LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  pathnames: {
    '/': '/',
    '/services': '/services',
    '/fleet': '/fleet',
    '/booking': '/booking',
    '/contact': '/contact'
  }
});