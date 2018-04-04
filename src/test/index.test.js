/* global jest, expect, it, beforeEach, test */

import React from 'react'
import renderer from 'react-test-renderer'
import index from '../'

const bugsnag = {
  BugsnagReport: jest.fn(() => {
    return {
      updateMetaData: jest.fn()
    }
  }),
  notify: jest.fn()
}

bugsnag.BugsnagReport.getStacktrace = jest.fn()

const ErrorBoundary = index(React).init(bugsnag)

beforeEach(() => {
  bugsnag.notify.mockReset()
})

test('formatComponentStack(str)', () => {
  const str = `
  in BadButton
  in ErrorBoundary`
  expect(index.formatComponentStack(str))
    .toBe(`in BadButton\nin ErrorBoundary`)
})

it('renders correctly', () => {
  const tree = renderer
    .create(<ErrorBoundary><p>test</p></ErrorBoundary>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

const BadComponent = () => {
  throw Error('BadComponent')
}

it('renders correctly on error', () => {
  const tree = renderer
    .create(<ErrorBoundary><BadComponent /></ErrorBoundary>)
    .toJSON()
  expect(tree).toBe(null)
})

it('calls notify on error', () => {
  renderer
    .create(<ErrorBoundary><BadComponent /></ErrorBoundary>)
    .toJSON()
  expect(bugsnag.notify).toHaveBeenCalledTimes(1)
})
