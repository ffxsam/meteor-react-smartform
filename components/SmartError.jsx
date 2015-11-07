SmartError = React.createClass({
  displayName: 'SmartError',
  mixins: [ReactMeteorData],

  propTypes: {
    invalidMsg: React.PropTypes.string,
    linkedTo: React.PropTypes.string.isRequired,
    requiredMsg: React.PropTypes.string
  },

  getMeteorData() {
    return {
      errorMessage: FormState.get(`form.${this.props.linkedTo}.error`)
    }
  },

  render() {
    return <span>
      {this.data.errorMessage}
    </span>
  }
});
