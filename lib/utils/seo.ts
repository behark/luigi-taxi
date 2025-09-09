import { Metadata } from 'next';
import { SEOData } from '@/types';

const defaultSEO = {
  title: 'Luigi Taxi - Professional Taxi Service in Wiener Neustadt',
  description: 'Professional and reliable taxi service in Wiener Neustadt, Austria. Available 24/7, LGBTQ+ friendly. Book your ride with Luigi Taxi for safe and comfortable transportation.',
  keywords: 'taxi wiener neustadt, luigi taxi, airport transfer, city tours, business travel, 24/7 taxi service',
  ogImage: '/taxi-hero.jpg',
};

export function generateSEO(data: Partial<SEOData> = {}): Metadata {
  const seo = { ...defaultSEO, ...data };
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Luigi Taxi' }],
    creator: 'Luigi Taxi',
    publisher: 'Luigi Taxi',
    robots: {
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
      locale: 'en_US',
      url: 'https://luigitaxi.at',
      title: seo.title,
      description: seo.description,
      siteName: 'Luigi Taxi',
      images: [
        {
          url: seo.ogImage || '/taxi-hero.jpg',
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
      images: [seo.ogImage || '/taxi-hero.jpg'],
    },
    alternates: {
      canonical: 'https://luigitaxi.at',
      languages: {
        'en': 'https://luigitaxi.at/en',
        'de': 'https://luigitaxi.at/de',
      },
    },
    verification: {
      google: 'google-site-verification-code',
    },
  };
}