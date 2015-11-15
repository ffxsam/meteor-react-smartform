FormState = new ReactiveState();

FormDispatcher = new MeteorFlux.Dispatcher();
FormDispatcher.addDispatchFilter(FormDispatcher._curatePayload);
FormDispatcher.addRegisterFilter(FormDispatcher._curateCallback);
