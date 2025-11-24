/*
 * The MIT License (MIT)
 * Copyright (c) 2025 Karl STEIN
 */

import { describe, expect, it } from 'vitest'
import { getErrorDetails, jsonReplacer } from '../src/util'

describe('getErrorDetails()', () => {
  it('should return the error details', () => {
    const error = new Error('error message')
    const details = getErrorDetails(error)
    expect(details.message).toBe(error.message)
    expect(details.name).toBe(error.name)
    expect(details.stack).toBe(error.stack)
  })

  it('should return the error details if defined', () => {
    const error = new Error()
    const details = getErrorDetails(error)
    expect(details.message).toBe('')
  })
})

describe('jsonReplacer()', () => {
  it('should replace Error instance with JSON object', () => {
    const error = new Error('ERR')
    const details = getErrorDetails(error)
    expect(jsonReplacer('error', error)).toStrictEqual(details)
  })
})
