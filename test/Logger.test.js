/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

import {
  DEBUG,
  ERROR,
  INFO,
  WARN,
} from '../src/levels';
import Logger from '../src/Logger';

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
    const logger = new Logger({ active: true });
    logger.on('log', (message) => { text = message; });
    logger.debug(msg);
    expect(text).toEqual(msg);
  });
});

describe('Logger.error(String, Object)', () => {
  it('should log an error message', () => {
    let text = null;
    const error = new Error('Something failed');
    const logger = new Logger({ active: true });
    logger.on('log', (message) => { text = message; });
    logger.error(error.message);
    expect(text).toEqual(error.message);
  });
});

describe('Logger.error(Error, Object)', () => {
  it('should log an error message', () => {
    let text = null;
    const error = new Error('Something failed');
    const logger = new Logger({ active: true });
    logger.on('log', (message) => { text = message; });
    logger.error(error);
    expect(text).toEqual(error.message);
  });
});

describe('Logger.info(String, Object)', () => {
  it('should log an info message', () => {
    let text = null;
    const msg = 'Hello World';
    const logger = new Logger({ active: true });
    logger.on('log', (message) => { text = message; });
    logger.info(msg);
    expect(text).toEqual(msg);
  });
});

describe('Logger.info(String, Object)', () => {
  it('should log a warning message', () => {
    let text = null;
    const msg = 'Hello World';
    const logger = new Logger({ active: true });
    logger.on('log', (message) => { text = message; });
    logger.warn(msg);
    expect(text).toEqual(msg);
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
    const msg = 'Hello World';
    const logger = new Logger({ active: true });
    logger.on('log', (message) => { text = message; });
    logger.log(INFO, msg);
    expect(text).toEqual(msg);
  });

  it('should log a message with a type', () => {
    let context = null;
    let type = null;
    const msg = 'Hello World';
    const logger = new Logger({ active: true });
    logger.on('log', (message, logType, ctx) => {
      context = ctx;
      type = logType;
    });
    logger.log(INFO, msg, { a: 1 });
    expect(context).toEqual({ a: 1 });
    expect(type).toEqual(INFO);
  });

  it('should log a message with a context', () => {
    let context = null;
    const msg = 'Hello World';
    const logger = new Logger({ active: true });
    logger.on('log', (message, type, ctx) => { context = ctx; });
    logger.log(INFO, msg, { a: 1 });
    expect(context).toEqual({ a: 1 });
  });
});

describe('Logger.on(String, Function)', () => {
  describe(`Logger.on("${DEBUG}", Function)`, () => {
    it(`should execute a callback for ${DEBUG} messages`, () => {
      let changed = false;
      const logger = new Logger();
      logger.on('log', () => { changed = true; });
      logger.debug('this is a debug message');
      expect(changed).toEqual(true);
    });
  });

  describe(`Logger.on("${ERROR}", Function)`, () => {
    it(`should execute a callback for ${ERROR} messages`, () => {
      let changed = false;
      const logger = new Logger();
      logger.on('log', () => { changed = true; });
      logger.error('this is an error message');
      expect(changed).toEqual(true);
    });
  });

  describe(`Logger.on("${INFO}", Function)`, () => {
    it(`should execute a callback for ${INFO} messages`, () => {
      let changed = false;
      const logger = new Logger();
      logger.on('log', () => { changed = true; });
      logger.info('this is an information message');
      expect(changed).toEqual(true);
    });
  });

  describe(`Logger.on("${WARN}", Function)`, () => {
    it(`should execute a callback for ${WARN} messages`, () => {
      let changed = false;
      const logger = new Logger();
      logger.on('log', () => { changed = true; });
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
