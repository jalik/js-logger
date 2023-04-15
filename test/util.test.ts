/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { describe, expect, it } from '@jest/globals';
import { getErrorDetails } from '../src/util';

describe('getErrorDetails()', () => {
  it('should return an object with error details', () => {
    const error = new Error('error message');
    const details = getErrorDetails(error);
    expect(details.message).toBe(error.message);
    expect(details.name).toBe(error.name);
    expect(details.stack).toBe(error.stack);
  });
});
