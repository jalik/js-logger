/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

export interface LogEventContext {
  error?: Partial<Error>;
  [key: string]: unknown;
}

export interface LogEvent<C extends LogEventContext> {
  /**
   * The log event context (can be anything serializable).
   */
  context?: C,
  /**
   * The log level (INFO, ERROR...).
   */
  level: string,
  /**
   * The logger name.
   */
  logger?: string,
  /**
   * The log message.
   */
  message: string,
  /**
   * The log timestamp in milliseconds.
   */
  timestamp: number,
}
