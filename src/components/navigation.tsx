"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Menu, X } from 'lucide-react'
import { NAVIGATION_ITEMS, APP_CONFIG } from '@/lib/constants'

interface NavigationProps {
  scrollToSection: (sectionId: string) => void
  scrollProgress: number
}

export function Navigation({ scrollToSection, scrollProgress }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#1F2937]/90 backdrop-blur-md border-b border-border/50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image 
              src="/logo.png" 
              alt={`${APP_CONFIG.name} - AI Resume Tailoring Platform Logo`}
              width={32} 
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-heading font-bold tracking-wider text-white">
              {APP_CONFIG.name}
            </span>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection('join')}
              className="bg-accent hover:bg-accent/90 text-white font-medium px-4 py-2 text-sm"
            >
              Join
            </Button>
          </div>
          
          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white/80 hover:text-white transition-colors duration-200 p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent">
          <div 
            className="h-full bg-[#10B981] transition-all duration-200 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1F2937] border-b border-border/50 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {NAVIGATION_ITEMS.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => handleNavClick('join')}
              className="w-full bg-accent hover:bg-accent/90 text-white font-medium px-4 py-2 text-sm"
            >
              Join
            </Button>
          </div>
        </div>
      )}
    </>
  )
} 