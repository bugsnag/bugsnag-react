/* global test, expect */

global.window = {}

const p = require('../')

test('formatComponentStack(str)', () => {
  const str = `
  in BadButton
  in ErrorBoundary`
  expect(p.formatComponentStack(str))
    .toBe(`in BadButton\nin ErrorBoundary`)
})
