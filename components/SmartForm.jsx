SmartForm = React.createClass({
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
    Dispatcher.dispatch('SMARTFORM_FORM_MOUNTED', {id: this.props.id});
  },

  handleSubmit(event) {
    event.preventDefault();

    // TODO: prevent action from occurring if form is not valid
    this.props.onSubmit(0);
  },

  render() {
    return <form {...this.props} noValidate onSubmit={this.handleSubmit}>
      {this.props.children}
    </form>
  }
});
