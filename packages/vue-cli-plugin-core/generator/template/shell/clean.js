const { updatePkg } = require('./utils')

updatePkg(config => {
  if (config.hasOwnProperty('@vue/cli-plugin-eslint')) {
    delete config['@vue/cli-plugin-eslint']
  }
  if (config.hasOwnProperty('@vue/eslint-config-standard')) {
    delete config['@vue/eslint-config-standard']
  }
  return config
})
