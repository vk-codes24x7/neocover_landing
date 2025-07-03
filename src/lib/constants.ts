/**
 * Application constants
 */

export const APP_CONFIG = {
  name: "NeoCover",
  description: "AI-powered job application assistant for resume tailoring, cover letters, and interview prep",
  url: "https://neocover.ai",
  email: "hello@neocover.ai",
} as const

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
] as const

export const FEATURES = [
  {
    icon: 'FileText',
    title: 'Resume Tailoring',
    description: 'AI analyzes job descriptions and customizes your resume bullets for maximum impact.',
    color: 'primary'
  },
  {
    icon: 'MessageSquare',
    title: 'Cover Letter Generation',
    description: 'Generate compelling, personalized cover letters that tell your unique story.',
    color: 'accent'
  },
  {
    icon: 'Target',
    title: 'Match Score',
    description: 'Get an AI-predicted compatibility score and recommendations for improvement.',
    color: 'primary'
  },
  {
    icon: 'ClipboardList',
    title: 'Interview Q&A',
    description: 'Practice with AI-generated interview questions tailored to your target role.',
    color: 'accent'
  }
] as const

export const HOW_IT_WORKS_STEPS = [
  {
    icon: 'Upload',
    title: '1. Upload Resume',
    description: 'Upload your current resume in PDF or Word format. Our AI will analyze your experience and skills.',
    color: 'primary'
  },
  {
    icon: 'ClipboardList',
    title: '2. Paste Job Description',
    description: 'Copy and paste the job description from any job posting. We\'ll identify key requirements and keywords.',
    color: 'accent'
  },
  {
    icon: 'Sparkles',
    title: '3. Get Personalized Output',
    description: 'Receive tailored resume bullets, cover letter, match score, and interview prep materials instantly.',
    color: 'primary'
  }
] as const

export const COMPANY_LOGOS = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Spotify',
  'Airbnb', 'Stripe', 'Uber', 'Slack', 'Dropbox', 'Figma'
] as const

export const STATS = [
  { value: '10K+', label: 'Job Seekers on Waitlist', color: 'primary' },
  { value: '95%', label: 'Interview Success Rate', color: 'accent' },
  { value: '2.5x', label: 'Faster Job Placement', color: 'primary' }
] as const

export const SCROLL_CONFIG = {
  navHeight: 80,
  padding: 20,
  smoothBehavior: 'smooth' as ScrollBehavior
} as const

export const FORM_CONFIG = {
  resetDelay: 3000,
  toastDuration: 5000
} as const 