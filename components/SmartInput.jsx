SmartInput = React.createClass({
  displayName: 'SmartInput',

  propTypes: {
    formId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      _smart: true,
      required: false
    }
  },

  getInitialState() {
    return {
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

  handleBlur({target}) {

  },

  handleChange({target}) {
    let valid = true;

    // Is the form input valid?
    if (this.props.required && target.value === '') {
      valid = false;
    }

    this.setState({valid});
    Dispatcher.dispatch('SMARTFORM_INPUT_CHANGED', {
      formId: this.props.formId,
      id: this.props.id,
      valid,
      value: target.value
    });
  },

  render() {
    return <input
      onBlur={this.handleBlur}
      onChange={this.handleChange}
      ref="input"
      {...this.props}
    />
  }
});
