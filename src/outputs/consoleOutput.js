/*
 * The MIT License (MIT)
 * Copyright (c) 2022 Karl STEIN
 */

/* eslint-disable no-console */

import {
  DEBUG,
  ERROR,
  FATAL,
  INFO,
  WARN,
} from '../levels';

function defaultFormatter(event) {
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

/**
 * Logs events to console.
 * @param options
 * @returns {(function(*): void)|*}
 */
function consoleOutput(options = undefined) {
  const opts = { formatter: defaultFormatter, ...options };
  const { entries, formatter } = opts;

  const harvest = (message) => {
    entries.push(message);
  };

  const debug = entries ? harvest : console.debug || console.log;
  const error = entries ? harvest : console.error || console.log;
  const fatal = entries ? harvest : console.fatal || console.log;
  const info = entries ? harvest : console.info || console.log;
  const warn = entries ? harvest : console.warn || console.log;

  return (event) => {
    const { level } = event;

    // Prepare output.
    let output = formatter(event);

    if (!(output instanceof Array)) {
      output = [output];
    }

    if (level === DEBUG) {
      debug(...output);
    } else if (level === INFO) {
      info(...output);
    } else if (level === WARN) {
      warn(...output);
    } else if (level === ERROR) {
      error(...output);
    } else if (level === FATAL) {
      fatal(...output);
    }
  };
}

export default consoleOutput;
