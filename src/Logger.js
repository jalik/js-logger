/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

import deepExtend from '@jalik/deep-extend';
import Observer from '@jalik/observer';
import Types from './types';

class Logger {
  constructor(options) {
    // Set default options
    this.options = deepExtend({
      active: true,
      console: {
        debug: true,
        error: true,
        info: true,
        other: true,
        warning: true,
      },
      displayContext: false,
      displayName: false,
      name: null,
    }, options);

    // Create observer
    this.observer = new Observer(this);

    // Check console availability
    if (typeof console !== 'object' || console === null) {
      throw new Error('The console object is not available in this environment.');
    }

    // Add polyfill methods to the console object
    // eslint-disable-next-line no-console
    if (typeof console.log === 'function') {
      // eslint-disable-next-line no-console
      if (typeof console.debug !== 'function') {
        // eslint-disable-next-line no-console
        console.debug = console.log.bind(console);
      }
      // eslint-disable-next-line no-console
      if (typeof console.error !== 'function') {
        // eslint-disable-next-line no-console
        console.error = console.log.bind(console);
      }
      // eslint-disable-next-line no-console
      if (typeof console.info !== 'function') {
        // eslint-disable-next-line no-console
        console.info = console.log.bind(console);
      }
      // eslint-disable-next-line no-console
      if (typeof console.warn !== 'function') {
        // eslint-disable-next-line no-console
        console.warn = console.log.bind(console);
      }
    }

    // Check logger name
    if (typeof this.options.name === 'undefined' || this.options.name === null) {
      // Generate a name
      this.name = `logger-${Date.now()}`;
    } else {
      this.name = this.options.name;
    }
  }

  /**
   * Returns a clone of the current logger with a different name.
   * @param name
   * @return {Logger}
   */
  clone(name) {
    return new Logger(deepExtend({}, this.options, { name }));
  }

  /**
   * Logs a debug message
   * @param message
   * @param context
   */
  debug(message, context) {
    this.log(message, Types.debug, context);
  }

  /**
   * Logs an error message
   * @param messageOrError
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
    this.log(msg, Types.error, ctx);
  }

  /**
   * Returns the logger name
   * @return {string|null}
   */
  getName() {
    return this.name;
  }

  /**
   * Logs an information message
   * @param message
   * @param context
   */
  info(message, context) {
    this.log(message, Types.info, context);
  }

  /**
   * Checks if the logger is active
   * @return {boolean}
   */
  isActive() {
    return this.options.active === true;
  }

  /**
   * Logs a message
   * @param message
   * @param type
   * @param context
   */
  log(message, type, context) {
    if (this.isActive()) {
      const args = [];

      // Display logger name in console
      if (this.options.displayName === true) {
        args.push(`${this.name}:`);
      }

      // Display message in console
      args.push(message);

      // Display context in console
      if (typeof context !== 'undefined' && this.options.displayContext === true) {
        args.push(context);
      }

      // Displays the message in the console
      switch (type) {
        case Types.debug:
          if (this.options.console.debug === true) {
            // eslint-disable-next-line no-console
            console.log(...args);
          }
          break;

        case Types.error:
          if (this.options.console.error === true) {
            // eslint-disable-next-line no-console
            console.error(...args);
          }
          break;

        case Types.info:
          if (this.options.console.info === true) {
            // eslint-disable-next-line no-console
            console.info(...args);
          }
          break;

        case Types.warning:
          if (this.options.console.warning === true) {
            // eslint-disable-next-line no-console
            console.warn(...args);
          }
          break;

        default:
          if ((typeof this.options.console[type] === 'boolean'
            && this.options.console[type] === true)
            || (typeof this.options.console[type] !== 'boolean'
              && this.options.console.other === true)) {
            // eslint-disable-next-line no-console
            console.log(...args);
          }
      }
    }

    // Notify all listeners
    this.observer.notify('log', ...[message, type, context]);
  }

  /**
   * Removes an event listener
   * @param event
   * @param listener
   */
  off(event, listener) {
    this.observer.detach(event, listener);
  }

  /**
   * Adds an event listener
   * @param event
   * @param listener
   */
  on(event, listener) {
    this.observer.attach(event, listener);
  }

  /**
   * Activates or deactivates the logger
   * @param active
   */
  setActive(active) {
    this.options.active = (active === true);
  }

  /**
   * Logs a warning message
   * @param message
   * @param context
   */
  warn(message, context) {
    this.log(message, Types.warning, context);
  }
}

export default Logger;
