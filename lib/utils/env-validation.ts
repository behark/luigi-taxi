/**
 * Environment Variable Validation
 *
 * This module validates required environment variables at application startup
 * to ensure the app fails fast with clear error messages rather than
 * experiencing silent failures during runtime.
 */

interface EnvValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface EnvVar {
  name: string;
  required: boolean;
  description: string;
}

const ENV_VARS: EnvVar[] = [
  {
    name: 'RESEND_API_KEY',
    required: false,
    description: 'Resend API key for sending emails (booking confirmations, contact forms)',
  },
  {
    name: 'GOOGLE_MAPS_API_KEY',
    required: false,
    description: 'Google Maps API key for distance calculations and route planning',
  },
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    required: false,
    description: 'Public URL of the website (for SEO and canonical URLs)',
  },
  {
    name: 'ADMIN_EMAIL',
    required: false,
    description: 'Admin email address for receiving booking notifications',
  },
];

/**
 * Validates all environment variables
 * @param throwOnError - If true, throws an error on validation failure
 * @returns Validation result with errors and warnings
 */
export function validateEnvVars(throwOnError: boolean = false): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  ENV_VARS.forEach(({ name, required, description }) => {
    const value = process.env[name];

    if (!value || value.trim() === '') {
      const message = `${name} is not set. ${description}`;

      if (required) {
        errors.push(message);
      } else {
        warnings.push(message);
      }
    }
  });

  const isValid = errors.length === 0;

  // Log results
  if (errors.length > 0) {
    console.error('\n❌ Environment Variable Validation Failed:');
    errors.forEach((error) => console.error(`  • ${error}`));
    console.error('\n');
  }

  if (warnings.length > 0) {
    console.warn('\n⚠️  Environment Variable Warnings:');
    warnings.forEach((warning) => console.warn(`  • ${warning}`));
    console.warn('\n');
  }

  if (isValid && errors.length === 0 && warnings.length === 0) {
    console.log('✅ All required environment variables are configured\n');
  }

  if (throwOnError && !isValid) {
    throw new Error(
      `Missing required environment variables. Please check your .env.local file.\n${errors.join('\n')}`
    );
  }

  return { isValid, errors, warnings };
}

/**
 * Gets an environment variable with runtime validation
 * @param name - Environment variable name
 * @param fallback - Optional fallback value
 * @returns Environment variable value or fallback
 */
export function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name];

  if (!value) {
    if (fallback !== undefined) {
      console.warn(`⚠️  ${name} not set, using fallback value`);
      return fallback;
    }
    throw new Error(`Environment variable ${name} is required but not set`);
  }

  return value;
}

/**
 * Gets an optional environment variable
 * @param name - Environment variable name
 * @returns Environment variable value or undefined
 */
export function getOptionalEnvVar(name: string): string | undefined {
  return process.env[name];
}
