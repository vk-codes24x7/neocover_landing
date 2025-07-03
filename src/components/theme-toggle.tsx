"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 hover:scale-105 transition-all duration-200">
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative text-white hover:bg-white/10 hover:scale-105 transition-all duration-200 group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0 group-hover:rotate-12" aria-hidden="true" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100 group-hover:-rotate-12" aria-hidden="true" />
      <span className="sr-only">Toggle between light and dark mode</span>
    </Button>
  )
} 