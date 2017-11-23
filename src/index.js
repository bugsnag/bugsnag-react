const createPlugin = module.exports.createPlugin = (React) => {
  let c = null
  let R = null
  return {
    init: (client, BugsnagReport) => {
      c = client
      R = BugsnagReport
    },
    createErrorBoundary: () => {
      class ErrorBoundary extends React.Component {
        componentDidCatch (error, info) {
          const handledState = { severity: 'error', unhandled: true, handledState: { type: 'unhandledException' } }
          const report = new R(error.name, error.message, R.getStacktrace(error), handledState)
          report.updateMetaData('react', info)
          c.notify(report)
        }
        render () {
          return this.props.children
        }
      }
      return ErrorBoundary
    }
  }
}

module.exports = createPlugin(window.React)
