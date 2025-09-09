'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Phone, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚠️</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
              </p>
            </div>

            <div className="space-y-4">
              <Button size="lg" fullWidth onClick={reset}>
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
              
              <Button variant="outline" size="lg" fullWidth as="a" href="/">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
              
              <Button variant="ghost" size="lg" fullWidth as="a" href="tel:+436609002700">
                <Phone className="w-5 h-5 mr-2" />
                Call Luigi Taxi
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                For immediate assistance, call us at{' '}
                <a 
                  href="tel:+436609002700" 
                  className="text-yellow-600 dark:text-yellow-400 hover:underline font-semibold"
                >
                  +43 660 900 2700
                </a>
              </p>
              {error.digest && (
                <p className="text-xs text-gray-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
