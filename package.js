Package.describe({
  name: 'ffxsam:react-smartform',
  version: '0.9.0',
  summary: 'Smart form elements for React',
  git: 'https://github.com/ffxsam/meteor-react-smartform',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('react@0.14.1_1');
  api.use('react-meteor-data@0.2.3');
  api.use('meteorflux:dispatcher@1.2.0');
  api.use('meteorflux:reactive-state@1.1.1');
  api.addFiles([
    'lib/symbols.js',
    'lib/form-state.js',
    'lib/form-store.js',
    'components/SmartInput.jsx',
    'components/SmartCheckbox.jsx',
    'components/SmartSelect.jsx',
    'components/SmartError.jsx',
    'components/SmartForm.jsx'
  ], 'client');
  api.export('SmartForm', 'client');
});
