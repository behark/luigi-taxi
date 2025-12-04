/**
 * Request body size validation utility
 *
 * Prevents DoS attacks by limiting the size of request bodies.
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Maximum allowed body size in bytes
 * Default: 1MB for API requests
 */
const MAX_BODY_SIZE = 1 * 1024 * 1024; // 1MB

/**
 * Check if the request body size exceeds the limit
 *
 * @param request - The incoming request
 * @param maxSize - Maximum allowed size in bytes (default: 1MB)
 * @returns Response if body is too large, null if within limit
 */
export async function checkBodySize(
  request: NextRequest,
  maxSize: number = MAX_BODY_SIZE
): Promise<NextResponse | null> {
  const contentLength = request.headers.get('content-length');

  // If content-length header is present, check it
  if (contentLength) {
    const size = parseInt(contentLength, 10);

    if (size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: 'Request body too large',
          maxSizeAllowed: `${Math.round(maxSize / 1024)}KB`,
        },
        { status: 413 } // 413 Payload Too Large
      );
    }
  }

  return null;
}

/**
 * Estimate JSON body size from the parsed object
 * Used as a fallback when content-length is not available
 *
 * @param body - The parsed JSON body
 * @returns Estimated size in bytes
 */
export function estimateBodySize(body: unknown): number {
  return JSON.stringify(body).length;
}
