/*
 * The MIT License (MIT)
 * Copyright (c) 2025 Karl STEIN
 */

import { describe, expect, it } from 'vitest'
import { defaultFormatter, ERROR, INFO, jsonFormatter } from '../src'
import { LogEvent, LogEventContext } from '../src/event'
import { jsonReplacer } from '../src/util'

const event: LogEvent<LogEventContext> = {
  level: INFO,
  timestamp: Date.now(),
  logger: 'test',
  message: 'ok'
}

const eventWithContext = { ...event, context: { pass: true } }
const eventWithError = { ...event, level: ERROR, context: { error: new Error('ERR') } }
const eventWithEmptyContext = { ...event, context: {} }

describe('defaultFormatter(event)', () => {
  describe('without context', () => {
    const { level, message, logger, timestamp } = event
    it('should return formatted event without context', () => {
      expect(defaultFormatter(event))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${message}`)
    })
  })

  describe('with empty context', () => {
    const { level, message, logger, timestamp } = eventWithEmptyContext
    it('should return formatted event without context', () => {
      expect(defaultFormatter(eventWithEmptyContext))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${message}`)
    })
  })

  describe('with context', () => {
    const { level, message, logger, timestamp } = eventWithContext
    it('should return formatted event with context', () => {
      const { context } = eventWithContext
      expect(defaultFormatter(eventWithContext))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${message}\n${JSON.stringify(context, jsonReplacer, 2)}`)
    })
  })

  describe('with error in context', () => {
    const { level, logger, timestamp } = eventWithError
    it('should return error stack', () => {
      const { context } = eventWithError
      expect(defaultFormatter(eventWithError))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${context.error.stack}`)
    })
  })
})

describe('jsonFormatter(event)', () => {
  describe('without context', () => {
    it('should return formatted event without context', () => {
      const { level, message, logger, timestamp } = event
      expect(jsonFormatter(event))
        .toBe(JSON.stringify({
          timestamp,
          level,
          logger,
          message
        }, jsonReplacer))
    })
  })

  describe('with empty context', () => {
    it('should return formatted event without context', () => {
      const { level, message, logger, timestamp } = eventWithEmptyContext
      expect(jsonFormatter(eventWithEmptyContext))
        .toBe(JSON.stringify({
          timestamp,
          level,
          logger,
          message
        }, jsonReplacer))
    })
  })

  describe('with context', () => {
    it('should return formatted event with context', () => {
      const { level, message, logger, timestamp } = eventWithContext
      const { context } = eventWithContext
      expect(jsonFormatter(eventWithContext))
        .toBe(JSON.stringify({
          timestamp,
          level,
          logger,
          message,
          context
        }, jsonReplacer))
    })
  })
})
