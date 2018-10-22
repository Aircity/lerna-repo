module.exports = api => {
  api.extendPackage({
    devDependencies: {
      "cross-env": "^5.2.0"
    },    
    scripts: {
      "build:qa": "cross-env BUILD_ENV=QA vue-cli-service build",
      "build:prd": "cross-env BUILD_ENV=PRD vue-cli-service build"
    }
  })
  api.render('./template')
}
