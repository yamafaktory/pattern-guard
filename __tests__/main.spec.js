test('numbers', () => {
  const guards = require('../')
  const [a, b, c] = [1, 3, 7]

  expect(
    guards({ a, b, c })`
      | a > b = 1337
      | b > c = 999
      | c > a = 42
    `
  ).toBe(42)
})

test('strings', () => {
  const guards = require('../')
  const [a, b, c] = [1, 3, 7]

  expect(
    guards({ a, b, c })`
      | a > b = 'nope'
      | b > c = 'nope'
      | c > a = 'yep'
    `
  ).toBe('yep')
})

test('inline', () => {
  const guards = require('../')
  const [a, b, c] = [1, 1, 7]

  expect(
    guards({ a, b, c })`a < b = 'yep' | b > c = 'nope' | c > a = 'maybe'`
  ).toBe('maybe')
})

test('complex comparison operators', () => {
  const guards = require('../')
  const [a, b, c] = [1, 11, 11]

  expect(
    guards({ a, b, c })`
      | a === b = 1
      | a != c = 2
      | b >= c = 3
      | c <= a = 4
      | c !== a = 5
      | c != a = 6
    `
  ).toBe(2)
})

test('logical operators', () => {
  const guards = require('../')
  const [a, b, c] = [true, false, true]

  expect(
    guards({ a, b, c })`
      | a || b = 1
      | b && c = 2
      | !a = 3
    `
  ).toBe(1)
})

test('otherwise', () => {
  const guards = require('../')
  const [a, b, c] = [1, 2, 3]

  expect(
    guards({ a, b, c })`
      | a > b = 'nope'
      | b > c = 'nope'
      | c < a = 'nope'
      | true = 'yep'
    `
  ).toBe('yep')
})

test('long example', () => {
  const guards = require('../')
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

  expect(
    guards({
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
  ).toBe(25)
})
