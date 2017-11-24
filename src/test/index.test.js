global.window = {}

const test = require('tape')
const p = require('../')

test('formatComponentStack(str)', t => {
  const str = `
  in BadButton
  in ErrorBoundary`
  const expect = `in BadButton\nin ErrorBoundary`
  t.equal(p.formatComponentStack(str), expect)
  t.end()
})
