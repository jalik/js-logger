/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

export interface LogEventContext {
  error?: Partial<Error>;
  [key: string]: any;
}

export interface LogEvent<C extends LogEventContext> {
  context?: C,
  level: string,
  logger?: string,
  message: string,
  timestamp: number,
}

/**
 * Returns details of an error.
 * @param error
 */
export function getErrorDetails(error: Error): Partial<Error> {
  const details: Partial<Error> = {};

  if (error.message) {
    details.message = error.message;
  }
  if (error.name) {
    details.name = error.name;
  }
  if (error.stack) {
    details.stack = error.stack;
  }
  return details;
}
