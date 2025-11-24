# @jalik/logger

![GitHub package.json version](https://img.shields.io/github/package-json/v/jalik/js-logger.svg)
![Build Status](https://github.com/jalik/js-logger/actions/workflows/node.js.yml/badge.svg)
![Last commit](https://img.shields.io/github/last-commit/jalik/js-logger.svg)
[![GitHub issues](https://img.shields.io/github/issues/jalik/js-logger.svg)](https://github.com/jalik/js-logger/issues)
![GitHub](https://img.shields.io/github/license/jalik/js-logger.svg)
![npm](https://img.shields.io/npm/dt/@jalik/logger.svg)

Easy and customizable logging for your apps.

## Features

* Support of multiple outputs (console, file, custom...)
* Set the logging level (debug, info, warning, error, fatal)
* Enabling/disabling a logger during runtime
* Set a default context for each logger
* Pass any context to a logging event for technical details
* Logging event filtering
* Logging event formatting
* TypeScript declarations ♥

## Sandbox

Play with the lib here:
https://codesandbox.io/s/jalik-logger-default-example-75o5hx

## Installing

```shell
npm i -P @jalik/logger
```

```shell
yarn add @jalik/logger
```

## Creating a logger

```js
import { Logger } from '@jalik/logger'

const logger = new Logger()
```

Which is equivalent to a production default setup:

```js
import {
  Logger,
  INFO,
  consoleOutput
} from '@jalik/logger'

const logger = new Logger({
  // Enable the logger
  active: true,
  // Only log events with an INFO level or more
  level: INFO,
  // Set the name of this logger (auto-generated if not set)
  name: 'main',
  // Set logging outputs
  outputs: [
    // Output logs to the console
    consoleOutput()
  ]
})
```

## Logging levels

The following levels are available (ordered from the **less important to the most
important**).

- `debug`: used for debugging messages
- `info`: used for informational messages
- `warn`: used for warning messages
- `error`: used for error messages
- `fatal`: used for fatal error messages

They can be imported individually.

```js
import {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL
} from '@jalik/logger'
```

Or they can be imported as an array.

```js
import { levels } from '@jalik/logger';
```

## Logging messages

### `debug(message: string, context?: any)`

```js
import { Logger } from '@jalik/logger'

const logger = new Logger({ name: 'main' })
const a = 2
const b = 4
const result = a + b

// Logs a message with a context
logger.debug(`result = ${result}`, { a, b })
// or without context
logger.debug(`result = ${result}`)
```

### `info(message: string, context?: any)`

```js
import { Logger } from '@jalik/logger'

const logger = new Logger({ name: 'main' })
const bootTime = 133.7

// Log the message with a context
logger.info(`Application started in ${bootTime} ms`, { bootTime, tags: ['boot'] })
// or without context
logger.info(`Application started in ${bootTime} ms`)
```

### `warn(message: string, context?: any)`

```js
import { Logger } from '@jalik/logger'

const logger = new Logger({ name: 'main' })
const diskUsage = 93.6

// Log the message with a context
logger.warn('Disk usage is above 90%', { diskUsage })
// or without context
logger.warn('Disk usage is above 90%')
```

### `error(message: string, context?: any)`

```js
import { Logger } from '@jalik/logger'

const logger = new Logger({ name: 'main' })
const error = new Error('Forbidden')

// Log the message with a context
logger.error('Forbidden', { error })
// or without context
logger.error('Forbidden')
// or pass the error object directly
logger.error(error)
```

### `fatal(message: string, context?: any)`

```js
import { Logger } from '@jalik/logger'

const logger = new Logger({ name: 'main' })
const error = new Error('app crashed')

// Log the message with a context
logger.fatal('app crashed', { error })
// or without context
logger.fatal('app crashed')
// or pass the error object directly
logger.fatal(error)
```

### `log(level: string, message: string, context?: any)`

This is the "low level" function called by other logging functions.

```js
import {
  Logger,
  INFO
} from '@jalik/logger'

const logger = new Logger({ name: 'main' })
const ipAddress = '6.6.6.6'

// Logs an informational message with a context.
logger.log(INFO, `The IP address ${ipAddress} has failed to login 3 times`, { ipAddress })
```

## Enabling or disabling logging

Logging is enabled by default if you don't set `active: false` in Logger options. However, you can
change logging status at anytime with the `setActive(boolean)` method.

### `setActive(boolean)`

```js
import { Logger } from '@jalik/logger'

const logger = new Logger({ name: 'main' })

setTimeout(() => {
  logger.setActive(false)
  logger.info('this message will be ignored')
  logger.setActive(true)
  logger.info('this message will not be ignored')
}, 3000)
```

### `isActive(): boolean`

This method tells you if the logger is enabled.

## Setting a default context

It is possible to set `defaultContext` when creating the logger.  
This context will be passed to all log events and may be overridden for each log.

```js
import { Logger } from '@jalik/logger'

const logger = new Logger({
  defaultContext: {
    pid: process.env.pid,
    host: process.env.HOST
  }
})

// then logging a message will automatically use the default context.
logger.info('Application started.')

// you can even add a context over a default context (attributes will be merged
// and/or replaced).
logger.info('Something happened', { tag: 'something-event' })
```

## Filtering log events

You can filter the logs that are processed by using the `filter` option when creating a logger.

```js
import {
  DEBUG,
  Logger
} from '@jalik/logger'

const cronFilter = (event) => {
  return (event.context && event.context?.tag === 'cron') || /cron/g.test(event.message)
}

const logger = new Logger({
  level: DEBUG,
  filter: cronFilter
})

// this will be logged.
logger.info('Cron jobs executed.', { tag: 'cron' })

// this will not be logged.
logger.info('Application started.')
```

## Logging outputs

A logger can be configured with several `outputs`, all of them are executed sequentially.
By default, a logger is configured to output messages to the console with `consoleOutput()`.

### `consoleOutput(options)`

The console output displays logs in the console (browser and nodejs).

```js
import {
  Logger,
  consoleOutput
} from '@jalik/logger'

const logger = new Logger({
  name: 'main',
  outputs: [
    consoleOutput()
  ]
})

logger.info('Hello World', { number: 42 })
// 2021-05-27T02:40:06.957Z INFO [main]: Hello World
// {"number":42}
```

By default, `consoleOutput()` uses the `defaultFormatter()` function to format log events, but you
can provide your own formatter.

```js
import {
  Logger,
  consoleOutput,
} from '@jalik/logger';

function simpleFormatter (event) {
  const { level, logger, message } = event;
  return [level.toUpperCase(), `[${logger}]`, ':', message].join(' ');
}

const logger = new Logger({
  name: 'main',
  outputs: [
    consoleOutput({
      formatter: simpleFormatter
    }),
  ],
});

logger.info('Hello World', { number: 42 });
// INFO [main] : Hello World
```

### `fileOutput(options)`

The file output writes log events to a file, so it can only be used on NodeJS.

```js
import { Logger } from '@jalik/logger'
import { fileOutput } from '@jalik/logger'

const logger = new Logger({
  name: 'main',
  outputs: [
    fileOutput({
      // the logs destination file
      path: 'logs.txt',
      // the formatter to use
      formatter: JSON.stringify,
      // improve performances by flushing (writing) logs at interval
      // instead of writing logs every time
      flushInterval: 1000
    })
  ]
})

logger.info('Hello World', { number: 42 })
// {"timestamp":1682982410055,"level":"INFO","logger":"main","message":"Hello
// World","context":{"number":42}}
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md) on github.

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).
