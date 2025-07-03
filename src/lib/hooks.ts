import { useState, useEffect } from 'react'

/**
 * Custom hook for scroll progress tracking
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollProgress
}

/**
 * Custom hook for smooth scrolling to sections
 */
export const useSmoothScroll = () => {
  const scrollToSection = (sectionId: string, navHeight: number = 80, padding: number = 20) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.offsetTop - navHeight - padding
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return scrollToSection
}

/**
 * Custom hook for form validation state
 */
export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const setError = (field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const setTouchedField = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const hasErrors = () => Object.keys(errors).length > 0

  const getFieldError = (field: string) => errors[field] || ''

  const isFieldTouched = (field: string) => touched[field] || false

  return {
    errors,
    touched,
    setError,
    clearError,
    setTouchedField,
    hasErrors,
    getFieldError,
    isFieldTouched
  }
} 