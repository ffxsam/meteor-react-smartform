const Actions = {
  SMARTFORM_FORM_MOUNTED({id}) {
    FormState.set('form.activeId', id);
    console.log(SMARTFORM_FORM_MOUNTED);
  },

  SMARTFORM_INPUT_MOUNTED(action) {
    FormState.set(`form.${action.formId}`, {
      [action.id]: {
        valid: action.valid,
        value: ''
      }
    });
  },

  SMARTFORM_INPUT_CHANGED(action) {
    FormState.set(`form.${action.formId}`, {
      [action.id]: {
        value: action.value
      }
    });
  },

  SMARTFORM_INPUT_BLURORFOCUS(action) {
    const formError = `form.${action.formId}.${action.id}.errorReason`;

    if (action.valid || action.event === 'focus') {
      FormState.set(formError, '');
    } else {
      console.log(action);

      FormState.set(formError, action.errorReason);
    }
  }
};

Dispatcher.register(function (action) {
  Actions[action.type] && Actions[action.type](_.omit(action, 'type'));
});
