/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import {
  DEBUG,
  ERROR,
  FATAL,
  INFO,
  WARN,
} from './levels';
import consoleOutput from './outputs/consoleOutput';

const defaultOptions = {
  active: true,
  name: undefined,
  outputs: [consoleOutput()],
};

/**
 * Returns details of an error.
 * @param {Error} error
 * @return {{message: string, name: string, reason: string, stack: string, type: string}}
 */
function getErrorDetails(error) {
  const attributes = ['message', 'name', 'reason', 'stack', 'type'];
  const details = {};

  for (let i = 0; i < attributes.length; i += 1) {
    if (attributes[i] in error) {
      details[attributes[i]] = error[attributes[i]];
    }
  }
  return details;
}

class Logger {
  constructor(options = {}) {
    // Use default options.
    const opts = { ...defaultOptions, ...options };

    // Set logger status.
    this.active = opts.active === true;

    // Set logger name.
    this.name = opts.name == null ? `logger_${Date.now()}` : String(opts.name);

    // Set outputs.
    this.outputs = [].concat(opts.outputs || []);

    if (typeof this.outputs !== 'object' || !(this.outputs instanceof Array) || this.outputs.length === 0) {
      throw new Error('Logger outputs cannot be empty.');
    }
  }

  /**
   * Logs a debug message.
   * @param {string} message
   * @param context
   */
  debug(message, context = undefined) {
    this.log(DEBUG, message, context);
  }

  /**
   * Logs an error message.
   * @param {string|Error} messageOrError
   * @param context
   */
  error(messageOrError, context = undefined) {
    const ctx = context || {};
    let message = messageOrError;

    if (messageOrError instanceof Error) {
      message = messageOrError.message;
      ctx.error = getErrorDetails(messageOrError);
    }
    this.log(ERROR, message, ctx);
  }

  /**
   * Logs a fatal error message.
   * @param {string|Error} messageOrError
   * @param context
   */
  fatal(messageOrError, context = undefined) {
    const ctx = context || {};
    let message = messageOrError;

    if (messageOrError instanceof Error) {
      message = messageOrError.message;
      ctx.error = getErrorDetails(messageOrError);
    }
    this.log(FATAL, message, ctx);
  }

  /**
   * Returns the logger name.
   * @return {string|null}
   */
  getName() {
    return this.name;
  }

  /**
   * Logs an informational message.
   * @param {string} message
   * @param context
   */
  info(message, context = undefined) {
    this.log(INFO, message, context);
  }

  /**
   * Checks if the logging is active.
   * @return {boolean}
   */
  isActive() {
    return this.active === true;
  }

  /**
   * Logs a message with a certain level.
   * @param {string} level
   * @param {string} message
   * @param context
   */
  log(level, message, context = undefined) {
    // Abort if logger is not active.
    if (!this.isActive()) {
      return;
    }

    // Prepare log event.
    const event = {
      context,
      level,
      logger: this.name,
      message,
      timestamp: Date.now(),
    };

    // Pass log event to outputs.
    this.outputs.forEach((output) => {
      output(event);
    });
  }

  /**
   * Enables or disables logging.
   * @param {boolean} active
   */
  setActive(active) {
    this.active = active === true;
  }

  /**
   * Logs a warning message.
   * @param {string} message
   * @param context
   */
  warn(message, context = undefined) {
    this.log(WARN, message, context);
  }
}

export default Logger;
