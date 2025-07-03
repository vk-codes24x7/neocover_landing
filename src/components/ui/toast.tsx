"use client"

import * as React from "react"
import { CheckCircle, XCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
  className?: string
}

export function Toast({ message, type, onClose, className }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={cn(
        "fixed top-20 right-4 z-50 flex items-center space-x-3 rounded-lg border p-4 shadow-lg transition-all duration-300",
        type === "success" 
          ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200"
          : "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200",
        className
      )}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      ) : (
        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      )}
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto rounded p-1 hover:bg-black/10 dark:hover:bg-white/10"
        aria-label="Close toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
} 