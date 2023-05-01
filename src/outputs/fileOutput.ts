/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import * as fs from 'fs'
import { LogEvent, LogEventContext } from '../event'
import { defaultFormatter } from '../formatter'

interface FileOutputOptions {
  /**
   * The number of milliseconds between each flush to the file.
   */
  flushInterval?: number;
  /**
   * The function used to format message before saving to file.
   * @param event
   */
  formatter?: (event: LogEvent<LogEventContext>) => string;
  /**
   * Characters used to separate each log.
   */
  lineSeparator?: string;
  /**
   * The logs file path.
   */
  path: string;
}

/**
 * Log events to a file.
 * @param options
 */
function fileOutput (options: FileOutputOptions): (ev: LogEvent<LogEventContext>) => void {
  const {
    flushInterval,
    formatter,
    lineSeparator,
    path
  } = {
    formatter: defaultFormatter,
    lineSeparator: '\r\n',
    ...options
  }

  if (path == null || path === '') {
    throw new Error('path option must not be null or empty')
  }

  let buffer = ''

  if (flushInterval) {
    setInterval(() => {
      if (buffer.length > 0) {
        // Write pending logs.
        fs.appendFileSync(path, buffer, { encoding: 'utf-8' })
        buffer = ''
      }
    }, flushInterval)
  }

  return (event) => {
    const message = formatter(event)
    const line = `${message}${lineSeparator}`

    if (flushInterval) {
      // Put log in buffer.
      buffer += line
    } else {
      // Write log now.
      fs.appendFileSync(path, line, { encoding: 'utf-8' })
    }
  }
}

export default fileOutput
