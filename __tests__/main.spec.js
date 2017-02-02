test('numbers', () => {
  const Guards = require('../')
  const [a, b, c] = [1, 3, 7]
  const guards = new Guards()

  expect(
    guards.equal({ a, b, c })`
      | a > b = 1337
      | b > c = 999
      | c > a = 42
    `
  ).toBe(42)
})

test('strings', () => {
  const Guards = require('../')
  const [a, b, c] = [1, 3, 7]
  const guards = new Guards()

  expect(
    guards.equal({ a, b, c })`
      | a > b = 'nope'
      | b > c = 'nope'
      | c > a = 'yep'
    `
  ).toBe('yep')
})

test('inline', () => {
  const Guards = require('../')
  const [a, b, c] = [1, 1, 7]
  const guards = new Guards()

  expect(
    guards.equal({ a, b, c })`a < b = 'yep' | b > c = 'nope' | c > a = 'maybe'`
  ).toBe('maybe')
})

test('complex comparison operators', () => {
  const Guards = require('../')
  const [a, b, c] = [1, 11, 11]
  const guards = new Guards()

  expect(
    guards.equal({ a, b, c })`
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
  const Guards = require('../')
  const [a, b, c] = [true, false, true]
  const guards = new Guards()

  expect(
    guards.equal({ a, b, c })`
      | a || b = 1
      | b && c = 2
      | !a = 3
    `
  ).toBe(1)
})

test('otherwise', () => {
  const Guards = require('../')
  const [a, b, c] = [1, 2, 3]
  const guards = new Guards()

  expect(
    guards.equal({ a, b, c })`
      | a > b = 'nope'
      | b > c = 'nope'
      | c < a = 'nope'
      | true = 'yep'
    `
  ).toBe('yep')
})
