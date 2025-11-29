import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
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
  CheckCircle
} from 'lucide-react';

export default function ServicesPage() {
  const t = useTranslations('services');

  const serviceFeatures = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock service whenever you need us'
    },
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'Complete insurance coverage for your peace of mind'
    },
    {
      icon: Users,
      title: 'Professional Drivers',
      description: 'Licensed, experienced, and courteous drivers'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment',
      description: 'Cash, card, or online payment options'
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

      {/* Main Services */}
      <Section variant="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <Card key={service.id} hover id={service.id} className="scroll-mt-24">
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
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
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
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Service Features */}
      <Section>
        <SectionHeader 
          title="Why Choose Our Services"
          subtitle="Experience the difference with our professional approach"
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
          title="Additional Services"
          subtitle="Tailored solutions for every transportation need"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Long Distance Transfers</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Comfortable transportation to other cities and countries. 
                    Special rates for long-distance journeys.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Vienna to Bratislava</li>
                    <li>• Airport connections across Austria</li>
                    <li>• Cross-border transfers</li>
                    <li>• Fixed pricing available</li>
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
                  <h3 className="text-xl font-semibold mb-2">Medical Appointments</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Gentle and careful transportation for medical visits and 
                    appointments with special attention to comfort.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Assistance with mobility</li>
                    <li>• Comfortable vehicles</li>
                    <li>• Punctual arrival</li>
                    <li>• Patient and caring drivers</li>
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
            Ready to Experience Professional Service?
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Book your ride today or contact us to discuss custom transportation solutions
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size="lg" as={Link} href="/booking">
              Book Your Ride
            </Button>
            <Button variant="outline" size="lg" as="a" href="tel:+436609002700">
              <Phone className="w-5 h-5 mr-2" />
              Call +43 660 900 2700
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
