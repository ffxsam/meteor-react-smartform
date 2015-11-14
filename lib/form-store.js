const Actions = {
  'SMARTFORM_FORM_MOUNTED': function ({id}) {
    FormState.set('form.activeId', id);
  },

  'SMARTFORM_INPUT_MOUNTED': function ({formId, id, valid}) {
    FormState.set(`form.${formId}`, {
      [id]: {
        errorReason: ERROR_NONE,
        valid: valid,
        value: ''
      }
    });
  },

  'SMARTFORM_INPUT_CHANGED': function ({formId, id, valid, value}) {
    FormState.set(`form.${formId}`, {
      [id]: {valid, value}
    });
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
