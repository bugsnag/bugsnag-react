class BadButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { doARenderError: false }
  }
  throwError = () => {
    throw new Error('doh!')
  }
  triggerRenderError = () => {
    this.setState({ doARenderError: true })
  }
  render() {
    return (
      <div>
        <p>
          <button onClick={this.throwError}>Throw an error</button>
        </p>
        <p>
          <button onClick={this.triggerRenderError}>Trigger a render error</button>
          {this.state.doARenderError
            ? <span>{ this.state.doARenderError.non.existent.property }</span>
            : null
          }
        </p>
      </div>
    )
  }
}

const ErrorBoundary = bugsnag__react.createErrorBoundary()
ReactDOM.render(
  <ErrorBoundary>
    <BadButton />
  </ErrorBoundary>,
  document.getElementById('root')
)
