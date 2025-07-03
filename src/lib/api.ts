/**
 * Client-side API service for secure server-side operations
 */

import { logger } from './logger'

export interface CheckEmailResponse {
  exists: boolean
  email: string
}

export interface AddToWaitlistResponse {
  success: boolean
  data?: any
  message: string
}

export interface ApiError {
  error: string
}

/**
 * Check if email already exists in waitlist
 */
export async function checkEmailExists(email: string): Promise<CheckEmailResponse> {
  try {
    const response = await fetch('/api/waitlist/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(errorData.error || 'Failed to check email')
    }

    return await response.json()
  } catch (error) {
    logger.error('Error checking email existence', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      email 
    })
    throw error
  }
}

/**
 * Add new entry to waitlist
 */
export async function addToWaitlist(email: string, linkedIn: string): Promise<AddToWaitlistResponse> {
  try {
    const response = await fetch('/api/waitlist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, linkedIn }),
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new Error(errorData.error || 'Failed to add to waitlist')
    }

    return await response.json()
  } catch (error) {
    logger.error('Error adding to waitlist', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      email,
      linkedIn 
    })
    throw error
  }
}

/**
 * Complete waitlist submission process
 */
export async function submitWaitlist(email: string, linkedIn: string): Promise<AddToWaitlistResponse> {
  // The server-side API handles validation and insertion with database-level duplicate checking
  return await addToWaitlist(email, linkedIn)
} 