import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// Note: In production with multiple instances, use Redis or similar
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
const CLEANUP_INTERVAL = 60000; // 1 minute
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
  lastCleanup = now;
}

// Get client identifier (IP address or fallback)
export function getClientIdentifier(request: NextRequest): string {
  // Try various headers for the real IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to a default identifier
  return 'unknown-client';
}

// Check rate limit for a given identifier
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetIn: number } {
  cleanupExpiredEntries();

  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetTime < now) {
    // Create new entry
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + config.interval,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetIn: config.interval,
    };
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(identifier, entry);

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetIn: entry.resetTime - now,
  };
}

// Rate limit configurations for different endpoints
export const RATE_LIMITS = {
  booking: {
    interval: 60000, // 1 minute
    maxRequests: 5, // 5 bookings per minute
  },
  contact: {
    interval: 60000, // 1 minute
    maxRequests: 3, // 3 contact form submissions per minute
  },
  general: {
    interval: 60000, // 1 minute
    maxRequests: 60, // 60 requests per minute
  },
} as const;

// Middleware helper for rate limiting
export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config: RateLimitConfig = RATE_LIMITS.general
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const identifier = getClientIdentifier(request);
    const { allowed, remaining, resetIn } = checkRateLimit(identifier, config);

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil(resetIn / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(resetIn / 1000)),
            'X-RateLimit-Limit': String(config.maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(resetIn / 1000)),
          },
        }
      );
    }

    const response = await handler(request);

    // Add rate limit headers to successful responses
    response.headers.set('X-RateLimit-Limit', String(config.maxRequests));
    response.headers.set('X-RateLimit-Remaining', String(remaining));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil(resetIn / 1000)));

    return response;
  };
}

// Simple rate limit check for use in API routes
export function createRateLimiter(config: RateLimitConfig) {
  return (request: NextRequest) => {
    const identifier = getClientIdentifier(request);
    return checkRateLimit(identifier, config);
  };
}
