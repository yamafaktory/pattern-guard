# Pattern-guard 💂 [![Build Status](https://travis-ci.org/yamafaktory/pattern-guard.svg?branch=master)](https://travis-ci.org/yamafaktory/pattern-guard) [![npm version](https://img.shields.io/npm/v/pattern-guard.svg?style=flat)](https://www.npmjs.com/package/pattern-guard) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Pattern-guard is a small module that brings you the [Haskell guards syntax](https://wiki.haskell.org/Pattern_guard) in JavaScript.

## Usage

```js
const guards = require('pattern-guard')

const [a, b, c] = [1, 3, 7]

const result = guards({ a, b, c })`
  | a > b = 1337
  | b > c = 999
  | c > a = 42
  | c > b = 11
`

console.log(result) // 42
```
Please note that, like in Haskell, the first truthy guard will be returned.

Guards can also be inlined:

```js
guards({ a, b, c })`a < b = 'yep' | b > c = 'nope' | c > a = 'maybe'`
```

And they support all comparison operators `< <= == === !== != >= >` and the logical operators too `&& || !`.

In Haskell, the `otherwise` keyword is used as a catch-all. To avoid using this keyword as variable name, this logic is not implemented in the module, you can simply emulate the same behaviour by using `true`:

``` js
const [a, b, c] = [1, 2, 3]

const result = guards({ a, b, c })`
  | a > b = 'nope'
  | b > c = 'nope'
  | c < a = 'nope'
  | true = 'yep'
`

console.log(result) // 'yep'
```

## Linting

The code quality is checked by the [JavaScript Standard Style](http://standardjs.com/).

## License

Released under the [MIT license](https://opensource.org/licenses/MIT) by Davy Duperron.
