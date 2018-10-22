const fs = require('fs')
const path = require('path')

module.exports = {
  updatePkg (callback) {
    let config, configPath

    const pkgPath = path.resolve(process.cwd(), 'package.json')

    if (fs.existsSync(pkgPath)) {
      configPath = pkgPath
      config = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf8' }))
      config.devDependencies = callback(config.devDependencies || {})
    }

    if (configPath) {
      fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}`, {
        encoding: 'utf8'
      })
    }
  }
}
