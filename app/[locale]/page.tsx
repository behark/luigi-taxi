import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
import { Section, SectionHeader } from '@/components/ui/Section';
import { TaxiImage } from '@/components/ui/TaxiImage';
import { VEHICLE_TYPES } from '@/lib/constants/vehicles';
import { SERVICES } from '@/lib/constants/services';
import { IMAGES } from '@/lib/constants/images';
import SimpleLocationMap from '@/components/maps/SimpleLocationMap';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import PricingCalculator from '@/components/forms/PricingCalculator';

export default function Home() {
  const t = useTranslations('homepage');

  const features = [
    {
      icon: '⏰',
      title: 'features.available.title',
      description: 'features.available.description'
    },
    {
      icon: '🌟',
      title: 'features.professional.title', 
      description: 'features.professional.description'
    },
    {
      icon: '💰',
      title: 'features.pricing.title',
      description: 'features.pricing.description'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center" role="banner">
        <div className="absolute inset-0 z-0">
          <TaxiImage
            src={IMAGES.hero.src}
            alt={IMAGES.hero.alt}
            fallback={IMAGES.hero.fallback}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {t('hero.subtitle')}
          </p>
          <Button size="lg" as={Link} href="/booking">
            {t('hero.bookButton')}
          </Button>
        </div>
      </section>

      {/* Fleet Section */}
      <Section>
        <SectionHeader 
          title={t('fleet.title')}
          subtitle={t('fleet.subtitle')}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VEHICLE_TYPES.map((vehicle) => (
            <Card key={vehicle.id} hover>
              <CardImage 
                src={vehicle.image} 
                alt={vehicle.imageAlt} 
                fallback={vehicle.imageFallback}
              />
              <CardContent>
                <h3 className="text-xl font-semibold mb-3">{vehicle.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {vehicle.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Capacity: {vehicle.capacity} passengers
                </p>
                <Link
                  href={`/fleet#${vehicle.id}`}
                  className="text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
          ))}
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
                <h3 className="text-xl font-semibold mb-3">{t(feature.title)}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t(feature.description)}
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
          {SERVICES.map((service) => (
            <Card key={service.id} hover>
              <CardImage 
                src={service.image} 
                alt={service.imageAlt} 
                fallback={service.imageFallback}
              />
              <CardContent>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <Link
                  href={`/services#${service.id}`}
                  className="text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

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