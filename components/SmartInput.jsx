SmartInput = React.createClass({
  displayName: 'SmartInput',

  validations: {
    email: /^[A-Za-z0-9-._+]+@[A-Za-z0-9-]+[.A-Za-z0-9-]*\.[A-Za-z]{2,}$/,
    phone: /^\D*1?\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*x?(\d*)$/,
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
      errorReason: '',
      valid: !this.props.required && true
    }
  },

  componentDidMount() {
    Dispatcher.dispatch('SMARTFORM_INPUT_MOUNTED', {
      formId: this.props.formId,
      id: this.props.id,
      valid: this.state.valid
    });
  },

  handleBlurOrFocus(event) {
    // Call this, just in case the field was never typed in
    this.handleChange(event);

    Dispatcher.dispatch('SMARTFORM_INPUT_BLURORFOCUS', {
      errorReason: this.state.errorReason,
      event: event.type,
      formId: this.props.formId,
      id: this.props.id
    });
  },

  handleChange({target}) {
    let valid = true, errorReason;
    const value = this.refs.input.value;

    // Is the form input valid?
    if (this.props.required && target.value === '') {
      // Required field is blank
      valid = false;
      errorReason = ERROR_REQUIRED;
    } else if (this.props.validateAs && value !== '') {
      let regexMatch;

      if (typeof this.props.validateAs === 'string') {
        regexMatch = value.match(this.validations[this.props.validateAs]);
      } else {
        regexMatch = value.match(this.props.validateAs);
      }

      if (!regexMatch) {
        /* Field doesn't pass regex validation. If it's weak validation, don't
         be a hard error - set valid to true
         */
        if (this.props.weakValidation) {
          valid = true;
          errorReason = ERROR_SUSPECT;
        } else {
          valid = false;
          errorReason = ERROR_INVALID;
        }
      }
    }

    this.setState({errorReason, valid});

    Dispatcher.dispatch('SMARTFORM_INPUT_CHANGED', {
      formId: this.props.formId,
      id: this.props.id,
      valid,
      value: target.value
    });
  },

  render() {
    return <input
      onBlur={this.handleBlurOrFocus}
      onChange={this.handleChange}
      onFocus={this.handleBlurOrFocus}
      ref="input"
      {...this.props}
    />
  }
});
