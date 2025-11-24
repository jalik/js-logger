/*
 * The MIT License (MIT)
 * Copyright (c) 2025 Karl STEIN
 */

import { describe, expect, it } from 'vitest'
import { defaultFormatter, INFO } from '../src'
import { LogEvent, LogEventContext } from '../src/event'
import { jsonReplacer } from '../src/util'

describe('defaultFormatter(event)', () => {
  const event: LogEvent<LogEventContext> = {
    level: INFO,
    timestamp: Date.now(),
    logger: 'test',
    message: 'ok',
    context: { pass: true }
  }
  const { level, message, logger, timestamp, context } = event

  describe('with context', () => {
    it('should return formatted event with context', () => {
      expect(defaultFormatter(event))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${message}\n${JSON.stringify(context, jsonReplacer, 2)}`)
    })
  })

  describe('without context', () => {
    it('should return formatted event without context', () => {
      const copyWithoutContext = { ...event }
      delete copyWithoutContext.context
      expect(defaultFormatter(copyWithoutContext))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${message}`)
    })
  })

  describe('with empty context', () => {
    it('should return formatted event without context', () => {
      const copyEmptyContext = { ...event, context: {} }
      expect(defaultFormatter(copyEmptyContext))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${message}`)
    })
  })
})
