# @jalik/logger

![GitHub package.json version](https://img.shields.io/github/package-json/v/jalik/js-logger.svg)
[![Build Status](https://travis-ci.com/jalik/js-logger.svg?branch=master)](https://travis-ci.com/jalik/js-logger)
![GitHub](https://img.shields.io/github/license/jalik/js-logger.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/jalik/js-logger.svg)
[![GitHub issues](https://img.shields.io/github/issues/jalik/js-logger.svg)](https://github.com/jalik/js-logger/issues)
![npm](https://img.shields.io/npm/dt/@jalik/logger.svg)

A fast and handy logging library to send logs to anything you want (console, file, database,
APIs...).

## Introduction

Logging is an important part of an application lifecycle, from development to production, we always
need to log messages for debugging and making error investigation easier, this is the purpose of
this lib.

## Creating a logger

The first thing to do is to create a logger, it's deadly simple.

```js
import {
  Logger,
  INFO
} from '@jalik/logger';

const logger = new Logger({
  // Activate the logger
  active: true,
  // Set the minimal log level to log messages
  level: INFO,
  // Set the name of this logger
  name: 'main',
  // Set logging outputs
  outputs: [
    // Output logs to the console
    consoleOutput()
  ]
});
```

Or just use the code below to create a logger with the default config (`active: true`, `level: INFO`
,
`outputs: [consoleOutput()]`).

```js
import { Logger } from '@jalik/logger';

const logger = new Logger({ name: 'main' });
```

## Levels of logging

The following logging levels are available (ordered from the **less important to the most
important**).

- `debug`: used for debugging messages
- `info`: used for informational messages
- `warn`: used for warning messages
- `error`: used for error messages
- `fatal`: used for fatal error messages

They can be imported via constants.

```js
import {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL
} from '@jalik/logger';
```

The ordered levels can also be imported as an array.

```js
import { levels } from '@jalik/logger';
```

## Logging messages

Use any of these functions to log messages.

### `log(level, message, context)`

This is the "low level" function called by other shortcut functions.

```js
import {
  Logger,
  INFO
} from '@jalik/logger';

const logger = new Logger({ name: 'main' });
const ipAddress = '6.6.6.6';

// Logs an informational message with a context.
logger.log(INFO, `The IP address ${ipAddress} has failed to login 3 times`, { ipAddress });
```

### `debug(message, context)`

```js
import { Logger } from '@jalik/logger';

const logger = new Logger({ name: 'main' });
const a = 2;
const b = 4;
const result = a + b;

// Logs a message with a context
logger.debug(`result = ${result}`, { a, b });
// or without context
logger.debug(`result = ${result}`);
```

### `info(message, context)`

```js
import { Logger } from '@jalik/logger';

const logger = new Logger({ name: 'main' });
const bootTime = 1337;

// Log the message with a context
logger.info(`Application started in ${bootTime} ms`, { bootTime, tags: ['boot'] });
// or without context
logger.info(`Application started in ${bootTime} ms`);
```

### `warn(message, context)`

```js
import { Logger } from '@jalik/logger';

const logger = new Logger({ name: 'main' });
const diskUsage = 93.6;

// Log the message with a context
logger.warn('Disk usage is above 90%', { diskUsage });
// or without context
logger.warn('Disk usage is above 90%');
```

### `error(message, context)`

```js
import { Logger } from '@jalik/logger';

const logger = new Logger({ name: 'main' });
const error = new Error('Forbidden');

// Log the message with a context
logger.error('Forbidden', { error });
// or without context
logger.error('Forbidden');
// or simply (it will use error.message)
logger.error(error);
```

### `fatal(message, context)`

```js
import { Logger } from '@jalik/logger';

const logger = new Logger({ name: 'main' });
const error = new Error('app crashed');

// Log the message with a context
logger.fatal('app crashed', { error });
// or without context
logger.fatal('app crashed');
// or simply (it will use error.message)
logger.fatal(error);
```

## Enabling or disabling a logger

A logger is enabled by default if you don't set `active: false` in Logger options. However, you can
change logging status at anytime the `setActive(Boolean)` method.

### `setActive(boolean)`

```js
import { Logger } from '@jalik/logger';

const logger = new Logger({
  // Enable logger on production environment only.
  active: process.env.NODE_ENV === 'PRODUCTION'
});

// To check if the logger is active.
logger.isActive();

// Disable logger after 30 seconds.
setTimeout(() => {
  // Anything that is logged after this line will be ignored.
  logger.setActive(false);
  logger.info('Sky is blue');
}, 30000)
```

### `isActive(): boolean`

This method tells you if the logger is enabled.

## Setting a default context

It is possible to define a `defaultContext` when creating the logger.  
This context will be passed to all log events and may be overwritten for each log.

```js
import { Logger } from '@jalik/logger';

const logger = new Logger({
  defaultContext: {
    host: process.env.HOST
  }
});

// then logging a message will automatically use the default context.
logger.info('Application started.');

// you can even add a context over a default context (attributes will be merged and/or replaced).
logger.info('Something happened', { tag: 'something-event' });
```

## Filtering log events

You can filter the logs that are processed by using the `filter` option when creating a logger.

```js
import {
  DEBUG,
  Logger
} from '@jalik/logger';

const cronFilter = (event) => {
  return (event.context && event.context.tag === 'cron') || /cron/g.test(event.message)
}

const logger = new Logger({
  level: DEBUG,
  filter: cronFilter
});

// this will be logged.
logger.info('Cron jobs executed.', { tag: 'cron' });

// this will not be logged.
logger.info('Application started.');
```

## Logging outputs

Each logger can be configured with one or more `outputs`.  
By default, a logger will output messages to the console with the `consoleOutput` like in the code
below.

### `consoleOutput(options)`

The console output allows you to display logs in the console (browser and nodejs), you can also
provide your own formatter.

```js
import {
  Logger,
  consoleOutput
} from '@jalik/logger';

function formatter(event) {
  // format:
  // DATE EVENT [LOGGER] : MESSAGE ; CONTEXT
  return [
    new Date(event.timestamp).toISOString(),
    event.level.toUpperCase(),
    `[${event.logger}]`,
    ':',
    event.message,
    ';',
    JSON.stringify(event.context)
  ].join(' ')
}

const logger = new Logger({
  name: 'main',
  outputs: [
    consoleOutput({ formatter }),
  ],
});

logger.info('Hello World', { number: 42 });
// will log:
// 2021-05-27T02:40:06.957Z DEBUG [main] : Hello World ; {"number":42}
```

To create your own logger output, please see how [consoleOutput](src/outputs/consoleOutput.js) was
created.

## Changelog

History of releases is in the [changelog](./CHANGELOG.md) on github.

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).

If you find this lib useful and would like to support my work, donations are welcome :)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VMSEE22DQGQYE)
