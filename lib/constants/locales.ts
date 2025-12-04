/**
 * Locale configuration - Single source of truth
 *
 * All locale definitions should reference this file to ensure consistency.
 */

/**
 * Supported locales for the application
 */
export const LOCALES = ['en', 'de'] as const;

/**
 * Type for supported locales
 */
export type Locale = (typeof LOCALES)[number];

/**
 * Default locale
 */
export const DEFAULT_LOCALE: Locale = 'de';

/**
 * Locale display names
 */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
};

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}
