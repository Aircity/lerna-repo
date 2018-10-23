module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'lodash'
    ],
    [
      'import',
      {
        libraryName: 'date-fns',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'date-fns'
    ]
  ]
}
