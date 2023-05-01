/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { describe, expect, it } from '@jest/globals';
import { defaultFormatter, INFO } from '../src';

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
