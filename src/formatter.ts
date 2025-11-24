/*
 * The MIT License (MIT)
 * Copyright (c) 2025 Karl STEIN
 */

import { LogEvent, LogEventContext } from './event'
import { jsonReplacer } from './util'

/**
 * Formats an event to a human-readable message.
 * @example "2023-05-01T16:48:04.804Z INFO [main] : This is a log message ; {test: true}"
 * @param event
 */
export function defaultFormatter (event: LogEvent<LogEventContext>): string {
  const {
    context,
    level,
    logger,
    message,
    timestamp
  } = event

  let out = `${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}] : ${message}`

  if (context != null && Object.keys(context).length > 0) {
    out += ` ; ${JSON.stringify(context, jsonReplacer)}`
  }
  return out
}
