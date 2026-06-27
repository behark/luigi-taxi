import { BUSINESS_INFO } from '@/lib/constants/business';

interface JsonLdProps {
  type?: 'LocalBusiness' | 'Service' | 'FAQPage' | 'BreadcrumbList';
  data?: Record<string, unknown>;
}

// Generate LocalBusiness structured data
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BUSINESS_INFO.website}/#organization`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    description:
      'Professional and reliable taxi service in Wiener Neustadt, Austria. Available 24/7, LGBTQ+ friendly.',
    url: BUSINESS_INFO.website,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address,
      addressLocality: BUSINESS_INFO.city,
      addressRegion: BUSINESS_INFO.state,
      postalCode: BUSINESS_INFO.postalCode,
      addressCountry: BUSINESS_INFO.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.location.coordinates.lat,
      longitude: BUSINESS_INFO.location.coordinates.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '€€',
    currenciesAccepted: BUSINESS_INFO.currency,
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS_INFO.location.coordinates.lat,
        longitude: BUSINESS_INFO.location.coordinates.lng,
      },
      geoRadius: '50000',
    },
    sameAs: [BUSINESS_INFO.social.facebook, BUSINESS_INFO.social.whatsapp],
    image: `${BUSINESS_INFO.website}/images/jaecoo-j7-front.jpg`,
    logo: `${BUSINESS_INFO.website}/logo.png`,
  };
}

// Generate TaxiService structured data
export function generateTaxiServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: `${BUSINESS_INFO.name} - Taxi Service`,
    description:
      'Professional taxi and transportation services including airport transfers, city tours, and business travel.',
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phone,
    },
    areaServed: {
      '@type': 'City',
      name: BUSINESS_INFO.city,
      containedInPlace: {
        '@type': 'Country',
        name: BUSINESS_INFO.country,
      },
    },
    serviceType: 'Taxi Service',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BUSINESS_INFO.website}/booking`,
      servicePhone: BUSINESS_INFO.phone,
    },
  };
}

// Generate FAQ structured data
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate Breadcrumb structured data
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// JSON-LD Script Component
export default function JsonLd({ type = 'LocalBusiness', data }: JsonLdProps) {
  let schema: Record<string, unknown>;

  switch (type) {
    case 'LocalBusiness':
      schema = generateLocalBusinessSchema();
      break;
    case 'Service':
      schema = generateTaxiServiceSchema();
      break;
    default:
      schema = data || generateLocalBusinessSchema();
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined schema for homepage
export function generateHomePageSchemas() {
  return [generateLocalBusinessSchema(), generateTaxiServiceSchema()];
}
