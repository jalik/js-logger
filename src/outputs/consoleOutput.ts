/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { defaultFormatter } from '../formatter';
import { DEBUG, ERROR, FATAL, INFO, WARN } from '../levels';
import { LogEvent, LogEventContext } from '../util';

export interface consoleOutputOptions {
  entries?: string[],
  formatter?: (event: LogEvent<LogEventContext>) => string;
}

/**
 * Console logger.
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
    const output = formatter(event);

    if (level === DEBUG) {
      console.debug(output);
    } else if (level === ERROR) {
      console.error(output);
    } else if (level === FATAL) {
      console.error(output);
    } else if (level === INFO) {
      console.info(output);
    } else if (level === WARN) {
      console.warn(output);
    } else {
      console.log(output);
    }
  };
}

export default consoleOutput;
