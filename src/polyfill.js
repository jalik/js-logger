/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

// Add polyfill methods to the console object
// eslint-disable-next-line no-console
if (typeof console.log === 'function') {
  // eslint-disable-next-line no-console
  if (typeof console.debug !== 'function') {
    // eslint-disable-next-line no-console
    console.debug = console.log.bind(console);
  }
  // eslint-disable-next-line no-console
  if (typeof console.error !== 'function') {
    // eslint-disable-next-line no-console
    console.error = console.log.bind(console);
  }
  // eslint-disable-next-line no-console
  if (typeof console.info !== 'function') {
    // eslint-disable-next-line no-console
    console.info = console.log.bind(console);
  }
  // eslint-disable-next-line no-console
  if (typeof console.warn !== 'function') {
    // eslint-disable-next-line no-console
    console.warn = console.log.bind(console);
  }
}
