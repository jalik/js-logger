/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

export const DEBUG = 'debug'
export const ERROR = 'error'
export const FATAL = 'fatal'
export const INFO = 'info'
export const WARN = 'warn'

/**
 * Log levels ordered by severity (less to more).
 */
const levels: string[] = [
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL
]

export default levels
