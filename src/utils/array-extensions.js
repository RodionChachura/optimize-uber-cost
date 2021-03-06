import _ from 'lodash'

/*eslint no-extend-native: */
const extensions = [
  [
    'last_',
    function() {
      return this.length > 0 ? this[this.length - 1] : undefined
    }
  ],
  [
    'take_',
    function(property) {
      return this.map(el => el[property])
    }
  ],
  [
    'some_',
    function(method, ...args) {
      return this.some(el => el[method](...args))
    }
  ],
  [
    'every_',
    function(method, ...args) {
      return this.every(el => el[method](...args))
    }
  ],
  [
    'map_',
    function(method, ...args) {
      return this.map(el => el[method](...args))
    }
  ],
  [
    'find_',
    function(method, ...args) {
      return this.find(el => el[method](...args))
    }
  ],
  [
    'without_',
    function(...args) {
      return this.reduce(
        (acc, el) => (args.includes(el) ? acc : [...acc, el]),
        []
      )
    }
  ],
  [
    'flatten_',
    function() {
      return this.reduce((acc, el) => [...acc, ...el], [])
    }
  ],
  [
    'sum_',
    function() {
      return this.reduce((acc, el) => acc + el, 0)
    }
  ],
  [
    'empty_',
    function() {
      return this.length === 0
    }
  ],
  [
    'withoutLast_',
    function() {
      return this.slice(0, this.length - 1)
    }
  ],
  [
    'previous_',
    function(item) {
      if (this.length < 2) return

      const index = this.indexOf(item)
      if (index < 0) return

      return index === 0 ? this.last_() : this[index - 1]
    }
  ],
  [
    'next_',
    function(item) {
      if (this.length < 2) return

      const index = this.indexOf(item)
      if (index < 0) return

      return index === this.length - 1 ? this[0] : this[index + 1]
    }
  ],
  [
    'sameAs_',
    function(other) {
      return _.isEqual(this.sort(), other.sort())
    }
  ],
  [
    'pushIf_',
    function(condition, item) {
      return condition ? [...this, item] : this
    }
  ]
]
for (const [name, func] of extensions) {
  Array.prototype[name] = func
}

export default {}
