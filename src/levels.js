/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

export const DEBUG = 'debug';
export const ERROR = 'error';
export const FATAL = 'fatal';
export const INFO = 'info';
export const WARN = 'warn';

/**
 * Log levels ordered by importance and granularity (less to most).
 * @type {(string)[]}
 */
const levels = [
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
];

export default levels;
