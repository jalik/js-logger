/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { LogEvent, LogEventContext } from '../event'
import { defaultFormatter } from '../formatter'
import { DEBUG, ERROR, FATAL, INFO, WARN } from '../levels'

interface ConsoleOutputOptions {
  /**
   * The function used to format message.
   * @param event
   */
  formatter?: (event: LogEvent<LogEventContext>) => string;
}

/**
 * Log events to the console.
 * @param options
 */
function consoleOutput (options?: ConsoleOutputOptions): (ev: LogEvent<LogEventContext>) => void {
  const {
    formatter
  } = {
    formatter: defaultFormatter,
    ...options
  }

  if (!formatter) {
    throw new Error('consoleOutput\'s formatter option must be a function')
  }

  return (event: LogEvent<LogEventContext>): void => {
    const { level } = event

    // Prepare output.
    const message = formatter(event)

    if (level === DEBUG) {
      // eslint-disable-next-line no-console
      console.debug(message)
    } else if (level === ERROR) {
      // eslint-disable-next-line no-console
      console.error(message)
    } else if (level === FATAL) {
      // eslint-disable-next-line no-console
      console.error(message)
    } else if (level === INFO) {
      // eslint-disable-next-line no-console
      console.info(message)
    } else if (level === WARN) {
      // eslint-disable-next-line no-console
      console.warn(message)
    } else {
      // eslint-disable-next-line no-console
      console.log(message)
    }
  }
}

export default consoleOutput
