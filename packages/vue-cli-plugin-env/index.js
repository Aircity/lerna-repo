const CopyWebpackPlugin = require('copy-webpack-plugin')
const Yaml = require('js-yaml')
const path = require('path')
const fs = require('fs')

module.exports = api => {
  api.chainWebpack(config => {
    config
      .plugin('copy')
      .use(
        new CopyWebpackPlugin([
          {
            from: 'env.yaml',
            to: 'env.js',
            transform (content) {
              const BUILD_ENV = process.env.BUILD_ENV || 'DEV'
              const config = Yaml.safeLoad(content)
              return (
                Object.keys(config)
                  .map(key => {
                    return `var ${key} = "${config[key][BUILD_ENV]}"`
                  })
                  .join(';\n') + ';'
              )
            }
          }
        ])
      )
      .end()
  })

  api.registerCommand('hooks', args => {
    const config = api.resolveChainableWebpackConfig()
    const finalConfig = config.toConfig()
    const dist = path.join(finalConfig.output.path, 'env.js')
    const yaml2Json = Yaml.safeLoad(
      fs.readFileSync(api.resolve('env.yaml'), 'utf8')
    )
    const text =
      Object.keys(yaml2Json)
        .map(key => {
          return `var ${key} = "${yaml2Json[key]['PRD']}"`
        })
        .join(';\n') + ';'

    try {
      fs.writeFileSync(dist, text, 'utf8')
      console.log('Compile Done!')
    } catch (e) {
      console.log(e)
    }
  })
}
