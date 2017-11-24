const createPlugin = module.exports.createPlugin = (React) => {
  React = React || window.React
  let client = null
  let BugsnagReport = null
  return {
    init: (c, R) => {
      if (!React) return client._logger.warn('react plugin did not receive a reference to React')
      client = c
      BugsnagReport = R
    },
    createErrorBoundary: () => {
      class ErrorBoundary extends React.Component {
        componentDidCatch (error, info) {
          const handledState = { severity: 'error', unhandled: true, handledState: { type: 'unhandledException' } }
          const report = new BugsnagReport(error.name, error.message, BugsnagReport.getStacktrace(error), handledState)
          if (info && info.componentStack) info.componentStack = formatComponentStack(info.componentStack)
          report.updateMetaData('react', info)
          client.notify(report)
        }
        render () {
          return this.props.children
        }
      }
      return ErrorBoundary
    }
  }
}

const formatComponentStack = str => {
  const lines = str.split(/\s*\n\s*/g)
  let ret = ''
  for (let line = 0, len = lines.length; line < len; line++) {
    if (lines[line].length) ret += `${ret.length ? '\n' : ''}${lines[line]}`
  }
  return ret
}

module.exports = createPlugin(window.React)
module.exports.formatComponentStack = formatComponentStack
