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
    this.props.onSubmit();
  },

  render() {
    return <form noValidate onSubmit={this.handleSubmit}>
      {this.props.children}
    </form>
  }
});
