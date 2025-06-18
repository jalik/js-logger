/*
 * The MIT License (MIT)
 * Copyright (c) 2025 Karl STEIN
 */

import { defaultFormatter } from './formatter'
import levels, { DEBUG, ERROR, FATAL, INFO, WARN } from './levels'
import Logger, { LoggerOptions } from './Logger'
import consoleOutput from './outputs/consoleOutput'

export {
  DEBUG,
  ERROR,
  FATAL,
  INFO,
  WARN,
  consoleOutput,
  defaultFormatter,
  levels,
  Logger,
  LoggerOptions
}
