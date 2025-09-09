import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { VEHICLE_TYPES } from '@/lib/constants/vehicles';
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

  const fleetFeatures = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All vehicles regularly maintained and fully insured'
    },
    {
      icon: Award,
      title: 'Professional Service',
      description: 'Licensed drivers with extensive experience'
    },
    {
      icon: Star,
      title: 'Premium Comfort',
      description: 'Clean, comfortable, and well-equipped vehicles'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment',
      description: 'Multiple payment options for your convenience'
    }
  ];

  const vehicleFeatures = [
    {
      category: 'Safety & Security',
      features: [
        'Regular maintenance checks',
        'Full insurance coverage', 
        'GPS tracking system',
        'Emergency contact system',
        'First aid equipment'
      ]
    },
    {
      category: 'Comfort & Convenience',
      features: [
        'Air conditioning/heating',
        'Comfortable leather seating',
        'Ample luggage space',
        'Phone charging ports',
        'Complimentary water'
      ]
    },
    {
      category: 'Technology & Service',
      features: [
        'Modern vehicle fleet',
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

      {/* Vehicle Types */}
      <Section variant="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VEHICLE_TYPES.map((vehicle) => (
            <Card key={vehicle.id} hover>
              <CardImage 
                src={vehicle.image} 
                alt={vehicle.imageAlt} 
                fallback={vehicle.imageFallback}
              />
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {vehicle.capacity}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {vehicle.description}
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    Price Multiplier: {vehicle.priceMultiplier}x base rate
                  </p>
                </div>

                <Button 
                  variant="primary" 
                  fullWidth 
                  as={Link} 
                  href={`/booking?vehicle=${vehicle.id}`}
                >
                  <Car className="w-4 h-4 mr-2" />
                  Book This Vehicle
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Fleet Features */}
      <Section>
        <SectionHeader 
          title="Why Our Fleet Stands Out"
          subtitle="Quality and comfort in every ride"
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
          title="Standard Features in All Vehicles"
          subtitle="Every ride comes with these premium amenities"
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
              Special Requirements?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Need a larger vehicle, wheelchair accessibility, child seats, or other special accommodations? 
              We&apos;re here to help with customized solutions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Large Groups</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Multiple vehicles or larger vans for groups
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">Accessibility</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wheelchair accessible vehicles available
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">Premium Service</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Executive vehicles for special occasions
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button size="lg" as={Link} href="/contact">
                Discuss Requirements
              </Button>
              <Button variant="outline" size="lg" as="a" href="tel:+436609002700">
                <Phone className="w-5 h-5 mr-2" />
                Call +43 660 900 2700
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="dark">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ride in Comfort?
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Choose from our modern fleet and experience the Luigi Taxi difference
          </p>
          <Button size="lg" as={Link} href="/booking">
            Book Your Ride Now
          </Button>
        </div>
      </Section>
    </div>
  );
}
