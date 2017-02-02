# Pattern-guard 💂 [![Build Status](https://travis-ci.org/yamafaktory/pattern-guard.svg?branch=master)](https://travis-ci.org/yamafaktory/pattern-guard) [![npm version](https://img.shields.io/npm/v/pattern-guard.svg?style=flat)](https://www.npmjs.com/package/pattern-guard) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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
`

console.log(result) // 42
```
Please note that, like in Haskell, the first truthy guard will be returned.

Guards can also be inlined:

```js
guards.equal({ a, b, c })`a < b = 'yep' | b > c = 'nope' | c > a = 'maybe'`
```

And they support all comparison operators `< <= == === !== != >= >` and the logical operators too `&& || !`.

In Haskell, the `otherwise` keyword is used as a catch-all. To avoid using this keyword as variable name, this logic is not implemented in the module, you can simply emulate the same behaviour by using `true`:

``` js
const [a, b, c] = [1, 2, 3]

const result = guards.equal({ a, b, c })`
  | a > b = 'nope'
  | b > c = 'nope'
  | c < a = 'nope'
  | true = 'yep'
`

console.log(result) // 'yep'
```

## Internals

This module is only supported by NodeJS as it internally uses the safe [`vm` module](https://nodejs.org/api/vm.html) in order to compile and run code within V8 Virtual Machine contexts.

The execution time is perfectly fine, for example the following example runs in **less than 4ms** on a MacBook Pro:

```js
const [
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  q,
  r,
  s,
  t,
  u,
  v,
  w,
  x,
  y,
  z
] = Array.from({ length: 26 }, (v, i) => i)

console.time()
const result = guards.equal({
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  q,
  r,
  s,
  t,
  u,
  v,
  w,
  x,
  y,
  z
})`
  | a > b = 1
  | b > c = 2
  | c > d = 3
  | d > e = 4
  | e > f = 5
  | f > g = 6
  | g > h = 7
  | h > i = 8
  | i > j = 9
  | j > k = 10
  | k > l = 11
  | l > m = 12
  | m > n = 13
  | n > o = 14
  | o > p = 15
  | p > q = 16
  | q > r = 17
  | r > s = 18
  | s > t = 19
  | t > u = 20
  | u > v = 21
  | v > w = 22
  | w > x = 23
  | x > y = 24
  | y < z = 25
`
console.timeEnd() // 3.676ms

console.log(result) // 25
```

## Linting

The code quality is checked by the [JavaScript Standard Style](http://standardjs.com/).

## License

Released under the [MIT license](https://opensource.org/licenses/MIT) by Davy Duperron.
