"use client"

import { useState } from "react"
import { Toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  FileText, 
  Sparkles, 
  Target, 
  MessageSquare, 
  Upload, 
  ClipboardList, 
  ChevronRight,
  Lock,
  Quote
} from "lucide-react"
import Image from "next/image"

// Custom hooks and utilities
import { useScrollProgress, useSmoothScroll } from "@/lib/hooks"

// Components
import { Navigation } from "@/components/navigation"
import { WaitlistForm } from "@/components/waitlist-form"

// Constants and types
import { 
  APP_CONFIG, 
  FEATURES, 
  HOW_IT_WORKS_STEPS, 
  COMPANY_LOGOS, 
  STATS,
  SCROLL_CONFIG 
} from "@/lib/constants"

export default function Home() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  
  // Custom hooks
  const scrollProgress = useScrollProgress()
  const scrollToSection = useSmoothScroll()

  // Toast handlers
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
  }

  const hideToast = () => {
    setToast(null)
  }



  // Form handlers
  const handleFormSuccess = (message: string) => {
    showToast(message, "success")
  }

  const handleFormError = (message: string) => {
    showToast(message, "error")
  }

  // Icon helper function
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      FileText,
      MessageSquare,
      Target,
      ClipboardList,
      Upload,
      Sparkles
    }
    return iconMap[iconName] || FileText
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      
      {/* Navigation */}
      <Navigation 
        scrollToSection={scrollToSection} 
        scrollProgress={scrollProgress} 
      />

      {/* Hero Section */}
      <section id="home" className="py-20 lg:py-32 relative overflow-hidden" role="banner" aria-label="Hero section with waitlist signup">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">

            
            <h1 className="text-5xl lg:text-7xl font-heading font-bold tracking-tight text-foreground">
              Your Future.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Tailored by AI.
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Upload your resume, paste a job description, and get job-winning content in seconds.
            </p>

            {/* Waitlist Form */}
            <div id="join" className="max-w-md mx-auto mt-12">
              <WaitlistForm 
                onSuccess={handleFormSuccess}
                onError={handleFormError}
              />
            </div>

            {/* Testimonial Quote */}
            <div id="testimonials" className="mt-12">
              <Card className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                <div className="flex items-start space-x-4">
                  <Quote className="w-8 h-8 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <blockquote className="text-lg text-foreground mb-4 italic">
                      "NeoCover helped me land 3 interviews in just one week. The AI-tailored resume was spot-on for each role!"
                    </blockquote>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">SJ</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">Software Engineer at Meta</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Proof Logo Bar */}
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-6 font-medium">
                Users got interviews at...
              </p>
              <div className="overflow-hidden relative">
                <div className="flex animate-scroll whitespace-nowrap">
                  {/* First set of companies */}
                  <div className="flex items-center space-x-12 opacity-40">
                    {COMPANY_LOGOS.map((company, index) => (
                      <div key={index} className="text-2xl font-bold text-muted-foreground hover:opacity-60 transition-opacity px-4">
                        {company}
                      </div>
                    ))}
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="flex items-center space-x-12 opacity-40">
                    {COMPANY_LOGOS.map((company, index) => (
                      <div key={`duplicate-${index}`} className="text-2xl font-bold text-muted-foreground hover:opacity-60 transition-opacity px-4">
                        {company}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Demo Placeholder */}
            <div className="mt-16 relative">
              <div className="aspect-video max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 flex items-center justify-center shimmer relative overflow-hidden">
                <div className="text-center space-y-4 z-10 relative">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-lg mb-2">
                      Interactive Demo Coming Soon
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Experience NeoCover's AI in action
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30" aria-label="NeoCover features and capabilities">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI to give you the competitive edge in today's job market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {FEATURES.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon)
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-card border-border group">
                  <div className={`w-12 h-12 bg-${feature.color}/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-${feature.color}/20 transition-colors`}>
                    <IconComponent className={`w-6 h-6 text-${feature.color}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20" aria-label="How NeoCover works - three simple steps">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your job application process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-4 group hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <Upload className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  1. Upload Resume
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Upload your current resume in PDF or Word format. Our AI will analyze your experience and skills.
                </p>
              </div>
            </div>

            <div className="text-center space-y-4 group hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-accent/20 group-hover:shadow-lg group-hover:shadow-accent/25 transition-all duration-300">
                <ClipboardList className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                  2. Paste Job Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Copy and paste the job description from any job posting. We'll identify key requirements and keywords.
                </p>
              </div>
            </div>

            <div className="text-center space-y-4 group hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <Sparkles className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  3. Get Personalized Output
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive tailored resume bullets, cover letter, match score, and interview prep materials instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            {STATS.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className={`text-4xl font-heading font-bold text-${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
              Ready to land more interviews?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of job seekers who are already using AI to get ahead in their career.
            </p>
            <Button 
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg group hover:scale-105 transition-all duration-200"
              aria-label="Join the NeoCover waitlist to get early access"
              onClick={() => {
                scrollToSection('join')
              }}
            >
              Join the Waitlist
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Image 
                src="/logo.png" 
                alt={`${APP_CONFIG.name} - AI Resume Tailoring Platform Logo`}
                width={24} 
                height={24}
                className="w-6 h-6 object-contain"
              />
              <span className="font-heading font-bold tracking-wider text-foreground">
                {APP_CONFIG.name}
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a 
                href="/terms" 
                className="hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
                aria-label="View Terms of Service"
              >
                Terms of Service
              </a>
              <a 
                href="/privacy" 
                className="hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </a>
              <a 
                href={`mailto:${APP_CONFIG.email}`}
                className="hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact NeoCover team"
              >
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
