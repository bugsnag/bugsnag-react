# Changelog

<!-- {entry_placeholder} -->

## 1.1.1 (2018-04-06)

### Fixed
- In the previous release (v1.1.0) the dist directory was missing from the npm package. This version ensures the built assets in dist do not get added to the repo, but do get added to the npm package.


## 1.1.0 (2018-04-06)

### Added
- `FallbackComponent` prop added to `<ErrorBoundary />`. This can be used to render a component after an error has been caught by the error boundary component. (#14)
- `beforeSend` prop added to `<ErrorBoundary />`. This can be used to add data to, modify or prevent the sending of an error report. (#15)

### Changed
- The test runner was switched to [Jest](https://facebook.github.io/jest/)


## 1.0.1 (2018-02-23)

### Added
- Default export for various module types

## 1.0.0 (2017-12-04)

Initial release
