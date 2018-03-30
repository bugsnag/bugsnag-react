(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bugsnag__react = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function () {
  var React = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.React;

  if (!React) throw new Error('cannot find React');

  return {
    init: function (client) {
      var ErrorBoundary = function (_React$Component) {
        _inherits(ErrorBoundary, _React$Component);

        function ErrorBoundary() {
          _classCallCheck(this, ErrorBoundary);

          return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        ErrorBoundary.prototype.componentDidCatch = function componentDidCatch(error, info) {
          var BugsnagReport = client.BugsnagReport;
          var handledState = { severity: 'error', unhandled: true, severityReason: { type: 'unhandledException' } };
          var report = new BugsnagReport(error.name, error.message, BugsnagReport.getStacktrace(error), handledState);
          if (info && info.componentStack) info.componentStack = formatComponentStack(info.componentStack);
          report.updateMetaData('react', info);
          client.notify(report);
        };

        ErrorBoundary.prototype.render = function render() {
          return this.props.children;
        };

        return ErrorBoundary;
      }(React.Component);

      return ErrorBoundary;
    }
  };
};

var formatComponentStack = function (str) {
  var lines = str.split(/\s*\n\s*/g);
  var ret = '';
  for (var line = 0, len = lines.length; line < len; line++) {
    if (lines[line].length) ret += '' + (ret.length ? '\n' : '') + lines[line];
  }
  return ret;
};

module.exports.formatComponentStack = formatComponentStack;
module.exports['default'] = module.exports;

},{}]},{},[1])(1)
});