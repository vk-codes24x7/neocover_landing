/**
 * Simple in-memory rate limiting utility
 * For production, consider using Redis or a dedicated rate limiting service
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>()
  private readonly windowMs: number
  private readonly maxRequests: number

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const entry = this.store.get(identifier)

    if (!entry || now > entry.resetTime) {
      // Reset or create new entry
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      })
      return true
    }

    if (entry.count >= this.maxRequests) {
      return false
    }

    // Increment count
    entry.count++
    return true
  }

  getRemainingTime(identifier: string): number {
    const entry = this.store.get(identifier)
    if (!entry) return 0
    return Math.max(0, entry.resetTime - Date.now())
  }

  // Clean up expired entries periodically
  cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key)
      }
    }
  }
}

// Create rate limiters for different endpoints
export const emailCheckLimiter = new RateLimiter(60000, 5) // 5 requests per minute
export const waitlistSubmitLimiter = new RateLimiter(60000, 3) // 3 requests per minute

// Clean up expired entries every 5 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    emailCheckLimiter.cleanup()
    waitlistSubmitLimiter.cleanup()
  }, 5 * 60 * 1000)
} 