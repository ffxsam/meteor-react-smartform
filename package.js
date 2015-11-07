Package.describe({
  name: 'ffxsam:smartform',
  version: '0.1.0',
  summary: 'Smart form elements for React',
  git: 'https://github.com/ffxsam/meteor-react-smartform',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('react');
  api.use('react-meteor-data');
  api.use('meteorflux:dispatcher@1.2.0');
  api.use('meteorflux:reactive-state@1.1.1');
  api.addFiles([
    'lib/form-state.js',
    'form-store.js',
    'components/SmartInput.jsx',
    'components/SmartError.jsx',
    'components/SmartForm.jsx'
  ], 'client');
  api.export(['SmartInput', 'SmartError', 'SmartForm'], 'client');
});
