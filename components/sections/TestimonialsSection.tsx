'use client';

import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BUSINESS_INFO } from '@/lib/constants/business';

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Schmidt',
    rating: 5,
    comment: 'Ausgezeichneter Service! Pünktlich, sauber und sehr professionell. Luigi ist der beste Taxifahrer in Wiener Neustadt.',
    service: 'Flughafentransfer',
    location: 'Wiener Neustadt'
  },
  {
    id: '2',
    name: 'Hans Weber',
    rating: 5,
    comment: 'Zuverlässig und freundlich. Fahre regelmäßig mit Luigi Taxi und bin immer zufrieden. Faire Preise!',
    service: 'Stadtfahrt',
    location: 'Baden'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Perfect service to Vienna Airport! On time, clean car, and very professional. Highly recommended!',
    service: 'Airport Transfer',
    location: 'Vienna'
  },
  {
    id: '4',
    name: 'Franz Müller',
    rating: 5,
    comment: '24/7 verfügbar und immer zuverlässig. Luigi Taxi ist meine erste Wahl für alle Fahrten. Top Service!',
    service: 'Geschäftsfahrt',
    location: 'Wiener Neustadt'
  }
];

export default function TestimonialsSection() {
  const t = useTranslations();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex space-x-1 mr-3" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.rating}.0/5
                </span>
              </div>

              {/* Comment */}
              <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic">
                &ldquo;{testimonial.comment}&rdquo;
              </blockquote>

              {/* Customer Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                      {testimonial.service}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-yellow-500 dark:bg-yellow-600 text-black p-6 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2">
              {t('testimonials.cta.title')}
            </h3>
            <p className="mb-4 text-gray-800">
              {t('testimonials.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                {t('navigation.callNow')}
              </a>
              <a
                href={BUSINESS_INFO.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                {t('whatsapp.bookNow')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
