import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { logger } from '@/lib/logger'
import { emailCheckLimiter } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    if (!emailCheckLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { email } = await request.json()

    // Validate email parameter
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required and must be a string' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email exists in waitlist
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase().trim())
      .limit(1)

    if (error) {
      logger.error('Database error checking email', { error: error.message, email })
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      )
    }

    const exists = data && data.length > 0

    return NextResponse.json({
      exists,
      email: email.toLowerCase().trim()
    })

  } catch (error) {
    logger.error('API error checking email', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      email: request.body ? 'provided' : 'missing'
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 