import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { validateEmail, validateLinkedIn, normalizeLinkedInUrl } from '@/lib/validation'
import { logger } from '@/lib/logger'
import { waitlistSubmitLimiter } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    if (!waitlistSubmitLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { email, linkedIn } = await request.json()

    // Validate required fields
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required and must be a string' },
        { status: 400 }
      )
    }

    if (!linkedIn || typeof linkedIn !== 'string') {
      return NextResponse.json(
        { error: 'LinkedIn URL is required and must be a string' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      )
    }

    // Validate LinkedIn URL
    const linkedInValidation = validateLinkedIn(linkedIn)
    if (!linkedInValidation.isValid) {
      return NextResponse.json(
        { error: linkedInValidation.error },
        { status: 400 }
      )
    }

    // Note: We rely on the database UNIQUE constraint on email field
    // to handle duplicate emails. This is more efficient than checking first.

    // Normalize LinkedIn URL
    const normalizedLinkedIn = normalizeLinkedInUrl(linkedIn)

    // Insert new waitlist entry
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        linkedin_url: normalizedLinkedIn
      })
      .select()

    if (error) {
      logger.error('Database error adding to waitlist', { 
        error: error.message, 
        code: error.code,
        email 
      })
      
      // Check if it's a unique constraint violation (duplicate email)
      if (error.code === '23505' && error.message.includes('email')) {
        logger.info('Duplicate email attempt', { email })
        return NextResponse.json(
          { error: 'You are already on the waitlist' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to add to waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data?.[0],
      message: 'Successfully added to waitlist'
    })

  } catch (error) {
    logger.error('API error adding to waitlist', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      email: request.body ? 'provided' : 'missing'
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 