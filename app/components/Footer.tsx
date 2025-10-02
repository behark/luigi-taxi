'use client';

import Link from 'next/link';
import { Facebook, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BUSINESS_INFO } from '../../lib/constants/business';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact')}</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-yellow-400">
                  {BUSINESS_INFO.phone}
                </a>
              </p>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>{BUSINESS_INFO.address}</p>
                  <p>{BUSINESS_INFO.postalCode} {BUSINESS_INFO.city}</p>
                  <p>{BUSINESS_INFO.country}</p>
                </div>
              </div>
              <p className="text-yellow-400 font-semibold">{BUSINESS_INFO.hours}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-yellow-400">{t('ourServices')}</Link></li>
              <li><Link href="/fleet" className="hover:text-yellow-400">{t('ourFleet')}</Link></li>
              <li><Link href="/booking" className="hover:text-yellow-400">{t('bookNow')}</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              <li><Link href="/services#airport-transfers" className="hover:text-yellow-400">{t('airportTransfers')}</Link></li>
              <li><Link href="/services#business-travel" className="hover:text-yellow-400">{t('businessTravel')}</Link></li>
              <li><Link href="/services#city-tours" className="hover:text-yellow-400">{t('cityTours')}</Link></li>
              <li><Link href="/services#special-events" className="hover:text-yellow-400">{t('specialEvents')}</Link></li>
            </ul>
          </div>

          {/* Social & Payment */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('followUs')}</h3>
            <div className="space-y-3">
              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Luigi Taxi Facebook
              </a>
              <a
                href={BUSINESS_INFO.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('onlineFindUs')}
              </a>
            </div>
            <div className="mt-6">
              <h4 className="font-bold mb-2">{t('weAccept')}:</h4>
              <p className="text-sm">Cash • {t('creditDebitCards')}</p>
              <p className="text-sm">{t('onlinePayment')}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>{t('copyright')}</p>
          <p className="mt-2 text-sm">LGBTQ+ friendly • Available 24/7</p>
        </div>
      </div>
    </footer>
  );
}
