# Bugsnag: React

A module for integrating [bugsnag-js](https://github.com/bugsnag/bugsnag-js) with [React](https://reactjs.org/).

## Usage

### Inline

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.1.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.1.1/umd/react-dom.production.min.js"></script>
<script src="//d2wy8f7a9ursnm.cloudfront.net/4.x.x/bugsnag.min.js"></script>
<script src="//d2wy8f7a9ursnm.cloudfront.net/bugsnag-plugin-react/1.x.x/bugsnag-react.min.js"></script>
<script>window.bugsnagClient = bugsnag('API_KEY', [ bugsnag__react ])</script>
<script>
  const ErrorBoundary = bugsnag__react.createErrorBoundary()
  ReactDOM.render(
    <ErrorBoundary />,
    document.getElementById('app')
  )
</script>
```

### Bundled

```js
const ReactDOM = require('react-dom')
const React = require('react')
const bugsnag = require('bugsnag-js')
const bsr = require('bugsnag-react').createPlugin()

bugsnag('API_KEY', [ bsr ])

const ErrorBoundary = bsr.createErrorBoundary(React)

ReactDOM.render(
  <ErrorBoundary />,
  document.getElementById('app')
)
```
