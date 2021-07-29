class Vue {
  constructor(options) {
    // get current options data default {}
    this.$options = options || {}
    // get el 
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // get data
    this.$data = this.getData(options.data)
    // call _proxyData handling attributes in data
    this._proxyData(this.$data)
    new Observer(this.$data)
    new Compiler(this)
  }
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if(newValue === data[key]) return
          data[key] = newValue
        }
      })
    })
  }
  getData(data) {
    if(typeof data === 'function') {
      return data()
    } else if (typeof data === 'object' && !Array.isArray(data)) {
      return data
    } else {
      return {}
    }
  }
}
