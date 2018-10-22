class ExtendableError {
  constructor (message) {
    this.message = message
    this.stack = new Error().stack
    this.name = this.constructor.name
  }
}

export { ExtendableError }
