/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { DEBUG, ERROR, FATAL, INFO, WARN } from '../levels';
import { LogEvent, LogEventContext } from '../util';

export function defaultFormatter(event: LogEvent<LogEventContext>): string {
  const {
    context,
    level,
    logger,
    message,
    timestamp,
  } = event;

  let out = `${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}] : ${message}`;

  if (context) {
    out += ` ; ${JSON.stringify(context)}`;
  }
  return out;
}

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
    entries,
    formatter,
  } = {
    entries: [],
    formatter: defaultFormatter,
    ...options,
  };

  const harvest = (message: string) => {
    entries.push(message);
  };

  const debug = entries ? harvest : console.debug || console.log;
  const error = entries ? harvest : console.error || console.log;
  const fatal = entries ? harvest : console.error || console.log;
  const info = entries ? harvest : console.info || console.log;
  const warn = entries ? harvest : console.warn || console.log;

  return (event: LogEvent<LogEventContext>): void => {
    const { level } = event;

    // Prepare output.
    const output = formatter(event);

    if (level === DEBUG) {
      debug(output);
    } else if (level === INFO) {
      info(output);
    } else if (level === WARN) {
      warn(output);
    } else if (level === ERROR) {
      error(output);
    } else if (level === FATAL) {
      fatal(output);
    }
  };
}

export default consoleOutput;
