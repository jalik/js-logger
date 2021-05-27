/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import {
  consoleOutput,
  DEBUG,
  Logger,
} from '../src';

describe('new Logger({ outputs: [ consoleOutput() ] })', () => {
  const logger = new Logger({
    active: true,
    level: DEBUG,
    name: 'main',
    outputs: [consoleOutput()],
  });

  describe('logger.debug(string, string)', () => {
    it('should send event to console', () => {
      logger.debug('Hello World', { number: 42 });
    });
  });

  describe('logger.info(string, string)', () => {
    it('should send event to console', () => {
      logger.info('Sky is blue');
    });
  });

  describe('logger.warn(string, string)', () => {
    it('should send event to console', () => {
      logger.warn('Old is deprecated');
    });
  });

  describe('logger.error(string, string)', () => {
    it('should send event to console', () => {
      logger.error('Something failed');
    });
  });

  describe('logger.fatal(string, string)', () => {
    it('should send event to console', () => {
      logger.fatal('Code is broken');
    });
  });
});
