/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { defaultFormatter } from '../formatter';
import { DEBUG, ERROR, FATAL, INFO, WARN } from '../levels';
import { LogEvent, LogEventContext } from '../util';

export interface consoleOutputOptions {
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
function consoleOutput(options?: consoleOutputOptions): (ev: LogEvent<LogEventContext>) => void {
  const {
    formatter,
  } = {
    formatter: defaultFormatter,
    ...options,
  };

  if (!formatter) {
    throw new Error('consoleOutput\'s formatter option must be a function');
  }

  return (event: LogEvent<LogEventContext>): void => {
    const { level } = event;

    // Prepare output.
    const message = formatter(event);

    if (level === DEBUG) {
      console.debug(message);
    } else if (level === ERROR) {
      console.error(message);
    } else if (level === FATAL) {
      console.error(message);
    } else if (level === INFO) {
      console.info(message);
    } else if (level === WARN) {
      console.warn(message);
    } else {
      console.log(message);
    }
  };
}

export default consoleOutput;
