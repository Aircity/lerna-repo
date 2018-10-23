module.exports = api => {
  const utils = require('./utils')(api)
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

    let plugins = config.plugins || []

    if (
      plugins.findIndex(
        value => JSON.stringify(value) === JSON.stringify(esLodash)
      ) < 0
    ) {
      plugins.push(esLodash)
    }

    if (
      plugins.findIndex(
        value => JSON.stringify(value) === JSON.stringify(esDateFns)
      ) < 0
    ) {
      plugins.push(esDateFns)
    }

    config.plugins = plugins
    return config
  })
}
