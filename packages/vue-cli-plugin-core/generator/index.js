const { getVersion } = require('@vpm/cli-shared-utils')

module.exports = api => {
  api.render('./template')

  api.extendPackage({
    devDependencies: {
      'babel-plugin-import': getVersion('babel-plugin-import'),
      lodash: getVersion('lodash'),
      'date-fns': getVersion('date-fns')
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
