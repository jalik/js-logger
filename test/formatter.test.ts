/*
 * The MIT License (MIT)
 * Copyright (c) 2025 Karl STEIN
 */

import { describe, expect, it } from 'vitest'
import { defaultFormatter, ERROR, FATAL, INFO, jsonFormatter } from '../src'
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
    const { context, level, message, logger, timestamp } = eventWithContext
    it('should return formatted event with context', () => {
      expect(defaultFormatter(eventWithContext))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${message}\n${JSON.stringify(context, jsonReplacer, 2)}`)
    })
  })

  describe('with error level and error in context', () => {
    const { level, logger, timestamp, context } = eventWithError
    it('should return error stack', () => {
      expect(defaultFormatter(eventWithError))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${context.error.stack}`)
    })
  })

  describe('with fatal level and error in context', () => {
    const event = { ...eventWithError, level: FATAL }
    const { level, logger, timestamp, context } = event
    it('should return error stack', () => {
      expect(defaultFormatter(event))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${context.error.stack}`)
    })
  })
})

describe('jsonFormatter(event)', () => {
  describe('without context', () => {
    const { level, message, logger, timestamp } = event
    it('should return formatted event without context', () => {
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
    const { level, message, logger, timestamp } = eventWithEmptyContext
    it('should return formatted event without context', () => {
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
    const { context, level, message, logger, timestamp } = eventWithContext
    it('should return formatted event with context', () => {
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
