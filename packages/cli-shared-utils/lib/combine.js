const globby = require('globby')
const defaultsDeep = require('lodash.defaultsDeep')
const Path = require('path')
const relative = Path.relative(__dirname, process.cwd())

module.combine = (config = {}) => {
  let paths = globby.sync('config/*.config.js') || []
  const ENV = process.env.NODE_ENV
  if (ENV !== 'development') {
    paths = paths.concat(globby.sync('config/*.dev.js'))
  }
  if (ENV !== 'production') {
    paths = paths.concat(globby.sync('config/*.prod.js'))
  }
  return paths.reduce((accumulator, path) => {
    let currentValue = require(`${Path.join(relative, path)}`)
    return defaultsDeep(accumulator, currentValue)
  }, config)
}
