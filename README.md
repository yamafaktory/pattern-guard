# Pattern-guard :guardsman-tone1: [![Build Status](https://travis-ci.org/yamafaktory/pattern-guard.svg?branch=master)](https://travis-ci.org/yamafaktory/pattern-guard) [![npm version](https://img.shields.io/npm/v/pattern-guard.svg?style=flat)](https://www.npmjs.com/package/pattern-guard) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Pattern-guard is a small NodeJS module that brings you the [Haskell guards syntax](https://wiki.haskell.org/Pattern_guard) in JavaScript.

## Usage

```js
const Guards = require('pattern-guard')

const guards = new Guards()

const [a, b, c] = [1, 3, 7]

const result = guards.equal({ a, b, c })`
  | a > b = 1337
  | b > c = 999
  | c > a = 42
  | c > b = 11

console.log(result) //42
```
Please note that, like in Haskell, the first truthy guard will be returned.

Guards can also be inlined:

```js
guards.equal({ a, b, c })`a < b = 'yep' | b > c = 'nope' | c > a = 'maybe'`
```

And they support all comparison operators `< <= == === !== != >= >` and the logical operators too `&& || !`.

## Internals

This module is only supported by NodeJS as it internally uses the safe [`vm` module](https://nodejs.org/api/vm.html) in order to compile and run code within V8 Virtual Machine contexts.

## Linting

The code quality is checked by the [JavaScript Standard Style](http://standardjs.com/).

## License

Released under the [MIT license](https://opensource.org/licenses/MIT) by Davy Duperron.