import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Section, SectionHeader } from '@/components/ui/Section';
import { TaxiImage } from '@/components/ui/TaxiImage';
import { VEHICLE_TYPES } from '@/lib/constants/vehicles';
import { SERVICES } from '@/lib/constants/services';
import { IMAGES } from '@/lib/constants/images';
import SimpleLocationMap from '@/components/maps/SimpleLocationMap';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import PricingCalculator from '@/components/forms/PricingCalculator';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { MapPin, Plane, Briefcase, Sparkles, type LucideIcon } from 'lucide-react';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'city-tours': MapPin,
  'airport-transfers': Plane,
  'business-travel': Briefcase,
  'special-events': Sparkles,
};

export default function Home() {
  const t = useTranslations('homepage');
  const locale = useLocale();
  const isDE = locale === 'de';
  const j7 = VEHICLE_TYPES[0];

  const features = [
    {
      icon: '⏰',
      key: 'available247'
    },
    {
      icon: '🌟',
      key: 'professionalDrivers'
    },
    {
      icon: '💰',
      key: 'fairPricing'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center py-12 md:py-0" role="banner">
        <div className="absolute inset-0 z-0">
          <TaxiImage
            src={IMAGES.hero.src}
            alt={IMAGES.hero.alt}
            fallback={IMAGES.hero.fallback}
            fill
            className="object-cover object-[50%_72%] brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
            {t('hero.title')}
          </h1>
          <p className="text-2xl md:text-3xl text-yellow-400 font-semibold mb-4">
            {t('hero.tagline')}
          </p>
          <p className="text-xl md:text-2xl mb-8">
            {t('hero.subtitle')}
          </p>
          <Button size="lg" as={Link} href="/booking">
            {t('hero.bookButton')}
          </Button>
        </div>
      </section>

      {/* Service Highlights Section */}
      <Section variant="gray">
        <SectionHeader
          title={t('serviceHighlights.title')}
          subtitle={t('serviceHighlights.subtitle')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[
            { icon: '📅', key: 'preBooking' },
            { icon: '✈️', key: 'stationAirport' },
            { icon: '💳', key: 'cardPayment' },
            { icon: '🚗', key: 'cityLongShopping' },
            { icon: '👥', key: 'sevenSeater' },
            { icon: '💼', key: 'businessPrivate' },
            { icon: '💰', key: 'flatRate' },
          ].map((service) => (
            <div
              key={service.key}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex items-center space-x-3"
            >
              <span className="text-2xl">{service.icon}</span>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {t(`serviceHighlights.${service.key}`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Fleet Section */}
      <Section>
        <SectionHeader 
          title={t('fleet.title')}
          subtitle={t('fleet.subtitle')}
        />
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-64 lg:h-auto lg:min-h-[320px]">
            <TaxiImage
              src={j7.image}
              alt={j7.imageAlt}
              fallback={j7.imageFallback}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-3">{isDE ? j7.nameDE : j7.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {isDE ? j7.descriptionDE : j7.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {t('fleet.capacity', { count: j7.capacity })}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button as={Link} href="/booking">
                {t('hero.bookButton')}
              </Button>
              <Link
                href="/fleet"
                className="text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section variant="gray">
        <SectionHeader 
          title={t('features.title')}
          subtitle={t('features.subtitle')}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{t(`features.${feature.key}.title`)}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t(`features.${feature.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Services Section */}
      <Section>
        <SectionHeader 
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id] ?? Sparkles;
            return (
            <Card key={service.id} hover>
              <CardContent>
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{isDE ? service.titleDE : service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isDE ? service.descriptionDE : service.description}
                </p>
                <Link
                  href={`/services#${service.id}`}
                  className="text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
                >
                  {t('learnMore')}
                </Link>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </Section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Location & Pricing Section */}
      <Section variant="gray">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Location Map */}
          <SimpleLocationMap />
          
          {/* Pricing Calculator */}
          <PricingCalculator />
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="dark">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size="lg" as={Link} href="/booking">
              {t('hero.bookButton')}
            </Button>
            <Button variant="outline" size="lg" as={Link} href="/contact">
              {t('cta.contactButton')}
            </Button>
            <WhatsAppButton variant="inline" className="bg-green-600 hover:bg-green-700" />
          </div>
        </div>
      </Section>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}