module.exports = api => {
  const utils = require('./utils')(api)

  api.render('./template')

  api.extendPackage({
    devDependencies: {
      'babel-plugin-import': '^1.9.0',
      lodash: '^4.17.10',
      'date-fns': '^1.29.0'
    }
  })

  api.onCreateComplete(() => {
    utils.updateBabelConfig(config => {
      const esLodash = [
        'import',
        {
          libraryName: 'lodash',
          libraryDirectory: '',
          camel2DashComponentName: false // default: true
        },
        'lodash'
      ]
      const esDateFns = [
        'import',
        {
          libraryName: 'date-fns',
          libraryDirectory: '',
          camel2DashComponentName: false // default: true
        },
        'date-fns'
      ]
      config.plugins = config.plugins || []
      config.plugins.push(esLodash)
      config.plugins.push(esDateFns)
      return config
    })
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
