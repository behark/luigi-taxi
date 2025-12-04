/**
 * CORS (Cross-Origin Resource Sharing) utility
 *
 * Provides CORS configuration and helpers for API routes.
 * Restricts API access to allowed origins only.
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Allowed origins for CORS
 * In production, only allow requests from the production domain
 */
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL || 'https://luigitaxi.at',
  'http://localhost:3000',
  'http://localhost:3001',
];

/**
 * Check if the request origin is allowed
 *
 * @param request - The incoming request
 * @returns true if origin is allowed, false otherwise
 */
export function isOriginAllowed(request: NextRequest): boolean {
  const origin = request.headers.get('origin');

  // Allow same-origin requests (no Origin header)
  if (!origin) {
    return true;
  }

  // In development, allow all localhost origins
  if (process.env.NODE_ENV === 'development' && origin.includes('localhost')) {
    return true;
  }

  return ALLOWED_ORIGINS.includes(origin);
}

/**
 * Get CORS headers for the response
 *
 * @param request - The incoming request
 * @returns CORS headers object
 */
export function getCorsHeaders(request: NextRequest): HeadersInit {
  const origin = request.headers.get('origin');

  const headers: HeadersInit = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400', // 24 hours
  };

  // Only set Access-Control-Allow-Origin if origin is allowed
  if (origin && isOriginAllowed(request)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  }

  return headers;
}

/**
 * Handle CORS preflight OPTIONS request
 *
 * @param request - The incoming request
 * @returns Response for preflight request
 */
export function handleCorsPreflightRequest(request: NextRequest): NextResponse {
  if (!isOriginAllowed(request)) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

/**
 * Verify CORS and reject if not allowed
 *
 * @param request - The incoming request
 * @returns Response if CORS check fails, null if allowed
 */
export function verifyCors(request: NextRequest): NextResponse | null {
  if (!isOriginAllowed(request)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Origin not allowed',
      },
      { status: 403 }
    );
  }

  return null;
}
