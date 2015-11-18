SmartForm.Input = React.createClass({
  validations: {
    email: /^[A-Za-z0-9-._+]+@[A-Za-z0-9-]+[.A-Za-z0-9-]*\.[A-Za-z]{2,}$/,
    phone: /^\(?\d{3}[)-]?\s*\d{3}(-|\s*)\d{4}$/,
    zip: /^\d{5}$/
  },

  propTypes: {
    formId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool,
    validateAs: React.PropTypes.any,
    weakValidation: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      required: false
    }
  },

  getInitialState() {
    return {
      errorReason: this.props.required ? SmartForm.ERROR_REQUIRED :
                   SmartForm.ERROR_NONE,
      valid: !this.props.required && true
    }
  },

  componentDidMount() {
    FormDispatcher.dispatch('SMARTFORM_INPUT_MOUNTED', {
      formId: this.props.formId,
      id: this.props.id,
      valid: this.state.valid
    });
  },

  handleBlurOrFocus(event) {
    // Call this, just in case the field was never typed in
    this.handleChange(event);

    FormDispatcher.dispatch('SMARTFORM_INPUT_BLURORFOCUS', {
      errorReason: this.state.errorReason,
      event: event.type,
      formId: this.props.formId,
      id: this.props.id
    });
  },

  handleChange({target}) {
    FormDispatcher.dispatch('SMARTFORM_INPUT_CHANGED', {
      callback: this.setState.bind(this),
      props: this.props,
      validations: this.validations,
      value: target.value
    });
  },

  render() {
    return <input
      onBlur={this.handleBlurOrFocus}
      onChange={this.handleChange}
      onFocus={this.handleBlurOrFocus}
      {...this.props}
    />
  }
});
