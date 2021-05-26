/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

import {
  DEBUG,
  ERROR,
  INFO,
  WARN,
} from './levels';

const defaultOptions = {
  active: true,
  console: {
    DEBUG: true,
    ERROR: true,
    INFO: true,
    WARN: true,
  },
  name: null,
  displayContext: false,
  displayName: false,
};

class Logger {
  constructor(options = {}) {
    // Set default options
    const opts = { ...defaultOptions, ...options };

    // Set logger status.
    this.active = opts.active === true;

    // Set details to show.
    this.console = opts.console;
    this.displayContext = opts.displayContext;
    this.displayName = opts.displayName;

    // Set logger name.
    this.name = opts.name == null ? `logger_${Date.now()}` : String(opts.name);

    // Create observer.
    this.observer = new Observer(this);
  }

  /**
   * Logs a debug message.
   * @param {string} message
   * @param context
   */
  debug(message, context) {
    this.log(DEBUG, message, context);
  }

  /**
   * Logs an error message.
   * @param {string|Error} messageOrError
   * @param context
   */
  error(messageOrError, context) {
    const ctx = context || {};
    let msg = messageOrError;

    if (messageOrError instanceof Error) {
      ctx.error = {};

      const attributes = ['name', 'message', 'reason', 'stack', 'type'];

      for (let i = 0; i < attributes.length; i += 1) {
        if (attributes[i] in messageOrError) {
          ctx.error[attributes[i]] = messageOrError[attributes[i]];
        }
      }
      const { message } = messageOrError;
      msg = message;
    }
    this.log(ERROR, msg, ctx);
  }

  /**
   * Returns the logger name.
   * @return {string|null}
   */
  getName() {
    return this.name;
  }

  /**
   * Logs an information message.
   * @param {string} message
   * @param context
   */
  info(message, context) {
    this.log(INFO, message, context);
  }

  /**
   * Checks if the logger is active.
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
  log(level, message, context) {
    // Abort if logger is not active.
    if (!this.isActive()) {
      return;
    }
    const args = [];

    // Display logger name in console
    if (this.displayName === true) {
      args.push(`${this.name}:`);
    }

    // Display message in console
    args.push(message);

    // Display context in console
    if (typeof context !== 'undefined' && this.displayContext === true) {
      args.push(context);
    }

    // Displays the message in the console
    switch (level) {
      case DEBUG:
        if (this.console.DEBUG === true) {
          console.log(...args);
        }
        break;
      case ERROR:
        if (this.console.ERROR === true) {
          console.error(...args);
        }
        break;
      case INFO:
        if (this.console.INFO === true) {
          console.info(...args);
        }
        break;
      case WARN:
        if (this.console.WARN === true) {
          console.warn(...args);
        }
        break;
      default:
        if (typeof this.console[level] === 'boolean' && this.console[level] === true) {
          console.log(...args);
        }
    }

    // Notify all listeners
    this.observer.notify('log', ...[message, level, context]);
  }

  /**
   * Removes an event listener.
   * @param {string} event
   * @param listener
   */
  off(event, listener) {
    this.observer.detach(event, listener);
  }

  /**
   * Adds an event listener.
   * @param {string} event
   * @param listener
   */
  on(event, listener) {
    this.observer.attach(event, listener);
  }

  /**
   * Enables or disables the logger.
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
  warn(message, context) {
    this.log(WARN, message, context);
  }
}

export default Logger;
