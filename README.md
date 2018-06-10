# Logger

A flexible logger to log messages to anything you want (console, file, database...), there's nothing more to say about it.

## Introduction

Logging is an important part of an application lifecycle, from development to production, we always need to log messages for debugging or tracing errors and warnings, this lib will hep you taking control of logging in your apps.

**This library has 23 unit tests.**

## Creating a logger

The first thing to do is to create a logger, it's deadly simple.

```js
import Logger from '@jalik/logger';

const logger = new Logger({
  // Activate the logger
  active: true,
  // Display message of given types in the console
  console: {
    debug: true,
    error: true,
    info: true,
    other: true,
    warning: true
  },
  // Display context in the console
  displayContext: false,
  // Display logger name in the console
  displayMessage: false,
  // Give a name to this logger
  name: 'main'
});
```

Note that after creating the logger, you can still change the options via the public attribute 
`options`, like `logger.options.console.debug = false`.

## Logging types

Instead of levels, this lib refers to types of logging, this is useful to distinguish and filter 
messages, there are 4 well known types of logging :
- debug : only used for debugging
- error : only used for errors and exceptions
- info : only used to display informative messages
- warning : only used to display warnings

You can get the string value of each types by importing the types list.

```js
import Types from '@jalik/logger/dist/types';

Types.debug;   // used by console.debug()
Types.error;   // used by console.error()
Types.info;    // used by console.info()
Types.warning; // used by console.warn()
```

## Logging messages

When you log a message, you can also provide an optional context as extra information, you have a dedicated method for each type of logging.

```js
import Logger from '@jalik/logger';

const logger = new Logger();

// Logs a debug message
// Note: you can use string templates available since ES6
// to have dynamic logs.
const user = {name: 'karl'};
logger.debug(`user logged "${user.name}"`, user);

// Logs an error message
logger.error('Forbidden', {error: new Error('forbidden')});
logger.error(new Error('forbidden'));

// Logs an info message
logger.info('Application started', {date: new Date()});

// Logs a warning message
logger.warn('Disk usage is above 90%', {diskUsage: 92.6});

// Logs a custom type message
const ipAddress = '6.6.6.6';
logger.log(`The IP address ${ipAddress} has failed to login 3 times in one minute`, 'suspicious',
 {ipAddress});
```

## Activating or deactivating a logger

By default a logger is activated, but you can deactivate it anytime you want by using the `setActive(Boolean)` method.

```js
import Logger from '@jalik/logger';

const logger = new Logger();

// Activate logger on production environment only
logger.setActive(process.env.NODE_ENV === 'PRODUCTION');

// And to check if the logger is active
logger.isActive();
```

## Listening events

The logger is flexible enough in the way that you can execute callbacks when an event occurs (debug, error, info, warning), so you could save logs to a database, a file or whatever you want.

```js
import Types from '@jalik/logger/dist/types';
import Logger from '@jalik/logger';

const logger = new Logger();

// With this event listener, you can do something when an error happens
logger.on(Types.error, (message, context) => {
    // do whatever you want here...
    // save error to database, send an email...
});

// This will trigger the listener defined above
logger.error('Cannot contact DNS server', {ipAddress: '8.8.8.8'});
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md) on github.

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).

If you find this lib useful and would like to support my work, donations are welcome :)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VMSEE22DQGQYE)
