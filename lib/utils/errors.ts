import { BUSINESS_INFO } from '@/lib/constants/business';

// Custom error types
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  public readonly fields: Record<string, string>;

  constructor(message: string, fields: Record<string, string> = {}) {
    super(message, 400);
    this.fields = fields;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class RateLimitError extends AppError {
  public readonly retryAfter: number;

  constructor(retryAfter: number) {
    super('Too many requests. Please try again later.', 429);
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

// Error messages with translations
export const ERROR_MESSAGES = {
  de: {
    generic: `Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an: ${BUSINESS_INFO.phone}`,
    validation: 'Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.',
    rateLimit: 'Zu viele Anfragen. Bitte warten Sie einen Moment.',
    network: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.',
    booking: {
      failed: `Buchung fehlgeschlagen. Bitte rufen Sie uns direkt an: ${BUSINESS_INFO.phone}`,
      invalidDate: 'Bitte wählen Sie ein gültiges Datum.',
      invalidTime: 'Bitte wählen Sie eine gültige Uhrzeit.',
      pastDate: 'Der Abholtermin muss in der Zukunft liegen.',
    },
    contact: {
      failed: `Nachricht konnte nicht gesendet werden. Bitte kontaktieren Sie uns unter: ${BUSINESS_INFO.email}`,
    },
  },
  en: {
    generic: `An error occurred. Please try again or call us: ${BUSINESS_INFO.phone}`,
    validation: 'Please check your input and try again.',
    rateLimit: 'Too many requests. Please wait a moment.',
    network: 'Network error. Please check your internet connection.',
    booking: {
      failed: `Booking failed. Please call us directly: ${BUSINESS_INFO.phone}`,
      invalidDate: 'Please select a valid date.',
      invalidTime: 'Please select a valid time.',
      pastDate: 'Pickup time must be in the future.',
    },
    contact: {
      failed: `Could not send message. Please contact us at: ${BUSINESS_INFO.email}`,
    },
  },
} as const;

type SupportedLocale = keyof typeof ERROR_MESSAGES;

// Get error message for locale
export function getErrorMessage(
  key: string,
  locale: SupportedLocale = 'de'
): string {
  const messages = ERROR_MESSAGES[locale] || ERROR_MESSAGES.de;
  const keys = key.split('.');

  let result: unknown = messages;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return messages.generic;
    }
  }

  return typeof result === 'string' ? result : messages.generic;
}

// Format API error response
export function formatApiError(error: unknown): {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
} {
  if (error instanceof ValidationError) {
    return {
      success: false,
      message: error.message,
      errors: Object.entries(error.fields).map(([field, message]) => ({
        field,
        message,
      })),
    };
  }

  if (error instanceof AppError) {
    return {
      success: false,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: false,
    message: ERROR_MESSAGES.en.generic,
  };
}

// Log error (replace with proper logging service in production)
export function logError(error: unknown, context?: Record<string, unknown>): void {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
    if (context) {
      console.error('Context:', context);
    }
  }

  // In production, send to error tracking service like Sentry
  // if (process.env.SENTRY_DSN) {
  //   Sentry.captureException(error, { extra: context });
  // }
}

// Check if error is operational (expected) or programming error
export function isOperationalError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}
