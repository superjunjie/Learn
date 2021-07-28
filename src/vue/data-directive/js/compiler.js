class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el
    this.compile(this.el)
  }
  compile(el) {
    let childNodes = [...el.childNodes]
    childNodes.forEach(node => {
      if(this.isTextNode(node)) {
          this.compileText(node)
      }else if(this.isElementNode(node)) {
          this.compileElement(node)
      }
      if(node.childNodes && node.childNodes.length) {
          this.compile(node)
      }
    })
  }
  compileText(node) {
    let regex = /\{\{(.+?)\}\}/
    let val = node.textContent
    if(regex.test(val)) {
      let key = RegExp.$1.trim()
      node.textContent = val.replace(regex, this.vm[key])
      new Watcher(this.vm, key, newValue => {
        node.nodeContext = newValue
      })
    }
  }
  compileElement(node) {
    ![...node.attributes].forEach(attr => {
      let attrName = attr.name
      if(this.isDirective(attrName)) {
          attrName = attrName.substr(2)
          let key = attr.value
          this.update(node, key, attrName)
      }
    })
  }
  update(node, key, attrName) {
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, key, this.vm[key])
  }
  textUpdater(node, key, value) {
    node.textContent = value
    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue
    })
  }
  modelUpdater(node, key, value) {
    node.value = value
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
  isDirective(attr) {
    return attr.startsWith('v-')
  }
  isElementNode(node) {
    return node.nodeType === 1
  }
  isTextNode(node) {
    return node.nodeType === 3
  }
}