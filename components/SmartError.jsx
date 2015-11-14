SmartForm.Error = React.createClass({
  displayName: 'SmartError',
  mixins: [ReactMeteorData],

  propTypes: {
    invalidMsg: React.PropTypes.string,
    linkedTo: React.PropTypes.string.isRequired,
    onError: React.PropTypes.func,
    requiredMsg: React.PropTypes.string
  },

  getMeteorData() {
    const formState = FormState.get(`form.${this.props.linkedTo}`);
    const errorReason = formState && formState.errorReason;

    if (errorReason === SmartForm.ERROR_REQUIRED) {
      errorMessage = this.props.requiredMsg;
    } else if (errorReason === SmartForm.ERROR_INVALID ||
               errorReason === SmartForm.ERROR_SUSPECT) {
      errorMessage = this.props.invalidMsg;
    } else {
      errorMessage = '';
    }

    if (errorReason && errorReason !== SmartForm.ERROR_NONE &&
        this.props.onError) {
      this.props.onError(errorReason, formState.value);
    }

    return {errorMessage}
  },

  render() {
    return <span {...this.props}>
      {this.data.errorMessage}
    </span>
  }
});
