/**
 * Environment variable validation
 */

function validateEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  NEXT_PUBLIC_SUPABASE_URL: validateEnvVar(
    'NEXT_PUBLIC_SUPABASE_URL',
    process.env.NEXT_PUBLIC_SUPABASE_URL
  ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: validateEnvVar(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ),
  SUPABASE_SERVICE_ROLE_KEY: validateEnvVar(
    'SUPABASE_SERVICE_ROLE_KEY',
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ),
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const

// Validate environment on server startup
if (typeof window === 'undefined') {
  try {
    // This will throw if any required env vars are missing
    console.log('Environment validation passed')
  } catch (error) {
    console.error('Environment validation failed:', error)
    process.exit(1)
  }
} 