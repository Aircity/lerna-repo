'use strict'

// customized for this use-case
const isObject = x =>
  typeof x === 'object' &&
  x !== null &&
  !(x instanceof RegExp) &&
  !(x instanceof Error) &&
  !(x instanceof Date)

const mapObj = function mapObj (obj, fn, opts, seen) {
  opts = Object.assign(
    {
      deep: false,
      target: {}
    },
    opts
  )

  seen = seen || new WeakMap()

  if (seen.has(obj)) {
    return seen.get(obj)
  }

  seen.set(obj, opts.target)

  const target = opts.target
  delete opts.target

  for (const key of Object.keys(obj)) {
    const val = obj[key]
    const res = fn(key, val, obj)
    let newVal = res[1]

    if (opts.deep && isObject(newVal)) {
      if (Array.isArray(newVal)) {
        newVal = newVal.map(x => (isObject(x) ? mapObj(x, fn, opts, seen) : x))
      } else {
        newVal = mapObj(newVal, fn, opts, seen)
      }
    }

    target[res[0]] = newVal
  }

  return target
}

function preserveCamelCase (str) {
  let isLastCharLower = false
  let isLastCharUpper = false
  let isLastLastCharUpper = false

  for (let i = 0; i < str.length; i++) {
    const c = str[i]

    if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
      str = str.substr(0, i) + '-' + str.substr(i)
      isLastCharLower = false
      isLastLastCharUpper = isLastCharUpper
      isLastCharUpper = true
      i++
    } else if (
      isLastCharUpper &&
      isLastLastCharUpper &&
      /[a-zA-Z]/.test(c) &&
      c.toLowerCase() === c
    ) {
      str = str.substr(0, i - 1) + '-' + str.substr(i - 1)
      isLastLastCharUpper = isLastCharUpper
      isLastCharUpper = false
      isLastCharLower = true
    } else {
      isLastCharLower = c.toLowerCase() === c
      isLastLastCharUpper = isLastCharUpper
      isLastCharUpper = c.toUpperCase() === c
    }
  }

  return str
}

const camelcase = function (str) {
  if (arguments.length > 1) {
    str = Array.from(arguments)
      .map(x => x.trim())
      .filter(x => x.length)
      .join('-')
  } else {
    str = str.trim()
  }

  if (str.length === 0) {
    return ''
  }

  if (str.length === 1) {
    return str.toLowerCase()
  }

  if (/^[a-z0-9]+$/.test(str)) {
    return str
  }

  const hasUpperCase = str !== str.toLowerCase()

  if (hasUpperCase) {
    str = preserveCamelCase(str)
  }

  return str
    .replace(/^[_.\- ]+/, '')
    .toLowerCase()
    .replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase())
}

class QuickLRU {
  constructor (opts) {
    opts = Object.assign({}, opts)

    if (!(opts.maxSize && opts.maxSize > 0)) {
      throw new TypeError('`maxSize` must be a number greater than 0')
    }

    this.maxSize = opts.maxSize
    this.cache = new Map()
    this.oldCache = new Map()
    this._size = 0
  }

  _set (key, value) {
    this.cache.set(key, value)
    this._size++

    if (this._size >= this.maxSize) {
      this._size = 0
      this.oldCache = this.cache
      this.cache = new Map()
    }
  }

  get (key) {
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }

    if (this.oldCache.has(key)) {
      const value = this.oldCache.get(key)
      this._set(key, value)
      return value
    }
  }

  set (key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value)
    } else {
      this._set(key, value)
    }

    return this
  }

  has (key) {
    return this.cache.has(key) || this.oldCache.has(key)
  }

  peek (key) {
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }

    if (this.oldCache.has(key)) {
      return this.oldCache.get(key)
    }
  }

  delete (key) {
    if (this.cache.delete(key)) {
      this._size--
    }

    this.oldCache.delete(key)
  }

  clear () {
    this.cache.clear()
    this.oldCache.clear()
    this._size = 0
  }

  * keys () {
    for (const el of this) {
      yield el[0]
    }
  }

  * values () {
    for (const el of this) {
      yield el[1]
    }
  }

  * [Symbol.iterator] () {
    for (const el of this.cache) {
      yield el
    }

    for (const el of this.oldCache) {
      if (!this.cache.has(el[0])) {
        yield el
      }
    }
  }

  get size () {
    let oldCacheSize = 0
    for (const el of this.oldCache) {
      if (!this.cache.has(el[0])) {
        oldCacheSize++
      }
    }

    return this._size + oldCacheSize
  }
}

const quickLru = QuickLRU

const has = (arr, key) =>
  arr.some(x => (typeof x === 'string' ? x === key : x.test(key)))
const cache = new quickLru({ maxSize: 100000 })

const camelCaseConvert = (input, opts) => {
  opts = Object.assign(
    {
      deep: false
    },
    opts
  )

  const exclude = opts.exclude

  return mapObj(
    input,
    (key, val) => {
      if (!(exclude && has(exclude, key))) {
        if (cache.has(key)) {
          key = cache.get(key)
        } else {
          const ret = camelcase(key)

          if (key.length < 100) {
            // Prevent abuse
            cache.set(key, ret)
          }

          key = ret
        }
      }

      return [key, val]
    },
    { deep: opts.deep }
  )
}

const main = (input, opts) => {
  if (Array.isArray(input)) {
    return Object.keys(input).map(key => camelCaseConvert(input[key], opts))
  }
  return camelCaseConvert(input, opts)
}

export default main
