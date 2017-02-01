const vm = require('vm')

module.exports = class Guards {
  constructor () {
    this.guardRegex = /[^=<>!']=[^=]/

    this.templateRegex = /[^|]\|[^|]/

    this.optionsVM = {
      displayErrors: true,
      filename: 'guards'
    }
  }

  getStack () {
    const origin = Error.prepareStackTrace
    const error = new Error()

    Error.prepareStackTrace = (_, stack) => stack

    Error.captureStackTrace(error, this.getStack)

    const stack = error.stack

    Error.prepareStackTrace = origin

    // V8 stack traces.
    return stack
  }

  equal (constants) {
    return template => {
      const guards = this.parse(template.raw[0])
      const lineOffset = this.getStack()[1].getLineNumber()
      const firstTruthyGuard = (
        guards.map(
          g => this.runInVM(g.eval, constants, lineOffset)
        )
      ).findIndex(a => a === true)

      // First truthy guard is returned, like in Haskell.
      return guards[firstTruthyGuard].result
    }
  }

  error (e) {
    console.error(e)

    process.exit(1)
  }

  parse (template) {
    // Inline guards need filtering.
    return template
      .split(this.templateRegex)
      .filter(g => g.trim() !== '')
      .map((g, i) => {
        // Remove break line and extract the guard.
        const parts = g.trim().split(this.guardRegex)

        return {
          eval: parts[0],
          result: JSON.parse(`${parts[1].trim().replace(/'/g, '"')}`)
        }
      })
  }

  runInVM (code, sandbox, lineOffset) {
    const options = Object.assign({}, this.optionsVM, { lineOffset: lineOffset })

    return vm.runInNewContext(code, sandbox, options)
  }
}
