const Actions = {
  'SMARTFORM_FORM_MOUNTED': function ({id}) {
    FormState.set('form.activeId', id);
  },

  'SMARTFORM_INPUT_MOUNTED': function (action) {
    FormState.set(`form.${action.formId}`, {
      [action.id]: {
        errorReason: ERROR_NONE,
        valid: action.valid,
        value: ''
      }
    });
  },

  'SMARTFORM_INPUT_CHANGED': function (action) {
    FormState.set(`form.${action.formId}`, {
      [action.id]: {
        valid: action.valid,
        value: action.value
      }
    });
  },

  'SMARTFORM_INPUT_BLURORFOCUS': function (action) {
    const formError = `form.${action.formId}.${action.id}.errorReason`;

    FormState.set(formError,
      action.event === 'focus' ? null : action.errorReason);
  }
};

Dispatcher.register(function (action) {
  Actions[action.type] && Actions[action.type](_.omit(action, 'type'));
});
