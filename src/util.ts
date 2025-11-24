/*
 * The MIT License (MIT)
 * Copyright (c) 2025 Karl STEIN
 */

/**
 * Returns details of an error.
 * @param error
 */
export function getErrorDetails (error: Error): Partial<Error> {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack
  }
}

/**
 * Replaces specific values during JSON stringification.
 * @param _key
 * @param value
 */
export function jsonReplacer (_key: string, value: unknown): unknown {
  if (value instanceof Error) {
    return getErrorDetails(value)
  }
  return value
}
