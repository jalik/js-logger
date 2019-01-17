# Changelog

## v2.1.3
- Updates dependencies

## v2.1.2
- Updates dependencies

## v2.1.1
- Updates devDependencies
- Changes package's repository URL

## v2.1.0
- Adds `:` after the logger name (ex: `ClassLogger: test`)
- Adds method `Logger.clone(name: String)`
- Removes useless `return` instruction in the following methods:
  - `Logger.debug()`
  - `Logger.error()`
  - `Logger.info()`
  - `Logger.warn()`

## v2.0.1
- Fixes example of `Logger.on(event: String, listener: Function)` in README

## v2.0.0
- **BREAKING:** Method `Logger.on(event: String, listener: Function)` has changed to improve ease of use. Before you had to pass 
`debug`, `error`, `info` or `warning` as the first string argument, now use the `log` 
 event instead. Also in the callback, the `type` of log is inserted as the second argument after `message`, thus `context` is now the third argument.
  - BEFORE: `Logger.on('error', (message, context) => {})`
  - NOW: `Logger.on('log', (message, type, context) => {})`
- Fixes code examples in README

## v1.0.5
- Updates dependencies

## v1.0.4
- Adds constructor option `displayName: Boolean`
- Adds constructor option `name: String`
- Adds method `Logger.getName()`

## v1.0.3
- Exports `Logger` using ES6 default export

## v1.0.1
- Adds options to activate or deactivate console logging for a type of message
- Adds option `Logger.options.console.debug = true`
- Adds option `Logger.options.console.error = true`
- Adds option `Logger.options.console.info = true`
- Adds option `Logger.options.console.other = true`
- Adds option `Logger.options.console.warning = true`
- Adds option `Logger.options.displayContext = false`

## v1.0.0
- First public release
