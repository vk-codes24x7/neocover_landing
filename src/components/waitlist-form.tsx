"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { validateEmail, validateLinkedIn } from '@/lib/validation'
import { submitWaitlist } from '@/lib/api'
import { FORM_CONFIG } from '@/lib/constants'

interface WaitlistFormProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export function WaitlistForm({ onSuccess, onError }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [linkedInError, setLinkedInError] = useState("")

  const isFormValid = () => {
    return !emailError && !linkedInError && email.trim() !== "" && linkedIn.trim() !== ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (loading) return
    
    setLoading(true)
    
    try {
      // Validate email
      const emailValidation = validateEmail(email)
      if (!emailValidation.isValid) {
        setEmailError(emailValidation.error)
        onError("Please fix the validation errors")
        return
      }

      // Validate LinkedIn
      const linkedInValidation = validateLinkedIn(linkedIn)
      if (!linkedInValidation.isValid) {
        setLinkedInError(linkedInValidation.error)
        onError("Please fix the validation errors")
        return
      }

      // Submit to waitlist using secure API
      await submitWaitlist(email, linkedIn)

      // Success
      setIsSubmitted(true)
      onSuccess("Successfully joined the waitlist!")
      
      // Reset form after delay
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
        setLinkedIn("")
        setEmailError("")
        setLinkedInError("")
      }, FORM_CONFIG.resetDelay)

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      
      if (errorMessage.includes("already on the waitlist")) {
        setEmailError("You are already on the waitlist")
      } else if (errorMessage.includes("Too many requests")) {
        onError("Too many attempts. Please wait a moment and try again.")
      } else {
        onError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (emailError) {
      setEmailError("")
    }
  }

  const handleLinkedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedIn(e.target.value)
    if (linkedInError) {
      setLinkedInError("")
    }
  }

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const validation = validateEmail(e.target.value)
    setEmailError(validation.error)
  }

  const handleLinkedInBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const validation = validateLinkedIn(e.target.value)
    setLinkedInError(validation.error)
  }

  if (isSubmitted) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 shadow-xl">
        <div className="text-center py-4">
          <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            You're on the list!
          </h3>
          <p className="text-muted-foreground">
            We'll notify you when NeoCover is ready.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            required
            className={`h-11 ${emailError ? 'border-destructive focus:border-destructive' : ''}`}
            aria-label="Enter your email address to join the waitlist"
            aria-describedby={emailError ? "email-error" : "email-description"}
            aria-invalid={!!emailError}
          />
          {emailError && (
            <p id="email-error" className="text-sm text-destructive mt-1">
              {emailError}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-sm font-medium">
            LinkedIn Profile URL
          </Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/yourprofile"
            value={linkedIn}
            onChange={handleLinkedInChange}
            onBlur={handleLinkedInBlur}
            required
            className={`h-11 ${linkedInError ? 'border-destructive focus:border-destructive' : ''}`}
            aria-label="Enter your LinkedIn profile URL"
            aria-describedby={linkedInError ? "linkedin-error" : undefined}
            aria-invalid={!!linkedInError}
          />
          {linkedInError && (
            <p id="linkedin-error" className="text-sm text-destructive mt-1">
              {linkedInError}
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={!isFormValid() || loading}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
          aria-label="Join the NeoCover waitlist"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Joining...
            </>
          ) : (
            <>
              Join Waitlist
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>
    </Card>
  )
} 