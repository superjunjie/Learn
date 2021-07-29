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
  compileText2(node, name, key, index) {
    debugger
    let regex = /\{\{(.+?)\}\}/

  }
  compileElement(node) {
    ![...node.attributes].forEach(attr => {
      let attrName = attr.name
      if(this.isDirective(attrName)) {
          attrName = attrName.substr(2)
          let key = attr.value
          node.removeAttribute(attr.name)
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
  forUpdater(node, key, value) {
    const parentNode = node.parentNode
    const attrs = [...node.attributes]
    const tagName = node.tagName
    parentNode.removeChild(node)
    const regex = /^for\s+([a-z]+)\s?[,]?\s?([a-z]+)?\s+in\s+([a-z]+)/
    const res = regex.exec(key)
    const a = res[1]
    const b = res[2]
    const c = res[3]
    const valList = c ? this.vm[c] : []
    let fragment = document.createDocumentFragment()
    for(let i = 0; i < valList.length; i++) {
      let node = document.createElement(tagName)
      attrs.forEach(item => {
        node.setAttribute(item.name, item.value)
      })
      this.compileText2(node, a, c, i)
      fragment.appendChild(node)
    }
    

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
