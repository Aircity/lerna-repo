const Plugin = {}

Plugin.install = function (Vue, options) {
  if (!options) {
    console.error('options is required!')
    return false
  }
  const { message, notification, Modal } = options
  if (message) {
    Vue.prototype.$message = message
  }
  if (notification) {
    Vue.prototype.$notification = notification
  }
  if (Modal) {
    Vue.prototype.$info = Modal.info
    Vue.prototype.$success = Modal.success
    Vue.prototype.$error = Modal.error
    Vue.prototype.$warning = Modal.warning
    Vue.prototype.$confirm = Modal.confirm
  }
  Object.keys(options).forEach(key => {
    const component = options[key]
    if (component.name) Vue.component(key, component)
  })
}

export default Plugin
