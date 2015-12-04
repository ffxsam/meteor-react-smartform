const Actions = {
  helpers: {},

  'SMARTFORM_FORM_MOUNTED': function ({id}) {
    FormState.set('form.activeId', id);
  },

  'SMARTFORM_INPUT_MOUNTED': function ({formId, id, valid, value}) {
    const camelCaseFormId = CaseConv.convert(formId, 'aB');
    const camelCaseId = CaseConv.convert(id, 'aB');

    FormState.set(`form.${camelCaseFormId}`, {
      [camelCaseId]: {
        errorReason: SmartForm.ERROR_NONE,
        valid,
        value
      }
    });
  },

  'SMARTFORM_INPUT_CHANGED': function ({callback, props, validations, value}) {
    const camelCaseFormId = CaseConv.convert(props.formId, 'aB');
    const camelCaseId = CaseConv.convert(props.id, 'aB');
    let valid = true, errorReason = SmartForm.ERROR_NONE;

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

    FormState.set(`form.${camelCaseFormId}`, {
      [camelCaseId]: {valid, value}
    });

    callback({errorReason, valid});
  },

  'SMARTFORM_SELECT_CHANGED': function ({callback, props, validations, value}) {
    const camelCaseFormId = CaseConv.convert(props.formId, 'aB');
    const camelCaseId = CaseConv.convert(props.id, 'aB');
    let valid = true, errorReason = SmartForm.ERROR_NONE;

    if (props.required && value === '') {
      valid = false;
      errorReason = SmartForm.ERROR_REQUIRED;
    }

    FormState.set(`form.${camelCaseFormId}`, {
      [camelCaseId]: {errorReason, valid, value}
    });

    callback({errorReason, valid});
  },

  'SMARTFORM_INPUT_BLURORFOCUS': function ({errorReason, event, formId, id}) {
    const camelCaseFormId = CaseConv.convert(formId, 'aB');
    const camelCaseId = CaseConv.convert(id, 'aB');
    const formError = `form.${camelCaseFormId}.${camelCaseId}.errorReason`;

    FormState.set(formError,
      event === 'focus' ? SmartForm.ERROR_NONE : errorReason);
  },

  'SMARTFORM_SUBMITTED': function ({formData, submitFunction}) {
    if (_.findWhere(formData, {valid: false})) {
      submitFunction(
        new Meteor.Error('form-error', 'There are invalid fields in this form'),
        formData
      );
    } else {
      submitFunction(undefined, formData);
    }
  }
};

FormDispatcher.register(function (action) {
  Actions[action.type] && Actions[action.type](_.omit(action, 'type'));
});
