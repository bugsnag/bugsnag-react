# Bugsnag: React Example

This example shows how you can use the Bugsnag JavaScript notifier with
[React](https://facebook.github.io/react/), specifically taking advantage of
[improved error handling](https://facebook.github.io/react/blog/2017/07/26/error-handling-in-react-16.html)
in version 16.

Whilst the notifier reports any errors that are uncaught, there are certain types
of error that can happen in React which can either be swallowed, or thrown with
limited contextual info. The addition of "error boundaries" in React 16 allow
you to define how components respond to error states in within the component tree.

The `bugsnag-react` plugin provides an error boundary component that you can use
in your application.

## Setup

Try this out with [your own Bugsnag account](https://app.bugsnag.com/user/new)!
You'll be able to see how the errors are reported in the dashboard, how breadcrumbs
are left, how errors are grouped and how they relate to the original source.

To get set up, follow the instructions below. Don't forget to replace the placeholder
API token with your own!

1. Clone the repo and `cd` into this directory:
    ```sh
    git clone git@github.com:bugsnag/bugsnag-react.git
    cd bugsnag-react/example/
    ```
1. Install the dependencies (with either npm or yarn):
    ```sh
    npm i
    ```
    ```sh
    yarn
    ```
1. Replace the `API_KEY` placeholder in [app.js](app.js) with your actual API key.
1. Start a web server:
    ```sh
    npm start
    ```
1. View the example page which will (most likely) be served at: http://localhost:5000/
