import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent } from '@/components/ui/Card';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SERVICES } from '@/lib/constants/services';
import {
  Plane,
  Heart,
  Clock,
  Shield,
  Users,
  CreditCard,
  Phone,
  CheckCircle,
  MapPin,
  Briefcase,
  Sparkles,
  type LucideIcon
} from 'lucide-react';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'city-tours': MapPin,
  'airport-transfers': Plane,
  'business-travel': Briefcase,
  'special-events': Sparkles,
};

export default function ServicesPage() {
  const t = useTranslations('services');
  const locale = useLocale();
  const isDE = locale === 'de';

  const serviceFeatures = [
    {
      icon: Clock,
      title: isDE ? 'Rund um die Uhr' : '24/7 Availability',
      description: isDE
        ? 'Service rund um die Uhr, wann immer Sie uns brauchen'
        : 'Round-the-clock service whenever you need us'
    },
    {
      icon: Shield,
      title: isDE ? 'Vollständig versichert' : 'Fully Insured',
      description: isDE
        ? 'Umfassender Versicherungsschutz für Ihre Sicherheit'
        : 'Complete insurance coverage for your peace of mind'
    },
    {
      icon: Users,
      title: isDE ? 'Professionelle Fahrer' : 'Professional Drivers',
      description: isDE
        ? 'Lizenzierte, erfahrene und freundliche Fahrer'
        : 'Licensed, experienced, and courteous drivers'
    },
    {
      icon: CreditCard,
      title: isDE ? 'Flexible Zahlung' : 'Flexible Payment',
      description: isDE
        ? 'Bar, Karte oder Online-Zahlung'
        : 'Cash, card, or online payment options'
    }
  ];

  const longDistanceItems = isDE
    ? ['Wien nach Bratislava', 'Flughafenanbindungen in ganz Österreich', 'Grenzüberschreitende Fahrten', 'Festpreise verfügbar']
    : ['Vienna to Bratislava', 'Airport connections across Austria', 'Cross-border transfers', 'Fixed pricing available'];

  const medicalItems = isDE
    ? ['Unterstützung bei eingeschränkter Mobilität', 'Komfortables Fahrzeug', 'Pünktliche Ankunft', 'Geduldige und fürsorgliche Fahrer']
    : ['Assistance with mobility', 'Comfortable vehicle', 'Punctual arrival', 'Patient and caring drivers'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <Section variant="default" className="pt-20">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </Section>

      {/* Main Services */}
      <Section variant="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id] ?? Sparkles;
            const features = (isDE ? service.featuresDE : service.features) ?? service.features;
            return (
            <Card key={service.id} hover id={service.id} className="scroll-mt-24">
              <CardContent>
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{isDE ? service.titleDE : service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isDE ? service.descriptionDE : service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  fullWidth
                  as={Link}
                  href={`/booking?service=${service.id}`}
                >
                  {isDE ? 'Jetzt buchen' : 'Book Now'}
                </Button>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </Section>

      {/* Service Features */}
      <Section>
        <SectionHeader
          title={isDE ? 'Warum unser Service' : 'Why Choose Our Services'}
          subtitle={isDE ? 'Erleben Sie den Unterschied unseres professionellen Service' : 'Experience the difference with our professional approach'}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceFeatures.map((feature, index) => (
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

      {/* Additional Services */}
      <Section variant="gray">
        <SectionHeader
          title={isDE ? 'Weitere Leistungen' : 'Additional Services'}
          subtitle={isDE ? 'Maßgeschneiderte Lösungen für jeden Transportbedarf' : 'Tailored solutions for every transportation need'}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{isDE ? 'Fernfahrten' : 'Long Distance Transfers'}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {isDE
                      ? 'Komfortabler Transport in andere Städte und Länder. Sonderpreise für lange Strecken.'
                      : 'Comfortable transportation to other cities and countries. Special rates for long-distance journeys.'}
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {longDistanceItems.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{isDE ? 'Arzttermine' : 'Medical Appointments'}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {isDE
                      ? 'Sanfter und sorgfältiger Transport zu Arztbesuchen und Terminen mit besonderem Augenmerk auf Komfort.'
                      : 'Gentle and careful transportation for medical visits and appointments with special attention to comfort.'}
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {medicalItems.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="dark">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isDE ? 'Bereit für professionellen Service?' : 'Ready to Experience Professional Service?'}
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            {isDE
              ? 'Buchen Sie noch heute oder kontaktieren Sie uns für individuelle Transportlösungen'
              : 'Book your ride today or contact us to discuss custom transportation solutions'}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size="lg" as={Link} href="/booking">
              {isDE ? 'Jetzt buchen' : 'Book Your Ride'}
            </Button>
            <Button variant="outline" size="lg" as="a" href="tel:+436609002700">
              <Phone className="w-5 h-5 mr-2" />
              {isDE ? 'Anrufen +43 660 900 2700' : 'Call +43 660 900 2700'}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
