SmartForm.Form = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    id: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },

  getMeteorData() {
    let camelCaseId = '';

    if (this.props.id) {
      camelCaseId = CaseConv.convert(this.props.id, 'aB');
    }

    return {
      formData: FormState.get(`form.${camelCaseId}`)
    }
  },

  componentDidMount() {
    FormDispatcher.dispatch('SMARTFORM_FORM_MOUNTED', {
      id: CaseConv.convert(this.props.id, 'aB')
    });
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
