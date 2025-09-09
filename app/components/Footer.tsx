import Link from 'next/link';
import { Facebook, Phone, MapPin, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../../lib/constants/business';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
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
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-yellow-400">Our Services</Link></li>
              <li><Link href="/fleet" className="hover:text-yellow-400">Our Fleet</Link></li>
              <li><Link href="/booking" className="hover:text-yellow-400">Book Now</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services#airport-transfers" className="hover:text-yellow-400">Airport Transfers</Link></li>
              <li><Link href="/services#business-travel" className="hover:text-yellow-400">Business Travel</Link></li>
              <li><Link href="/services#city-tours" className="hover:text-yellow-400">City Tours</Link></li>
              <li><Link href="/services#special-events" className="hover:text-yellow-400">Special Events</Link></li>
            </ul>
          </div>

          {/* Social & Payment */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
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
                Find us on Maps
              </a>
            </div>
            <div className="mt-6">
              <h4 className="font-bold mb-2">We Accept:</h4>
              <p className="text-sm">Cash • Credit/Debit Cards</p>
              <p className="text-sm">Online Payment</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>© {new Date().getFullYear()} Luigi Taxi e.U. All rights reserved.</p>
          <p className="mt-2 text-sm">LGBTQ+ friendly • Available 24/7</p>
        </div>
      </div>
    </footer>
  );
}
