# Bugsnag: React

[![Documentation](https://img.shields.io/badge/docs-v1-green.svg)](https://docs.bugsnag.com/platforms/browsers/react/)
[![Build status](https://travis-ci.org/bugsnag/bugsnag-react.svg?branch=master)](https://travis-ci.org/bugsnag/bugsnag-react)
[![NPM](https://img.shields.io/npm/v/bugsnag-react.svg)](https://npmjs.org/package/bugsnag-react)

[![NPM](https://nodei.co/npm/bugsnag-react.png?compact=true)](https://npmjs.org/package/bugsnag-react)

A [bugsnag-js](https://github.com/bugsnag/bugsnag-js) plugin for [React](https://reactjs.org/). Learn more about [error reporting for React applications](https://www.bugsnag.com/platforms/react-error-reporting/) with Bugsnag.

This package enables you to integrate Bugsnag's error reporting with React's [error boundaries](https://blog.bugsnag.com/react-16-error-handling/). It creates and configures an `<ErrorBoundary/>` component which will capture and report unhandled errors in your component tree. You either use the `<ErrorBoundary/>` directly, or extend it to provide some fallback UI for your users.

Reported errors will contain useful debugging info from Reacts's internals such as the component name where the error originated, and the component stack.

## Installation

You can opt to install the package from npm, using the instructions below. Alternatively you can load the plugin from our CDN via a `<script/>` tag.

### CDN

```html
<script src="//d2wy8f7a9ursnm.cloudfront.net/v4/bugsnag.min.js"></script>
<script src="//d2wy8f7a9ursnm.cloudfront.net/bugsnag-plugins/v1/bugsnag-react.min.js"></script>
```

### npm

```sh
npm i --save bugsnag-js bugsnag-react
# or
yarn add bugsnag-js bugsnag-react
```

## Usage

Depending on how your application is structured, usage differs slightly:

### Inline script tag

The script tag creates a global function called `bugsnag__react` which needs to be passed a reference to the `React` object. Ensure that `React` is defined before calling this function.

```html
<script>
  window.bugsnagClient = bugsnag('API_KEY')
</script>
<script>
  // in your react app…
  var ErrorBoundary = bugsnagClient.use(bugsnag__react(React))
  ReactDOM.render(
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>,
    document.getElementById('app')
  )
</script>
```

See the [example](example) for more info.

### Bundled

```js
// initialize bugsnag ASAP, before other imports
import bugsnag from 'bugsnag-js'
const bugsnagClient = bugsnag('API_KEY')

import ReactDOM from 'react-dom'
import React from 'react'
import createPlugin from 'bugsnag-react'

// wrap your entire app tree in the ErrorBoundary provided
const ErrorBoundary = bugsnagClient.use(createPlugin(React))
ReactDOM.render(
  <ErrorBoundary>
    <YourApp />
  </ErrorBoundary>,
  document.getElementById('app')
)
```

## Support

* Check out the [documentation](https://docs.bugsnag.com/platforms/browsers/)
* [Search open and closed issues](https://github.com/bugsnag/bugsnag-react/issues?q=is%3Aissue) for similar problems
* [Report a bug or request a feature](https://github.com/bugsnag/bugsnag-react/issues/new)

## License

The Bugsnag JS library and official plugins are free software released under the MIT License. See [LICENSE.txt](LICENSE.txt) for details.
