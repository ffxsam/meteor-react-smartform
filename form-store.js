const Actions = {
  'SMARTFORM_FORM_MOUNTED': function ({id}) {
    FormState.set('form.activeId', id);
  },

  'SMARTFORM_INPUT_MOUNTED': function (action) {
    FormState.set(`form.${action.formId}`, {
      [action.id]: {
        valid: action.valid,
        value: ''
      }
    });
  },

  'SMARTFORM_INPUT_CHANGED': function (action) {
    FormState.set(`form.${action.formId}`, {
      [action.id]: {
        value: action.value
      }
    });
  }
};

Dispatcher.register(function (action) {
  Actions[action.type] && Actions[action.type](_.omit(action, 'type'));
});
