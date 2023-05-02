# Changelog

## v3.2.0 (2023-05-01)

- Added `fileOutput()` to save logs to a local file (NodeJS only)

## v3.1.4 (2023-04-30)

- Removed empty context `{}` from formatted log messages in `defaultFormatter()`

## v3.1.3 (2023-04-30)

- Fixed console logs output not showing in console

## v3.1.2 (2023-04-17)

- Fixed scope of `Logger` class members

## v3.1.1 (2023-04-14)

- Added missing dev dependency (rimraf)

## v3.1.0 (2023-04-14)

- Added TypeScript declaration files

## v3.0.4 (2022-10-18)

- Upgraded dependencies

## v3.0.3 (2022-02-17)

- Upgraded dependencies

## v3.0.2 (2021-09-20)

- Upgraded dependencies

## v3.0.1 (2021-06-14)

- Fixed potentially breaking "export from" syntax in index.js
- Upgraded dependencies

## v3.0.0 (2021-05-27)

- **[BREAKING CHANGE]** Changed method signature of `log()` in Logger
  to `log(level: string, message: string, context: object)`
- **[BREAKING CHANGE]** Removed methods `clone()`, `on()` and `off()` in Logger
- **[BREAKING CHANGE]** Removed options `console`, `displayContext` and `displayName` from Logger
  constructor
- **[BREAKING CHANGE]** Moved log level constants to levels.js
- **[BREAKING CHANGE]** Logger must be imported using a named import (
  example: `import { Logger } from '@jalik/logger'`)
- Added `FATAL` constant log level
- Added method `fatal(string|Error, object)` in Logger
- Added option `level: string` in Logger constructor (default: `info`), it can be one of `debug`
  , `info`, `warn`, `error` or `fatal`
- Added option `outputs: Array<function>` in Logger constructor (default: `[consoleOutput()]`)
- Added option `defaultContext: null|object` in Logger constructor (default: `null`)
- Added option `filter: null|function` in Logger constructor (default: `null`)
- Upgraded dependencies

## v2.2.9 (2021-05-18)

- Upgraded dependencies

## v2.2.8 (2021-01-18)

- Upgraded dependencies

## v2.2.7 (2020-11-10)

- Added `esnext` and `sideEffects` in package.json
- Renamed logger.js to Logger.js
- Upgraded dependencies

## v2.2.6 (2020-09-17)

- Upgraded dependencies

## v2.2.5 (2020-08-06)

- Upgraded dependencies

## v2.2.4 (2020-02-18)

- Upgraded dependencies

## v2.2.3 (2019-12-02)

- Upgraded dependencies

## v2.2.2 (2019-07-24)

- Upgraded dependencies

## v2.2.1 (2019-02-26)

- Upgraded dependencies

## v2.2.0 (2019-02-07)

- Upgraded dependencies
- Lib available in ES6+ syntax (see `src` folder) to enable auto-completion in IDEs
- Fixes code in README

## v2.1.4 (2019-01-17)

- Fixes compatibility error `'log' called on an object that does not implement interface Console`

## v2.1.3 (2019-01-17)

- Upgraded dependencies

## v2.1.2 (2018-10-13)

- Upgraded dependencies

## v2.1.1 (2018-10-10)

- Upgraded devDependencies
- Changes package's repository URL

## v2.1.0 (2018-10-10)

- Adds `:` after the logger name (ex: `ClassLogger: test`)
- Adds method `Logger.clone(name: String)`
- Removes useless `return` instruction in the following methods:
    - `Logger.debug()`
    - `Logger.error()`
    - `Logger.info()`
    - `Logger.warn()`

## v2.0.1 (2018-06-09)

- Fixes example of `Logger.on(event: String, listener: Function)` in README

## v2.0.0 (2018-06-09)

- **BREAKING:** Method `Logger.on(event: String, listener: Function)` has changed to improve ease of
  use. Before you had to pass
  `debug`, `error`, `info` or `warning` as the first string argument, now use the `log`
  event instead. Also in the callback, the `type` of log is inserted as the second argument
  after `message`, thus `context` is now the third argument.
    - BEFORE: `Logger.on('error', (message, context) => {})`
    - NOW: `Logger.on('log', (message, type, context) => {})`
- Fixes code examples in README

## v1.0.5 (2018-06-07)

- Upgraded dependencies

## v1.0.4 (2018-04-02)

- Adds constructor option `displayName: Boolean`
- Adds constructor option `name: String`
- Adds method `Logger.getName()`

## v1.0.3 (2018-03-11)

- Exports `Logger` using ES6 default export

## v1.0.2 (2018-03-11)

- Upgraded dependencies

## v1.0.1 (2018-01-24)

- Adds options to activate or deactivate console logging for a type of message
- Adds option `Logger.options.console.debug = true`
- Adds option `Logger.options.console.error = true`
- Adds option `Logger.options.console.info = true`
- Adds option `Logger.options.console.other = true`
- Adds option `Logger.options.console.warning = true`
- Adds option `Logger.options.displayContext = false`

## v1.0.0 (2018-01-24)

- First public release
