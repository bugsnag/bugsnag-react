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

const BadComponent = () => {
  throw Error('BadComponent')
}

const GoodComponent = () => ('test')

const FallbackComponent = jest.fn(() => 'fallback')

it('renders correctly', () => {
  const tree = renderer
    .create(<ErrorBoundary><GoodComponent /></ErrorBoundary>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

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

it('does not render FallbackComponent when no error', () => {
  const tree = renderer
    .create(<ErrorBoundary FallbackComponent={FallbackComponent}><GoodComponent /></ErrorBoundary>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders FallbackComponent on error', () => {
  const tree = renderer
    .create(<ErrorBoundary FallbackComponent={FallbackComponent}><BadComponent /></ErrorBoundary>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('passes the props to the FallbackComponent', () => {
  renderer
    .create(<ErrorBoundary FallbackComponent={FallbackComponent}><BadComponent /></ErrorBoundary>)
  expect(FallbackComponent).toBeCalledWith(
    expect.objectContaining({
      error: expect.anything(),
      info: expect.anything()
    }),
    expect.anything()
  )
})
