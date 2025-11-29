import { NavigationItem } from '@/types';
import { BUSINESS_INFO } from './business';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: '/', label: 'navigation.home' },
  { href: '/services', label: 'navigation.services' },
  { href: '/fleet', label: 'navigation.fleet' },
  { href: '/booking', label: 'navigation.booking' },
  { href: '/contact', label: 'navigation.contact' },
];

// Re-export phone number from centralized business info
export const PHONE_NUMBER = BUSINESS_INFO.phone;