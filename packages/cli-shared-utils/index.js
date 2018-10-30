;['combine', 'getVersion'].forEach(m => {
  Object.assign(exports, require(`./lib/${m}`))
})
