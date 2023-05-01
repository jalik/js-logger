/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { defaultFormatter } from './formatter'
import levels, { DEBUG, ERROR, FATAL, INFO, WARN } from './levels'
import Logger from './Logger'
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
  Logger
}
