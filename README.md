# Bugsnag: React

A module for integrating [bugsnag-js](https://github.com/bugsnag/bugsnag-js) with [React](https://reactjs.org/).

## Usage

### Inline

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.1.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.1.1/umd/react-dom.production.min.js"></script>
<script src="//d2wy8f7a9ursnm.cloudfront.net/v4/bugsnag.min.js"></script>
<script src="//d2wy8f7a9ursnm.cloudfront.net/bugsnag-plugin-react/v1/bugsnag-react.min.js"></script>
<script>
  window.bugsnagClient = bugsnag('API_KEY')
</script>
<script>
  // in your react app…
  var ErrorBoundary = bugsnag__react(React, bugsnagClient)
  ReactDOM.render(
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>,
    document.getElementById('app')
  )
</script>
```

### Bundled

```js
import ReactDOM from 'react-dom'
import React from 'react'
import bugsnag from 'bugsnag-js'
import bugsnagReact from 'bugsnag-react'

const bugsnagClient = bugsnag('API_KEY')
const bsr = bugsnagReact(React, bugsnagClient)

const ErrorBoundary = bsr.createErrorBoundary()

ReactDOM.render(
  <ErrorBoundary>
    <YourApp />
  </ErrorBoundary>,
  document.getElementById('app')
)
```
