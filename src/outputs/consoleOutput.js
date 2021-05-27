/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

/* eslint-disable no-console */

import {
  DEBUG,
  ERROR,
  FATAL,
  INFO,
  WARN,
} from '../levels';

const debug = typeof console.debug === 'function' ? console.debug : console.log;
const error = typeof console.error === 'function' ? console.error : console.log;
const fatal = typeof console.fatal === 'function' ? console.fatal : error;
const info = typeof console.info === 'function' ? console.info : console.log;
const warn = typeof console.warn === 'function' ? console.info : console.log;

const defaultOptions = {
  formatter: (event) => {
    const {
      // context,
      level,
      logger,
      message,
      timestamp,
    } = event;
    return `${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}] : ${message}`;
  },
};

function consoleOutput(options = defaultOptions) {
  const opts = { ...defaultOptions, ...options };
  const { formatter } = opts;

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
