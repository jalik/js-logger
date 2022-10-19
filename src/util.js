/*
 * The MIT License (MIT)
 * Copyright (c) 2022 Karl STEIN
 */

/**
 * Returns details of an error.
 * @param {Error} error
 * @return {{message: string, name: string, reason: string, stack: string, type: string}}
 */
// eslint-disable-next-line import/prefer-default-export
export function getErrorDetails(error) {
  const attributes = ['message', 'name', 'reason', 'stack', 'type'];
  const details = {};

  for (let i = 0; i < attributes.length; i += 1) {
    if (attributes[i] in error) {
      details[attributes[i]] = error[attributes[i]];
    }
  }
  return details;
}
