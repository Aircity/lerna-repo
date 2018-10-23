module.exports = api => {
  api.render('./template')

  api.extendPackage({
    devDependencies: {
      'babel-plugin-import': '^1.10.0',
      lodash: '^4.17.10',
      'date-fns': '^1.29.0'
    },
    scripts: {
      bootstrap: 'node ./shell/clean.js && yarn install'
    }
  })

  api.onCreateComplete(() => {
    // Linting the generated files
    if (api.hasPlugin('eslint')) {
      // Lint generated/modified files
      try {
        const lint = require('@vue/cli-plugin-eslint/lint')
        lint({ silent: true }, api)
      } catch (e) {
        // No ESLint vue-cli plugin
      }
    }
  })
}
