import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { isValidLocale } from '@/lib/constants/locales';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!isValidLocale(locale)) notFound();

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});