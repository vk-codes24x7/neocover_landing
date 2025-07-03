/**
 * Validation utilities for form inputs
 */

export interface ValidationResult {
  isValid: boolean
  error: string
}

/**
 * Sanitizes and validates email address format
 */
export const validateEmail = (email: string): ValidationResult => {
  // Sanitize input
  const sanitizedEmail = email.trim().toLowerCase()
  
  if (!sanitizedEmail) {
    return { isValid: false, error: "Email is required" }
  }
  
  // Check for suspicious patterns
  if (sanitizedEmail.length > 254) {
    return { isValid: false, error: "Email address is too long" }
  }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  if (!emailRegex.test(sanitizedEmail)) {
    return { isValid: false, error: "Please enter a valid email address" }
  }
  
  return { isValid: true, error: "" }
}

/**
 * Validates LinkedIn profile URL format
 */
export const validateLinkedIn = (linkedIn: string): ValidationResult => {
  if (!linkedIn.trim()) {
    return { isValid: false, error: "LinkedIn profile URL is required" }
  }
  
  // Normalize the URL - add https:// if missing
  let normalizedUrl = linkedIn.trim()
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl
  }
  
  // Comprehensive regex to handle various LinkedIn URL formats
  const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_]+\/?$/
  
  if (!linkedInRegex.test(normalizedUrl)) {
    return { 
      isValid: false, 
      error: "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)" 
    }
  }
  
  return { isValid: true, error: "" }
}

/**
 * Normalizes LinkedIn URL for storage
 */
export const normalizeLinkedInUrl = (linkedIn: string): string => {
  let normalizedUrl = linkedIn.trim()
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl
  }
  return normalizedUrl
} 