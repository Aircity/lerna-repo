const CopyWebpackPlugin = require('copy-webpack-plugin')
const Yaml = require('js-yaml')

module.exports = api => {
  api.chainWebpack(config => {
    config.plugin('copy')
      .use(new CopyWebpackPlugin([
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
      ]))
      .end()
  })
}
