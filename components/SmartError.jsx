SmartError = React.createClass({
  displayName: 'SmartError',
  mixins: [ReactMeteorData],

  propTypes: {
    invalidMsg: React.PropTypes.string,
    linkedTo: React.PropTypes.string.isRequired,
    requiredMsg: React.PropTypes.string
  },

  getMeteorData() {
    const errorReason = FormState.get(
      `form.${this.props.linkedTo}.errorReason`);

    if (errorReason === ERROR_REQUIRED) {
      errorMessage = this.props.requiredMsg;
    } else if (errorReason === ERROR_INVALID || errorReason === ERROR_SUSPECT) {
      errorMessage = this.props.invalidMsg;
    } else {
      errorMessage = '';
    }

    return {errorMessage}
  },

  render() {
    return <span {...this.props}>
      {this.data.errorMessage}
    </span>
  }
});
