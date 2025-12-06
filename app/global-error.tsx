/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useEffect } from 'react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

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
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚠️</div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Something went wrong
              </h1>
              <p style={{ marginBottom: '2rem', color: '#666' }}>
                We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
              </p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <button
                onClick={reset}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  backgroundColor: '#eab308',
                  color: '#000',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}
              >
                ↻ Try Again
              </button>

              <a
                href="/"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  backgroundColor: 'transparent',
                  color: '#eab308',
                  border: '2px solid #eab308',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}
              >
                ⌂ Go Home
              </a>

              <a
                href="tel:+436609002700"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: 'none',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                ☎ Call Luigi Taxi
              </a>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>
                For immediate assistance, call us at{' '}
                <a
                  href="tel:+436609002700"
                  style={{ color: '#eab308', fontWeight: '600', textDecoration: 'none' }}
                >
                  +43 660 900 2700
                </a>
              </p>
              {error.digest && (
                <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>
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
