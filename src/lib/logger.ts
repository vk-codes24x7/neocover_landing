/**
 * Production-ready logging utility
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatLog(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context
    }
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.isDevelopment) return true
    
    // In production, only log warnings and errors
    return level === 'warn' || level === 'error'
  }

  info(message: string, context?: Record<string, any>) {
    if (this.shouldLog('info')) {
      const logEntry = this.formatLog('info', message, context)
      console.log(`[INFO] ${logEntry.timestamp}: ${message}`, context || '')
    }
  }

  warn(message: string, context?: Record<string, any>) {
    if (this.shouldLog('warn')) {
      const logEntry = this.formatLog('warn', message, context)
      console.warn(`[WARN] ${logEntry.timestamp}: ${message}`, context || '')
    }
  }

  error(message: string, context?: Record<string, any>) {
    if (this.shouldLog('error')) {
      const logEntry = this.formatLog('error', message, context)
      console.error(`[ERROR] ${logEntry.timestamp}: ${message}`, context || '')
    }
  }

  debug(message: string, context?: Record<string, any>) {
    if (this.isDevelopment) {
      const logEntry = this.formatLog('debug', message, context)
      console.debug(`[DEBUG] ${logEntry.timestamp}: ${message}`, context || '')
    }
  }
}

export const logger = new Logger() 