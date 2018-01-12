// www.bugsnag.com
// https://github.com/bugsnag/bugsnag-react/tree/master/example
//
// this example app demonstrates some of the basic syntax to get Bugsnag error reporting configured in your React code.
// ***********************************************************

// Note that Bugsnag was loaded with two CDN links in index.html, but it will not be active until initialized, either in the html or here in react.

// Initialize Bugsnag to begin tracking errors. Only an api key is required, but here are some other helpful configuration details:
const bugsnagClient = bugsnag({
    // get your own api key at bugsnag.com
    apiKey: 'aaa5f6d3250177a3ea6d5dd52c8d5b07',

    // if you track deploys or use source maps, make sure to set the correct version.
    appVersion: '1.2.3',

    // Bugsnag can track the number of “sessions” that happen in your application, and calculate a crash rate for each release. This defaults to false.
    autoCaptureSessions: true,

    // defines the release stage for all events that occur in this app.
    releaseStage: 'development',

    //  defines which release stages bugsnag should report. e.g. ignore staging errors.
    notifyReleaseStages: [ 'development', 'production'],

    // one of the most powerful tools in our library, beforeSend lets you evaluate, modify, add and remove data before sending the error to bugsnag. The actions here will be applied to *all* errors, handled and unhandled.
    beforeSend: function (report) {

      // the below downgrades handled exceptions sent with the generic "Error" class to info. In this example, it only affects the notification called at the very end of this app.js.
      if (report.errorClass === "Error" && report.severity === "warning") {
        report.severity = "info"
      }
      // note that if you return false from the beforeSend, this will cancel the entire error report.
    },

    // attached any user data you'd like to report.
    user: {
      name: "Katherine Johnson",
      email: "kj@nasa.gov",
      id: "0112358"
    },

    // add any custom attributes relevant to your app. Note that metadata can be added here, in a specific notify() or in a beforeSend.
    metaData: { company: {
      name: "Hogwarts School of Witchcraft and Wizardry"
      }
    },

    // because this is a demo app, below extends the default of 10 notifications per pageload. click away!
    maxEvents: 50
})


class BadButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { doARenderError: false }
  }
  throwError = () => {
    try {
      // potentially buggy code goes here
      //for this example, we're just throwing an error explcitly, but you do not need this syntax in your try clause.
      throw new Error('Bad Thing!')
    } catch (e) {
      console.log("a handled error was sent to our dashboard.")
      bugsnagClient.notify(e, {
        context: 'Don\'t worry - I handled it.'
      });
    }
  }
  triggerRenderError = () => {
    this.setState({ doARenderError: true })
  }
  render() {
    return (
      <div>
        <p>
          <button onClick={this.throwError}>Handled error</button>
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

const ErrorBoundary = bugsnagClient.use(bugsnag__react())
ReactDOM.render(
  <ErrorBoundary>
    <BadButton />
  </ErrorBoundary>,
  document.getElementById('root')
)

// below is the simplest notification syntax, akin to logging.
bugsnagClient.notify('End of file')
