# Meteor/React Smart Form

SmartForm is a package for Meteor/React that allows simple and easy form validation and error handling.

***NOTE: This package is currently pre-1.0 and should be considered not production-ready***

## Installation

    $ meteor add ffxsam:react-smartform

## Example Usage

```jsx
render() {
  return <div>
    <SmartForm.Form id="my-form" onSubmit={this.handleSubmit}>
      <SmartForm.Input
        id="name"
        formId="my-form" // links this element to #my-form
        required // field is required
        validateAs={/^[A-Za-z\s'.-]*$/} // validate field using regex
        weakValidation // failed regex match won't prevent form submission
      />
      
      <SmartForm.Error
        linkedTo="my-form.name" // error is linked to the field above
        invalidMsg="Name contains possibly invalid characters."
        requiredMsg="Name is required."
        onError={this.nameError} // you can have your own optional callback in case of error
      />
      
      <input type="submit" />
    </SmartForm.Form>
  </div>
}
```

The `SmartForm.Input` component will take care of any validation and, in case of errors, it will display your `invalidMsg` or `requiredMsg` depending on which error occurred. `SmartForm.Error` is a separate component so that it can be placed anywhere independently of its corresponding `SmartForm.Input`. Standard props you'd expect to be able to use such as `className` can be used on any of these components.

## Reference

### SmartForm.Form

#### Properties
* `id`: {String} **[required]** The id of the form
* `onSubmit`: {Function} **[required]** Function to call when user clicks the submit button. The callback will be called with two arguments:
	* `error`: {Object} Either `undefined` or an object of type `Meteor.Error` in the case of any form fields being invalid.
	* `formData`: {Object}  An object containing all of the input element IDs, with the following properties:
		* `errorReason`: {Symbol} Error code for this field. Either `SmartForm.ERROR_NONE`, `SmartForm.ERROR_REQUIRED`, `SmartForm.ERROR_INVALID`, or `SmartForm.ERROR_SUSPECT` (more on this one below).
		* `valid`: {Boolean} Indicates if the field is in a valid state.
		* `value`: {String} The current value of the input field.

### SmartForm.Input

#### Properties
* `formId`: {String} **[required]** The id of the form this input should be linked to
* `id`: {String} **[required]** The id of the input element
* `required`: {Boolean} Indicates whether this field is required
* `validateAs`: {RegEx/String} If you wish for this field to provide validation, you can either pass your own RegEx, or a string specifying the type of value being passed in. Currently accepted strings for `validateAs` are:
	* `"email"`
	* `"phone"` (US 10-digit phone number)
	* `"zip"` (US 5-digit ZIP)
* `weakValidation`: {Boolean} If this property is present, the field will only perform a weak validation. In other words, if the value in the field does not pass validation against the `validateAs` field, the `SmartForm.Error` component will still show its `invalidMsg` message, but the field will remain in a valid state, and `SmartForm.ERROR_SUSPECT` will be set as the field error instead of `SmartForm.ERROR_INVALID`. Weak validation is recommended for fields such as email address, where standards might change in the future (e.g. we didn't used to have domain suffixes greater than three characters!).

### SmartForm.Error

#### Properties
* `invalidMsg`: {String} The message to display when the field is invalid or suspect
* `linkedTo`: {String} **[required]** The form element the error should be linked to, in the format of `"form-id.element-id"`
* `onError`: {Function} A callback which is invoked in case of error, and is passed two arguments:
	* `errorReason`: {Symbol} The reason for the error. Either `SmartForm.ERROR_INVALID`, `SmartForm.ERROR_SUSPECT`, or `SmartForm.ERROR_REQUIRED`
	* `value`: {String} The value of the field

## Future Plans (contributions welcome!)
* The ability to fire a callback as soon as the user tabs out of a field (e.g. to check if a username is available)
* More input types (select, textarea, etc)
