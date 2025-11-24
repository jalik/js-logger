/*
 * The MIT License (MIT)
 * Copyright (c) 2025 Karl STEIN
 */

import { describe, expect, it } from 'vitest'
import { defaultFormatter, INFO, jsonFormatter } from '../src'
import { LogEvent, LogEventContext } from '../src/event'
import { jsonReplacer } from '../src/util'

const event: LogEvent<LogEventContext> = {
  level: INFO,
  timestamp: Date.now(),
  logger: 'test',
  message: 'ok'
}

const eventWithContext = { ...event, context: { pass: true } }

const eventWithEmptyContext = { ...event, context: {} }

describe('defaultFormatter(event)', () => {
  const { level, message, logger, timestamp } = event

  describe('without context', () => {
    it('should return formatted event without context', () => {
      expect(defaultFormatter(event))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${message}`)
    })
  })

  describe('with empty context', () => {
    it('should return formatted event without context', () => {
      expect(defaultFormatter(eventWithEmptyContext))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${message}`)
    })
  })

  describe('with context', () => {
    it('should return formatted event with context', () => {
      const { context } = eventWithContext
      expect(defaultFormatter(eventWithContext))
        .toBe(`${new Date(timestamp).toISOString()} ${level.toUpperCase()} [${logger}]: ${message}\n${JSON.stringify(context, jsonReplacer, 2)}`)
    })
  })
})

describe('jsonFormatter(event)', () => {
  const { level, message, logger, timestamp } = event

  describe('without context', () => {
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
    it('should return formatted event with context', () => {
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
