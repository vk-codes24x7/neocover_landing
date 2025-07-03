"use client"

import { useEffect, useState } from 'react'
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((open) => !open)
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
              onClick={handleMobileMenuToggle}
              className="md:hidden text-white/80 hover:text-white transition-colors duration-200 p-2 hover:scale-105"
              aria-label="Toggle mobile menu"
              title={isMobileMenuOpen ? "Close menu" : "Open menu"}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={handleMobileMenuToggle}
              className="text-white text-3xl p-2 focus:outline-none"
              aria-label="Close mobile menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            {NAVIGATION_ITEMS.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-white text-2xl font-semibold py-2 hover:text-accent transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => handleNavClick('join')}
              className="w-40 h-12 bg-accent hover:bg-accent/90 text-white font-bold text-lg mt-4"
            >
              Join
            </Button>
          </div>
        </div>
      )}
    </>
  )
} 