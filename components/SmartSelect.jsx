SmartForm.Select = React.createClass({
  validations: [], // mixin?

  propTypes: {
    formId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      valid: true, // depends on stuff we can't access here, check below
      value: ''
    }
  },

  componentDidMount() {
    const options = this.props.children;
    const index = this.refs.selectItem.selectedIndex;
    const currValue = options[index].props.value;

    this.setState({
      valid: !(currValue === '' && this.props.required),
      value: currValue
    }, () => {
      FormDispatcher.dispatch('SMARTFORM_INPUT_MOUNTED', {
        formId: this.props.formId,
        id: this.props.id,
        valid: this.state.valid,
        value: this.state.value
      });
    });
  },

  handleChange({target}) {
    this.setState({value: target.value});

    FormDispatcher.dispatch('SMARTFORM_SELECT_CHANGED', {
      callback: this.setState.bind(this),
      props: this.props,
      validations: this.validations,
      value: target.value
    });
  },

  render() {
    return <select
      ref="selectItem"
      id={this.props.id}
      onChange={this.handleChange}
      {...this.props}
    >
      {this.props.children}
    </select>
  }
});
