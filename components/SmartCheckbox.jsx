SmartForm.Checkbox = React.createClass({
  validations: [], // mixin?

  propTypes: {
    formId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      valid: true, // checkboxes can't really be invalid
      value: this.props.defaultChecked || false
    }
  },

  componentDidMount() { // mixin?
    FormDispatcher.dispatch('SMARTFORM_INPUT_MOUNTED', {
      formId: this.props.formId,
      id: this.props.id,
      valid: this.state.valid,
      value: this.state.value
    });
  },

  handleChange({target}) {
    this.setState({value: target.checked});

    FormDispatcher.dispatch('SMARTFORM_INPUT_CHANGED', {
      callback: this.setState.bind(this),
      props: this.props,
      validations: this.validations,
      value: target.checked
    });
  },

  render() {
    return <input
      type="checkbox"
      id={this.props.id}
      onChange={this.handleChange}
      {...this.props}
    />
  }
});
