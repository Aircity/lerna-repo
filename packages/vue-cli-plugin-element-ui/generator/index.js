const { getVersion } = require('@vpm/cli-shared-utils')

module.exports = api => {
  // api.render('./template')
  api.extendPackage({
    dependencies: {
      'element-ui': getVersion('element-ui')
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
