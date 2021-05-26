/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import Logger from '../src/Logger';
import consoleOutput from '../src/outputs/consoleOutput';

describe('new Logger({ outputs: [ consoleOutput() ] })', () => {
  const logger = new Logger({
    active: true,
    name: 'main',
    outputs: [consoleOutput()],
  });

  describe('logger.info(string, string)', () => {
    it('should send event to console', () => {
      logger.info('Hello World');
    });
  });
});
