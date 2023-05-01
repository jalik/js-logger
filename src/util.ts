/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
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
