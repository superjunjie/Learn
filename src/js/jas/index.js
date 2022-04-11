class Jas {
  constructor() {
    this.uid = 1
    this.depMap = new Map()
    this.eventMap = new Map()
  }
  when(resources, callback, thisObj) {
    if (typeof resources === 'string') resources = [resources]
    const id = (this.uid++).toString(16)
    this.depMap.set(id, {
      waiting: resources.slice(0),
      callback: callback,
      thisObj: thisObj || null
    })
    for(let i = 0, len=resources.length; i<len; i++) {
      const res = resources[i]
      const list = this.eventMap.get(res) || []
      list.push(id)
      this.eventMap.set(res, list)
    }
    return this
  }
  trigger(resources) {
    if(!resources) return this
    if(typeof resources === 'string') resources = [resources]
    for(let i = 0, len=resources.length; i<len; i++) {
      const res = resources[i]
      if (!this.eventMap.has(res)) continue
      this._release(res, this.eventMap.get(res))
      this.eventMap.delete(res)
    }
    return this
  }
  _release(res, list) {
    for (let i=0, len=list.length; i<len; ++i){
      const uid = list[i],
        mapItem = this.depMap.get(uid),
        waiting = mapItem.waiting,
        pos = waiting.indexOf(res)
      waiting.splice(pos, 1)
      if (waiting.length === 0) { 
        setTimeout(() => {
          mapItem.callback.call(mapItem.thisObj)
        }, 0)
      }
    }
  }
}

const flow = new Jas()
flow
  .when(['A', 'B'], function () {
    console.log('A,B Done')
    fun()
  })
  .when(['B', 'C'], function () {
    console.log('B,C Done')
  })

function foo() {
  setTimeout(() => {
    flow.trigger('A')
  }, 500)
}

function bar() {
  setTimeout(() => {
    flow.trigger('B')
  }, 150)
}

function fun() {
  setTimeout(() => {
    flow.trigger('C')
  }, 500)
}

foo()
bar()
fun()