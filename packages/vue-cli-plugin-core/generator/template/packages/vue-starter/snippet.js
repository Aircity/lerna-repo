import { format } from 'date-fns'
import { cloneDeep } from 'lodash'
import qs from 'qs'

Plugin.config = {}

Plugin.install = function (Vue) {
  Vue.prototype.$format = format
  Vue.prototype.$cloneDeep = cloneDeep
  Vue.prototype.$pack = (model, data) => {
    const item = {}
    Object.keys(model).forEach(key => {
      if (data.hasOwnProperty(key)) {
        item[key] = data[key]
      }
    })
    return item
  }
  Vue.prototype.$parse = str =>
    qs.parse(str, {
      ignoreQueryPrefix: true
    })
  Vue.prototype.$getParse = (str, key) => {
    const parse = qs.parse(str, {
      ignoreQueryPrefix: true
    })
    if (parse instanceof Object && parse.hasOwnProperty(key)) {
      return parse[key]
    }
    return ''
  }
  Vue.prototype.$stringify = parse =>
    qs.stringify(parse, {
      arrayFormat: 'brackets',
      addQueryPrefix: true
    })
  Vue.prototype.$union = (a, b) => Array.from(new Set([...a, ...b]))
  Vue.prototype.$sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  Vue.prototype.$getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / (1000 * 3600 * 24)
}

export default Plugin
