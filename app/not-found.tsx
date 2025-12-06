/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🚕</div>
          <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Page Not Found
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Oops! It looks like this page has taken a different route.
            Let us help you get back on track.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              backgroundColor: '#eab308',
              color: '#000',
              borderRadius: '9999px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            ⌂ Go Home
          </a>

          <a
            href="/booking"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              backgroundColor: 'transparent',
              color: '#eab308',
              border: '2px solid #eab308',
              borderRadius: '9999px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Book a Ride
          </a>

          <a
            href="tel:+436609002700"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              backgroundColor: 'transparent',
              color: '#666',
              borderRadius: '9999px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            ☎ Call Luigi Taxi
          </a>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Need immediate assistance? We're available 24/7 at{' '}
            <a
              href="tel:+436609002700"
              style={{ color: '#eab308', fontWeight: '600', textDecoration: 'none' }}
            >
              +43 660 900 2700
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
