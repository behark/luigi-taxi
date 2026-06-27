import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent } from '@/components/ui/Card';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { VEHICLE_TYPES } from '@/lib/constants/vehicles';
import { IMAGES } from '@/lib/constants/images';
import { TaxiImage } from '@/components/ui/TaxiImage';
import {
  Users,
  Shield,
  CreditCard,
  Phone,
  CheckCircle,
  Star,
  Award,
  Car
} from 'lucide-react';

export default function FleetPage() {
  const t = useTranslations('fleet');
  const locale = useLocale();
  const isDE = locale === 'de';
  const vehicle = VEHICLE_TYPES[0];

  const fleetFeatures = [
    {
      icon: Shield,
      title: isDE ? 'Sicherheit zuerst' : 'Safety First',
      description: isDE
        ? 'Regelmäßig gewartet und vollständig versichert'
        : 'Regularly maintained and fully insured'
    },
    {
      icon: Award,
      title: isDE ? 'Professioneller Service' : 'Professional Service',
      description: isDE
        ? 'Lizenzierte Fahrer mit langjähriger Erfahrung'
        : 'Licensed drivers with extensive experience'
    },
    {
      icon: Star,
      title: isDE ? 'Premium-Komfort' : 'Premium Comfort',
      description: isDE
        ? 'Sauberes, komfortables und top ausgestattetes Fahrzeug'
        : 'Clean, comfortable, and well-equipped vehicle'
    },
    {
      icon: CreditCard,
      title: isDE ? 'Flexible Zahlung' : 'Flexible Payment',
      description: isDE
        ? 'Verschiedene Zahlungsmöglichkeiten für Ihren Komfort'
        : 'Multiple payment options for your convenience'
    }
  ];

  const vehicleFeatures = [
    {
      category: isDE ? 'Sicherheit' : 'Safety & Security',
      features: isDE
        ? [
            'Regelmäßige Wartung',
            'Vollständiger Versicherungsschutz',
            'GPS-Ortungssystem',
            'Notfall-Kontaktsystem',
            'Erste-Hilfe-Ausstattung'
          ]
        : [
            'Regular maintenance checks',
            'Full insurance coverage',
            'GPS tracking system',
            'Emergency contact system',
            'First aid equipment'
          ]
    },
    {
      category: isDE ? 'Komfort & Annehmlichkeiten' : 'Comfort & Convenience',
      features: isDE
        ? [
            'Klimaanlage / Heizung',
            'Bequeme Ledersitze',
            'Großzügiger Gepäckraum',
            'Lademöglichkeiten für Handys',
            'Kostenloses Wasser'
          ]
        : [
            'Air conditioning / heating',
            'Comfortable leather seating',
            'Ample luggage space',
            'Phone charging ports',
            'Complimentary water'
          ]
    },
    {
      category: isDE ? 'Technik & Service' : 'Technology & Service',
      features: isDE
        ? [
            'Modernes Fahrzeug',
            'Kontaktloses Bezahlen',
            'Professionelle Fahrer',
            'Rund um die Uhr verfügbar',
            'Mehrsprachiger Service'
          ]
        : [
            'Modern vehicle',
            'Contactless payment',
            'Professional drivers',
            '24/7 availability',
            'Multi-language service'
          ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <Section variant="default" className="pt-20">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </Section>

      {/* Our Vehicle: Jaecoo J7 — video, gallery and details */}
      <Section variant="gray">
        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            ✨ {t('showcase.tagline')}
          </span>
          <SectionHeader
            title={t('showcase.title')}
            subtitle={t('showcase.subtitle')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Video */}
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-lg aspect-[3/4] sm:aspect-video lg:aspect-[3/4]">
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              muted
              loop
              preload="metadata"
              poster={IMAGES.jaecoo.poster}
            >
              <source src={IMAGES.jaecoo.video} type="video/mp4" />
            </video>
          </div>

          {/* Photo gallery */}
          <div className="grid grid-cols-2 gap-4">
            {IMAGES.jaecoo.gallery.map((photo, index) => (
              <div
                key={photo.src}
                className={`relative rounded-2xl overflow-hidden shadow-md ${
                  index === 0 ? 'col-span-2 h-64 sm:h-80' : 'h-48 sm:h-56'
                }`}
              >
                <TaxiImage
                  src={photo.src}
                  alt={photo.alt}
                  fallback={photo.fallback}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle details + booking CTA */}
        <div className="mt-10 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h3 className="text-2xl font-bold">{isDE ? vehicle.nameDE : vehicle.name}</h3>
            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4 mr-1" />
              {isDE ? `${vehicle.capacity} Fahrgäste` : `${vehicle.capacity} passengers`}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {isDE ? vehicle.descriptionDE : vehicle.description}
          </p>
          <Button as={Link} href="/booking" size="lg">
            <Car className="w-4 h-4 mr-2" />
            {isDE ? 'Jetzt buchen' : 'Book Now'}
          </Button>
        </div>
      </Section>

      {/* Fleet Features */}
      <Section>
        <SectionHeader
          title={isDE ? 'Warum unser Fahrzeug überzeugt' : 'Why Our Vehicle Stands Out'}
          subtitle={isDE ? 'Qualität und Komfort bei jeder Fahrt' : 'Quality and comfort in every ride'}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleetFeatures.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Vehicle Features Details */}
      <Section variant="gray">
        <SectionHeader
          title={isDE ? 'Standardausstattung' : 'Standard Features'}
          subtitle={isDE ? 'Jede Fahrt mit diesen Premium-Annehmlichkeiten' : 'Every ride comes with these premium amenities'}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicleFeatures.map((category, index) => (
            <Card key={index}>
              <CardContent>
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Special Requirements */}
      <Section>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {isDE ? 'Besondere Wünsche?' : 'Special Requirements?'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {isDE
                ? 'Benötigen Sie einen barrierefreien Transport, Kindersitze oder andere besondere Vorkehrungen? Wir finden gerne eine individuelle Lösung für Sie.'
                : 'Need wheelchair accessibility, child seats, or other special accommodations? We’re here to help with customized solutions.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">{isDE ? 'Gruppen' : 'Groups'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDE ? 'Auf Anfrage organisieren wir Transport für größere Gruppen' : 'Transport for larger groups on request'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">{isDE ? 'Barrierefreiheit' : 'Accessibility'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDE ? 'Barrierefreier Transport auf Anfrage verfügbar' : 'Wheelchair accessible transport on request'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">{isDE ? 'Premium-Service' : 'Premium Service'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDE ? 'Exklusiver Service für besondere Anlässe' : 'Premium service for special occasions'}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button size="lg" as={Link} href="/contact">
                {isDE ? 'Anfrage senden' : 'Discuss Requirements'}
              </Button>
              <Button variant="outline" size="lg" as="a" href="tel:+436609002700">
                <Phone className="w-5 h-5 mr-2" />
                {isDE ? 'Anrufen +43 660 900 2700' : 'Call +43 660 900 2700'}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="dark">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isDE ? 'Bereit für eine komfortable Fahrt?' : 'Ready to Ride in Comfort?'}
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            {isDE ? 'Buchen Sie jetzt und erleben Sie den Komfort von Luigi Taxi' : 'Book now and experience the Luigi Taxi difference'}
          </p>
          <Button size="lg" as={Link} href="/booking">
            {isDE ? 'Jetzt buchen' : 'Book Your Ride Now'}
          </Button>
        </div>
      </Section>
    </div>
  );
}
