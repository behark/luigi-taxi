import type { Metadata } from "next";
import "./globals.css";
import { validateEnvVars } from "@/lib/utils/env-validation";

// Validate environment variables at startup (warnings only, never blocks build)
validateEnvVars(false);

// Root layout metadata - locale-specific metadata is handled in [locale]/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://luigitaxi.at'),
  title: {
    default: 'Luigi Taxi - Professional Taxi Service in Wiener Neustadt',
    template: '%s | Luigi Taxi',
  },
  description: 'Professional and reliable taxi service in Wiener Neustadt, Austria. Available 24/7, LGBTQ+ friendly. Book your ride with Luigi Taxi for safe and comfortable transportation.',
  keywords: 'taxi wiener neustadt, luigi taxi, airport transfer, city tours, business travel, 24/7 taxi service',
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
    locale: 'de_AT',
    url: 'https://luigitaxi.at',
    title: 'Luigi Taxi - Professional Taxi Service in Wiener Neustadt',
    description: 'Professional and reliable taxi service in Wiener Neustadt, Austria. Available 24/7, LGBTQ+ friendly.',
    siteName: 'Luigi Taxi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luigi Taxi - Professional Taxi Service in Wiener Neustadt',
    description: 'Professional and reliable taxi service in Wiener Neustadt, Austria. Available 24/7, LGBTQ+ friendly.',
  },
  // Google verification is set via environment variable
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
