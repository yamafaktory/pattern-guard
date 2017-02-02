class Guards {
  constructor () {
    this.guardRegex = /[^=<>!']=[^=]/

    this.templateRegex = /[^|]\|[^|]/
  }

  buildPredicate (constants, guard) {
    // eslint-disable-next-line
    return new Function(
      '',
      [
        `const { ${this.destructureProps(constants)} } = ${JSON.stringify(constants)}`,
        `return ${guard}`
      ].join(';')
    )
  }

  destructureProps (constants) {
    return Object.keys(constants).join(',')
  }

  equal (constants) {
    const self = this

    // Inline guards need filtering.
    return template => template.raw[0]
      .split(this.templateRegex)
      .filter(g => g.trim() !== '')
      .map((g, i) => {
        // Remove break line and extract the guard.
        const parts = g.trim().split(this.guardRegex)

        return [
          parts[0],
          JSON.parse(`${parts[1].trim().replace(/'/g, '"')}`)
        ]
      })
      .find(g => self.buildPredicate(constants, g[0])())[1]
  }
}

module.exports = (c, t) => (new Guards()).equal(c, t)
