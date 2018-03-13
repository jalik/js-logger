# Logger

A flexible logger to log messages to anything you want (console, file, database...), there's nothing more to say about it.

## Introduction

Logging is an important part of an application lifecycle, from development to production, we always need to log messages for debugging or tracing errors and warnings.

**This library is tested with unit tests.**

## Creating a logger

The first thing to do is to create a logger, it's deadly simple.

```js
import Logger from "@jalik/logger";

const Logger = new Logger({
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
  displayContext: true
});
```

Note that `options` are available on each `Logger` instance via `Logger.options`.

## Logging types

As you can imagine, there are different types of logging, this is useful to distinguish messages, so below are these types :
- debug : only used for debugging
- error : only used for errors and exceptions
- info : only used to display informative messages
- warning : only used to display warnings

You can access predefined logging types by importing them in your code.

```js
import Types from "@jalik/logger/dist/types";

Types.debug;
Types.error;
Types.info;
Types.warning;
```

## Logging messages

When you log a message, you can also provide an optional context as extra information, you have a dedicated method for each type of logging.

```js
import Logger from "@jalik/logger";

const Logger = new Logger();

// Logs a debug message
Logger.debug("user json", {name: "karl"});

// Logs an error message
Logger.error("Forbidden", {error: new Error("forbidden")});
Logger.error(new Error("forbidden"));

// Logs an info message
Logger.info("Application started", {date: new Date()});

// Logs a warning message
Logger.warn("Disk usage is above 90%", {diskUsage: 92.6});

// Logs a custom type message
Logger.log("Plop", "custom-type");
```

## Activating or deactivating a logger

By default a logger is activated, but you can deactivate it anytime you want by using the `setActive(Boolean)` method.

```js
import Logger from "@jalik/logger";

const Logger = new Logger();

// Activate logger on production environment only
Logger.setActive(process.env.NODE_ENV === "PRODUCTION");

// And to check if the logger is active
Logger.isActive();
```

## Listening events

The logger is flexible enough in the way that you can execute callbacks when an event occurs (debug, error, info, warning), so you could save logs to a database, a file or whatever you want.

```js
import Types from "@jalik/logger/dist/types";
import Logger from "@jalik/logger";

const Logger = new Logger();

// With this event listener, you can do something when an error happens
Logger.on(Types.error, (message, context) => {
    // do whatever you want here...
    // save error to database, send an email...
});

// This will trigger the listener defined above
Logger.error("Cannot contact DNS server", {ipAddress: "8.8.8.8"});
```

## Changelog

### v1.0.3
- Exports `Logger` using ES6 default export

### v1.0.1
- Adds options to activate or deactivate console logging for a type of message
- Adds option `Logger.options.console.debug = true`
- Adds option `Logger.options.console.error = true`
- Adds option `Logger.options.console.info = true`
- Adds option `Logger.options.console.other = true`
- Adds option `Logger.options.console.warning = true`
- Adds option `Logger.options.displayContext = false`

### v1.0.0
- First public release

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).

If you find this lib useful and would like to support my work, donations are welcome :)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VMSEE22DQGQYE)
