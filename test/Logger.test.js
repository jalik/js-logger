/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

import Logger from '../src/Logger';
import Types from '../src/types';

describe('Logger', () => {
  it('should be importable from package', () => {
    expect(typeof Logger).toEqual('function');
  });
});

describe('new Logger({name: "main"})', () => {
  it('should create a logger with the name "main"', () => {
    const logger = new Logger({ name: 'main' });
    expect(logger.getName()).toEqual('main');
  });
});

describe('new Logger({name: null})', () => {
  it('should create a logger with a generated name', () => {
    const logger = new Logger({ name: null });
    expect(typeof logger.getName()).toEqual('string');
    expect(logger.getName().length > 0).toEqual(true);
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
    logger.on('log', (message) => {
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
    logger.on('log', (message) => {
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
    logger.on('log', (message) => {
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
    logger.on('log', (message) => {
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
    logger.on('log', (message) => {
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
    logger.on('log', (message) => {
      text = message;
    });
    logger.log(msg, Types.info, { msg });
    expect(text).toEqual(msg);
  });

  it('should log a message with a type', () => {
    let context = null;
    let type = null;
    const logger = new Logger({ active: true });
    logger.on('log', (message, logType, ctx) => {
      context = ctx;
      type = logType;
    });
    logger.log('message', Types.info, { a: 1 });
    expect(context).toEqual({ a: 1 });
    expect(type).toEqual(Types.info);
  });

  it('should log a message with a context', () => {
    let context = null;
    const logger = new Logger({ active: true });
    logger.on('log', (message, type, ctx) => {
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

      logger.on('log', () => {
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

      logger.on('log', () => {
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

      logger.on('log', () => {
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

      logger.on('log', () => {
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

describe('new Logger(options)', () => {
  it('should merge options recursively', () => {
    const logger = new Logger({ active: true, console: { debug: false } });
    expect(logger.options.console.debug).toEqual(false);
    expect(logger.options.console.error).toEqual(true);
    expect(logger.options.console.info).toEqual(true);
    expect(logger.options.console.warning).toEqual(true);
  });
});
