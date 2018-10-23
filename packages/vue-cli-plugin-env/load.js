const Yaml = require('js-yaml')
const Path = require('path')
const fs = require('fs')
const relative = Path.relative(__dirname, process.cwd())

let doc = {}
try {
  doc = Yaml.safeLoad(
    fs.readFileSync(Path.join(relative, 'env.yaml'), 'utf8')
  )
  console.log(doc)
} catch (e) {
  console.log(e)
}

module.exports = doc
