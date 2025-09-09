import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🚕</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Oops! It looks like this page has taken a different route. 
            Let us help you get back on track.
          </p>
        </div>

        <div className="space-y-4">
          <Button size="lg" fullWidth as={Link} href="/">
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
          
          <Button variant="outline" size="lg" fullWidth as={Link} href="/booking">
            Book a Ride
          </Button>
          
          <Button variant="ghost" size="lg" fullWidth as="a" href="tel:+436609002700">
            <Phone className="w-5 h-5 mr-2" />
            Call Luigi Taxi
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need immediate assistance? We&apos;re available 24/7 at{' '}
            <a 
              href="tel:+436609002700" 
              className="text-yellow-600 dark:text-yellow-400 hover:underline font-semibold"
            >
              +43 660 900 2700
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
