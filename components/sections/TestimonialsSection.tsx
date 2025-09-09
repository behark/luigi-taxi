'use client';

import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex space-x-1 mr-3">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {testimonial.rating}.0/5
                </span>
              </div>

              {/* Comment */}
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.comment}"
              </blockquote>

              {/* Customer Info */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-600 font-medium">
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
          <div className="bg-blue-600 text-white p-6 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2">
              {t('testimonials.cta.title')}
            </h3>
            <p className="mb-4">
              {t('testimonials.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+436609002700"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('navigation.callNow')}
              </a>
              <a
                href="https://wa.me/436609002700"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
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