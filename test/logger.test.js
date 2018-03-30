/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import Logger from '../src/logger';
import Types from '../src/types';

describe('Logger', () => {
  it('should be importable from package', () => {
    expect(typeof Logger).toEqual('function');
  });
});

describe('new Logger({active: true})', () => {
  it('should create an active logger', () => {
    const logger = new Logger({ active: true });
    expect(logger.isActive()).toEqual(true);
  });
});

describe('new Logger({active: false})', () => {
  it('should create an inactive logger', () => {
    const logger = new Logger({ active: false });
    expect(logger.isActive()).toEqual(false);
  });
});

describe('Logger.debug(String, Object)', () => {
  it('should log a debug message', () => {
    let text = null;
    const msg = 'Hello World';
    const logMessage = `msg = ${msg}`;
    const logger = new Logger({ active: true });
    logger.on(Types.debug, (message) => {
      text = message;
    });
    logger.debug(logMessage, { msg });
    expect(text).toEqual(logMessage);
  });
});

describe('Logger.error(String, Object)', () => {
  it('should log an error message', () => {
    let text = null;
    const error = new Error('forbidden');
    const logger = new Logger({ active: true });
    logger.on(Types.error, (message) => {
      text = message;
    });
    logger.error(error.message, { error });
    expect(text).toEqual(error.message);
  });
});

describe('Logger.error(Error, Object)', () => {
  it('should log an error message', () => {
    let text = null;
    const error = new Error('forbidden');
    const logger = new Logger({ active: true });
    logger.on(Types.error, (message) => {
      text = message;
    });
    logger.error(error, { error });
    expect(text).toEqual(error.message);
  });
});

describe('Logger.info(String, Object)', () => {
  it('should log an info message', () => {
    let text = null;
    const logMessage = 'hello';
    const logger = new Logger({ active: true });
    logger.on(Types.info, (message) => {
      text = message;
    });
    logger.info(logMessage);
    expect(text).toEqual(logMessage);
  });
});

describe('Logger.info(String, Object)', () => {
  it('should log a warning message', () => {
    let text = null;
    const logMessage = 'warning';
    const logger = new Logger({ active: true });
    logger.on(Types.warning, (message) => {
      text = message;
    });
    logger.warn(logMessage);
    expect(text).toEqual(logMessage);
  });
});

describe('Logger.isActive()', () => {
  it('should return true if the logger is active', () => {
    const logger = new Logger({ active: true });
    expect(logger.isActive()).toEqual(true);
  });

  it('should return true if the logger is not active', () => {
    const logger = new Logger({ active: false });
    expect(logger.isActive()).toEqual(false);
  });
});

describe('Logger.log(String, String, Object)', () => {
  it('should log a message', () => {
    let text = null;
    const msg = 'message';
    const logger = new Logger({ active: true });
    logger.on(Types.info, (message) => {
      text = message;
    });
    logger.log(msg, Types.info, { msg });
    expect(text).toEqual(msg);
  });

  it('should log a message with context', () => {
    let context = null;
    const logger = new Logger({ active: true });
    logger.on(Types.info, (message, ctx) => {
      context = ctx;
    });
    logger.log('message', Types.info, { a: 1 });
    expect(context).toEqual({ a: 1 });
  });
});

describe('Logger.on(String, Function)', () => {
  describe(`Logger.on("${Types.debug}", Function)`, () => {
    it(`should execute a callback for ${Types.debug} messages`, () => {
      let changed = false;
      const logger = new Logger();

      logger.on(Types.debug, () => {
        changed = true;
      });
      logger.debug('this is a debug message');
      expect(changed).toEqual(true);
    });
  });

  describe(`Logger.on("${Types.error}", Function)`, () => {
    it(`should execute a callback for ${Types.error} messages`, () => {
      let changed = false;
      const logger = new Logger();

      logger.on(Types.error, () => {
        changed = true;
      });
      logger.error('this is an error message');
      expect(changed).toEqual(true);
    });
  });

  describe(`Logger.on("${Types.info}", Function)`, () => {
    it(`should execute a callback for ${Types.info} messages`, () => {
      let changed = false;
      const logger = new Logger();

      logger.on(Types.info, () => {
        changed = true;
      });
      logger.info('this is an information message');
      expect(changed).toEqual(true);
    });
  });

  describe(`Logger.on("${Types.warning}", Function)`, () => {
    it(`should execute a callback for ${Types.warning} messages`, () => {
      let changed = false;
      const logger = new Logger();

      logger.on(Types.warning, () => {
        changed = true;
      });
      logger.warn('this is a warning message');
      expect(changed).toEqual(true);
    });
  });
});

describe('Logger.setActive(Boolean)', () => {
  describe('Logger.setActive(true)', () => {
    it('should activate a logger', () => {
      const logger = new Logger({ active: false });
      logger.setActive(true);
      expect(logger.isActive()).toEqual(true);
    });
  });

  describe('Logger.setActive(false)', () => {
    it('should deactivate a logger', () => {
      const logger = new Logger({ active: true });
      logger.setActive(false);
      expect(logger.isActive()).toEqual(false);
    });
  });
});
