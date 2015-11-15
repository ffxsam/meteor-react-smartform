SmartForm.Form = React.createClass({
  displayName: 'SmartForm',
  mixins: [ReactMeteorData],

  propTypes: {
    id: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },

  getMeteorData() {
    return {
      formData: FormState.get(`form.${this.props.id}`)
    }
  },

  componentDidMount() {
    FormDispatcher.dispatch('SMARTFORM_FORM_MOUNTED', {id: this.props.id});
  },

  handleSubmit(event) {
    event.preventDefault();
    document.activeElement.blur();

    FormDispatcher.dispatch('SMARTFORM_SUBMITTED', {
      formData: this.data.formData,
      submitFunction: this.props.onSubmit
    });
  },

  render() {
    return <form {...this.props} noValidate onSubmit={this.handleSubmit}>
      {this.props.children}
    </form>
  }
});
