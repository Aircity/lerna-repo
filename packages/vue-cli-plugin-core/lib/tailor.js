const globby = require('globby')
const defaultsDeep = require('lodash.defaultsDeep')
const Path = require('path')
const relative = Path.relative(__dirname, process.cwd())

module.exports = (config = {}) => {
  const paths = globby.sync('config/*.config.js')
  return paths.reduce((accumulator, path) => {
    let currentValue = require(`${Path.join(relative, path)}`)
    return defaultsDeep(accumulator, currentValue)
  }, config)
}
