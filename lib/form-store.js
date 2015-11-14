const Actions = {
  helpers: {

  },

  'SMARTFORM_FORM_MOUNTED': function ({id}) {
    FormState.set('form.activeId', id);
  },

  'SMARTFORM_INPUT_MOUNTED': function ({formId, id, valid}) {
    FormState.set(`form.${formId}`, {
      [id]: {
        errorReason: SmartForm.ERROR_NONE,
        valid: valid,
        value: ''
      }
    });
  },

  'SMARTFORM_INPUT_CHANGED': function ({callback, props, validations, value}) {
    let valid = true, errorReason;

    // Is the form input valid?
    if (props.required && value === '') {
      // Required field is blank
      valid = false;
      errorReason = SmartForm.ERROR_REQUIRED;
    } else if (props.validateAs && value !== '') {
      let regexMatch;

      if (typeof props.validateAs === 'string') {
        regexMatch = value.match(validations[props.validateAs]);
      } else {
        regexMatch = value.match(props.validateAs);
      }

      if (!regexMatch) {
        /* Field doesn't pass regex validation. If it's weak validation, don't
         be a hard error - set valid to true
         */
        if (props.weakValidation) {
          valid = true;
          errorReason = SmartForm.ERROR_SUSPECT;
        } else {
          valid = false;
          errorReason = SmartForm.ERROR_INVALID;
        }
      }
    }

    FormState.set(`form.${props.formId}`, {
      [props.id]: {valid, value}
    });

    callback({errorReason, valid});
  },

  'SMARTFORM_INPUT_BLURORFOCUS': function ({errorReason, event, formId, id}) {
    const formError = `form.${formId}.${id}.errorReason`;

    FormState.set(formError,
      event === 'focus' ? null : errorReason);
  },

  'SMARTFORM_SUBMITTED': function (action) {

  }
};

Dispatcher.register(function (action) {
  Actions[action.type] && Actions[action.type](_.omit(action, 'type'));
});
