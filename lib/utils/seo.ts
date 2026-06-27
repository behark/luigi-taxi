import { Metadata } from 'next';
import { SEOData } from '@/types';
import { BUSINESS_INFO } from '@/lib/constants/business';

// Locale-specific SEO defaults
const localeSEO = {
  de: {
    title: 'Luigi Taxi - Professioneller Taxiservice in Wiener Neustadt',
    description:
      'Professioneller und zuverlässiger Taxiservice in Wiener Neustadt, Österreich. 24/7 verfügbar, LGBTQ+ freundlich. Buchen Sie Ihre Fahrt mit Luigi Taxi für sichere und komfortable Beförderung.',
    keywords:
      'taxi wiener neustadt, luigi taxi, flughafentransfer, stadtrundfahrten, geschäftsreisen, 24/7 taxiservice, taxi österreich',
    locale: 'de_AT',
  },
  en: {
    title: 'Luigi Taxi - Professional Taxi Service in Wiener Neustadt',
    description:
      'Professional and reliable taxi service in Wiener Neustadt, Austria. Available 24/7, LGBTQ+ friendly. Book your ride with Luigi Taxi for safe and comfortable transportation.',
    keywords:
      'taxi wiener neustadt, luigi taxi, airport transfer, city tours, business travel, 24/7 taxi service, taxi austria',
    locale: 'en_US',
  },
} as const;

type SupportedLocale = keyof typeof localeSEO;

interface GenerateSEOOptions extends Partial<SEOData> {
  locale?: SupportedLocale;
  path?: string;
  noIndex?: boolean;
}

export function generateSEO(options: GenerateSEOOptions = {}): Metadata {
  const { locale = 'de', path = '', noIndex = false, ...data } = options;
  const localeDefaults = localeSEO[locale] || localeSEO.de;

  const seo = {
    title: data.title || localeDefaults.title,
    description: data.description || localeDefaults.description,
    keywords: data.keywords || localeDefaults.keywords,
    ogImage: data.ogImage || '/images/jaecoo-j7-front.jpg',
  };

  const baseUrl = BUSINESS_INFO.website;
  const currentUrl = `${baseUrl}/${locale}${path}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: BUSINESS_INFO.name }],
    creator: BUSINESS_INFO.name,
    publisher: BUSINESS_INFO.name,
    metadataBase: new URL(baseUrl),
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type: 'website',
      locale: localeDefaults.locale,
      url: currentUrl,
      title: seo.title,
      description: seo.description,
      siteName: BUSINESS_INFO.name,
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'de-AT': `${baseUrl}/de${path}`,
        'en-US': `${baseUrl}/en${path}`,
        'x-default': `${baseUrl}/de${path}`,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    },
  };
}

// Page-specific SEO generators
export function generateHomePageSEO(locale: SupportedLocale = 'de'): Metadata {
  return generateSEO({ locale, path: '' });
}

export function generateBookingPageSEO(locale: SupportedLocale = 'de'): Metadata {
  const titles = {
    de: 'Taxi buchen - Luigi Taxi Wiener Neustadt',
    en: 'Book a Taxi - Luigi Taxi Wiener Neustadt',
  };

  const descriptions = {
    de: 'Buchen Sie jetzt Ihren Taxi-Transfer in Wiener Neustadt. Flughafentransfers, Stadtrundfahrten und mehr. Online-Buchung oder telefonisch unter +43 660 900 2700.',
    en: 'Book your taxi transfer in Wiener Neustadt now. Airport transfers, city tours and more. Online booking or call +43 660 900 2700.',
  };

  return generateSEO({
    locale,
    path: '/booking',
    title: titles[locale],
    description: descriptions[locale],
  });
}

export function generateContactPageSEO(locale: SupportedLocale = 'de'): Metadata {
  const titles = {
    de: 'Kontakt - Luigi Taxi Wiener Neustadt',
    en: 'Contact - Luigi Taxi Wiener Neustadt',
  };

  const descriptions = {
    de: `Kontaktieren Sie Luigi Taxi in Wiener Neustadt. Telefon: ${BUSINESS_INFO.phone}, E-Mail: ${BUSINESS_INFO.email}. Wir sind 24/7 für Sie da.`,
    en: `Contact Luigi Taxi in Wiener Neustadt. Phone: ${BUSINESS_INFO.phone}, Email: ${BUSINESS_INFO.email}. Available 24/7.`,
  };

  return generateSEO({
    locale,
    path: '/contact',
    title: titles[locale],
    description: descriptions[locale],
  });
}

export function generateServicesPageSEO(locale: SupportedLocale = 'de'): Metadata {
  const titles = {
    de: 'Unsere Services - Luigi Taxi Wiener Neustadt',
    en: 'Our Services - Luigi Taxi Wiener Neustadt',
  };

  const descriptions = {
    de: 'Entdecken Sie unsere Taxiservices: Flughafentransfers, Stadtrundfahrten, Geschäftsreisen und mehr. Professionelle Fahrer und komfortable Fahrzeuge.',
    en: 'Discover our taxi services: Airport transfers, city tours, business travel and more. Professional drivers and comfortable vehicles.',
  };

  return generateSEO({
    locale,
    path: '/services',
    title: titles[locale],
    description: descriptions[locale],
  });
}

export function generateFleetPageSEO(locale: SupportedLocale = 'de'): Metadata {
  const titles = {
    de: 'Unsere Fahrzeugflotte - Luigi Taxi Wiener Neustadt',
    en: 'Our Fleet - Luigi Taxi Wiener Neustadt',
  };

  const descriptions = {
    de: 'Unsere moderne Fahrzeugflotte: Standard Limousinen, Executive Fahrzeuge und Minivans für bis zu 8 Passagiere. Komfort und Sicherheit garantiert.',
    en: 'Our modern fleet: Standard sedans, executive vehicles and minivans for up to 8 passengers. Comfort and safety guaranteed.',
  };

  return generateSEO({
    locale,
    path: '/fleet',
    title: titles[locale],
    description: descriptions[locale],
  });
}
