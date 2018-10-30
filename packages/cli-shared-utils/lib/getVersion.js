const { execSync } = require('child_process')

const versionCache = {}

exports.getVersion = pkg => {
  if (versionCache[pkg]) {
    return versionCache[pkg]
  }
  const version = execSync(`npm view ${pkg} version`)
    .toString()
    .trim()
  versionCache[pkg] = version
  return `^${version}`
}
