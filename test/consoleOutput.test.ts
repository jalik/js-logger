/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { describe, expect, it, jest } from '@jest/globals';
import { DEBUG, ERROR, INFO, Logger, WARN } from '../src';
import levels from '../src/levels';
import consoleOutput, { defaultFormatter } from '../src/outputs/consoleOutput';
import { LogEventContext } from '../src/util';

const logs = [];

function saveLog(level: string) {
  return (message: string) => {
    logs.push({ level, message });
  };
}

// Disable console logs output
console.debug = jest.fn(saveLog(DEBUG));
console.error = jest.fn(saveLog(ERROR));
console.info = jest.fn(saveLog(INFO));
console.log = jest.fn(saveLog(DEBUG));
console.warn = jest.fn(saveLog(WARN));

function createPayload() {
  return {
    message: 'This is a message',
    context: { number: Math.random() },
  };
}

describe('new Logger({ outputs: [ consoleOutput() ] })', () => {
  const formatter = ({ message, context }: { message: string, context?: LogEventContext }) => JSON.stringify({
    message,
    context,
  });

  const output = consoleOutput({
    formatter,
  });

  const logger = new Logger({
    active: true,
    level: DEBUG,
    name: 'main',
    outputs: [output],
  });

  describe('logger.debug(string, string)', () => {
    it('should senda DEBUG event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.debug(message, context);
      const log = logs.pop();
      expect(log).toBeDefined();
      expect(log.level).toBe(DEBUG);
      expect(log.message).toBe(formatter(payload));
    });
  });

  describe('logger.error(string, string)', () => {
    it('should send an ERROR event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.error(message, context);
      const log = logs.pop();
      expect(log).toBeDefined();
      expect(log.level).toBe(ERROR);
      expect(log.message).toBe(formatter(payload));
    });
  });

  describe('logger.fatal(string, string)', () => {
    it('should send a FATAL event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.fatal(message, context);
      const log = logs.pop();
      expect(log).toBeDefined();
      expect(log.level).toBe(ERROR);
      expect(log.message).toBe(formatter(payload));
    });
  });

  describe('logger.info(string, string)', () => {
    it('should send an INFO event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.info(message, context);
      const log = logs.pop();
      expect(log).toBeDefined();
      expect(log.level).toBe(INFO);
      expect(log.message).toBe(formatter(payload));
    });
  });

  describe('logger.warn(string, string)', () => {
    it('should send a WARN event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.warn(message, context);
      const log = logs.pop();
      expect(log).toBeDefined();
      expect(log.level).toBe(WARN);
      expect(log.message).toBe(formatter(payload));
    });
  });

  describe('logger.log(DEBUG, string, string)', () => {
    it('should send a DEBUG event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.log(DEBUG, message, context);
      const log = logs.pop();
      expect(log).toBeDefined();
      expect(log.level).toBe(DEBUG);
      expect(log.message).toBe(formatter(payload));
    });
  });

  describe('logger.log("other", string, string)', () => {
    // Add custom log level
    levels.push('other');
    it('should send event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.log('other', message, context);
      const log = logs.pop();
      expect(log).toBeDefined();
      expect(log.level).toBe(DEBUG);
      expect(log.message).toBe(formatter(payload));
    });
  });
});

describe('consoleOutput({ formatter: null | undefined })', () => {
  it('should throw an error', () => {
    expect(() => {
      consoleOutput({ formatter: null });
    }).toThrow();
    expect(() => {
      consoleOutput({ formatter: undefined });
    }).toThrow();
  });
});

describe('defaultFormatter(event)', () => {
  const event = {
    level: INFO,
    timestamp: Date.now(),
    logger: 'test',
    message: 'ok',
    context: { pass: true },
  };
  const { level, message, logger, timestamp, context } = event;

  describe('with context', () => {
    it('should return formatted event with context', () => {
      expect(defaultFormatter(event))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}] : ${message} ; ${JSON.stringify(context)}`);
    });
  });

  describe('without context', () => {
    it('should return formatted event without context', () => {
      const copyWithoutContext = { ...event };
      delete copyWithoutContext.context;
      expect(defaultFormatter(copyWithoutContext))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}] : ${message}`);
    });
  });

  describe('with empty context', () => {
    it('should return formatted event without context', () => {
      const copyEmptyContext = { ...event, context: {} };
      expect(defaultFormatter(copyEmptyContext))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}] : ${message}`);
    });
  });
});
