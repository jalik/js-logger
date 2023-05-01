/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { LogEvent, LogEventContext } from './event'
import levels, { DEBUG, ERROR, FATAL, INFO, WARN } from './levels'
import consoleOutput from './outputs/consoleOutput'
import { getErrorDetails } from './util'

export interface LoggerOptions {
  /**
   * Enable or disable the logger by default.
   */
  active?: boolean;
  /**
   * Defines a default context to use for each log.
   */
  defaultContext?: LogEventContext;
  /**
   * Allow filtering logs (this is called after the normal level filtering).
   * Return false in the function to ignore a log event.
   * @param event
   */
  filter?: (event: LogEvent<LogEventContext>) => boolean;
  /**
   * The logs level filter to use.
   * Log events with lower importance will be ignored (DEBUG < INFO < WARN < ERROR < FATAL).
   */
  level?: string;
  /**
   * The logger name.
   */
  name?: string;
  /**
   * The list of output handlers.
   * All handlers are called one after the other.
   */
  outputs?: Array<(ev: LogEvent<LogEventContext>) => void>;
}

class Logger {
  public active: boolean

  public defaultContext?: LogEventContext

  public filter?: (event: LogEvent<LogEventContext>) => boolean

  public level: string

  public name: string

  public outputs: Array<(ev: LogEvent<LogEventContext>) => void>

  constructor (options?: LoggerOptions) {
    // Use default options.
    const {
      active,
      defaultContext,
      filter,
      level,
      name,
      outputs,
    }: LoggerOptions = {
      active: true,
      level: INFO,
      outputs: [consoleOutput()],
      ...options,
    }

    // Set logger status.
    this.active = active

    // Set default log context.
    this.defaultContext = defaultContext

    // Set logs filter.
    this.filter = filter

    // Set minimal log level.
    this.level = level

    // Set logger name.
    this.name = name == null ? `logger_${Date.now()}` : String(name)

    // Set log outputs.
    this.outputs = [...outputs]

    if (this.outputs.length === 0) {
      throw new Error('Logger outputs cannot be empty.')
    }
  }

  /**
   * Logs a debug message.
   * @param message
   * @param context
   */
  debug (message: string, context?: LogEventContext): void {
    this.log(DEBUG, message, context)
  }

  /**
   * Logs an error message.
   * @param messageOrError
   * @param context
   */
  error (messageOrError: string | Error, context?: LogEventContext): void {
    const ctx: LogEventContext = { ...context }
    let message: string

    if (messageOrError instanceof Error) {
      message = messageOrError.message
      ctx.error = getErrorDetails(messageOrError)
    } else {
      message = messageOrError
    }
    this.log(ERROR, message, ctx)
  }

  /**
   * Logs a fatal error message.
   * @param messageOrError
   * @param context
   */
  fatal (messageOrError: string | Error, context?: LogEventContext): void {
    const ctx: LogEventContext = { ...context }
    let message: string

    if (messageOrError instanceof Error) {
      message = messageOrError.message
      ctx.error = getErrorDetails(messageOrError)
    } else {
      message = messageOrError
    }
    this.log(FATAL, message, ctx)
  }

  /**
   * Returns the log level.
   */
  getLevel (): string {
    return this.level
  }

  /**
   * Returns the logger name.
   */
  getName (): string {
    return this.name
  }

  /**
   * Logs an informational message.
   * @param message
   * @param context
   */
  info (message: string, context ?: LogEventContext): void {
    this.log(INFO, message, context)
  }

  /**
   * Checks if the logging is active.
   */
  isActive (): boolean {
    return this.active
  }

  /**
   * Logs a message with a certain level.
   * @param level
   * @param message
   * @param context
   */
  log (level: string, message: string, context?: LogEventContext): void {
    // Ignore if logger is not active or if log level is higher.
    if (!this.isActive() || levels.indexOf(this.level) > levels.indexOf(level)) {
      return
    }

    // Prepare log event.
    const event: LogEvent<LogEventContext> = {
      context: { ...this.defaultContext, ...context },
      level,
      logger: this.name,
      message,
      timestamp: Date.now(),
    }

    // Filter log event.
    if (this.filter && !this.filter(event)) {
      return
    }

    // Pass log event to outputs.
    this.outputs.forEach((output) => {
      output(event)
    })
  }

  /**
   * Enables or disables logging.
   * @param active
   */
  setActive (active: boolean): void {
    this.active = active
  }

  /**
   * Changes the log level.
   * @param level
   */
  setLevel (level: string): void {
    this.level = level
  }

  /**
   * Logs a warning message.
   * @param message
   * @param context
   */
  warn (message: string, context?: LogEventContext): void {
    this.log(WARN, message, context)
  }
}

export default Logger
