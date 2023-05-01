/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { afterAll, describe, expect, it, jest } from '@jest/globals'
import * as fs from 'fs'
import { INFO } from '../../src'
import { LogEvent, LogEventContext } from '../../src/event'
import fileOutput from '../../src/outputs/fileOutput'

// Replace setInterval() with fake timer.
jest.useFakeTimers()
jest.spyOn(global, 'setInterval')

const formatter = JSON.stringify
const lineSeparator = '\n'
const path = 'logs.txt'

function getLastEntry (content: string): string | undefined {
  return content.split(lineSeparator).filter((v) => v !== '').pop()
}

afterAll(async () => {
  try {
    await fs.promises.unlink(path)
  } catch (e) {
    // do nothing
  }
})

function createEvent (): LogEvent<LogEventContext> {
  return {
    timestamp: Date.now(),
    logger: 'test',
    level: INFO,
    message: 'This is a message',
    context: { random: Math.random().toString(), test: true }
  }
}

describe('fileOutput({ path: null | undefined })', () => {
  it('should throw an error', () => {
    expect(() => {
      fileOutput({
        // @ts-ignore
        path: null
      })
    }).toThrow()

    expect(() => {
      fileOutput({
        // @ts-ignore
        path: undefined
      })
    }).toThrow()
  })
})

describe('fileOutput({ path: "logs.txt" })(event)', () => {
  const output = fileOutput({ formatter, lineSeparator, path })

  const event = createEvent()
  output(event)

  it('should create the logs file', () => {
    expect(async () => {
      await fs.promises.stat(path)
    }).not.toThrow()
  })

  it('should write event to the file', async () => {
    const logs = await fs.promises.readFile(path, { encoding: 'utf-8' })
    const lastEntry = getLastEntry(logs)
    expect(lastEntry).toBe(formatter(event))
  })
})

describe('fileOutput({ path: "logs.txt", flushInterval: number })(event)', () => {
  const flushInterval = 1000
  const output = fileOutput({
    formatter,
    flushInterval,
    lineSeparator,
    path
  })

  it('should call setInterval() with flushInterval as interval', () => {
    // jest.runAllTimers();
    // jest.runOnlyPendingTimers();
    expect(setInterval).toHaveBeenCalledTimes(1)
  })

  it('should not write events to the file before the flushInterval', async () => {
    const event = createEvent()
    output(event)
    jest.advanceTimersByTime(Math.round(flushInterval / 2))
    const logs = await fs.promises.readFile(path, { encoding: 'utf-8' })
    const lastEntry = getLastEntry(logs)
    expect(lastEntry).not.toBe(formatter(event))
  })

  it('should write events to the file after the flushInterval', async () => {
    const event = { ...createEvent(), message: 'xxx' }
    output(event)
    jest.advanceTimersByTime(flushInterval * 2)
    const logs = await fs.promises.readFile(path, { encoding: 'utf-8' })
    const lastEntry = getLastEntry(logs)
    expect(lastEntry).toBe(formatter(event))
  })
})
