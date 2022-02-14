function deepClone(obj) {
  const isObj = val => {
    return typeof val === 'object' && val !== null
  }
  return (function inner(obj, hash = new WeakMap()) {
    if(!isObj(obj)) return obj
    if(hash.has(obj)) {
      return hash.get(obj)
    }
    const target = Array.isArray(obj) ? [] : {}
    hash.set(obj, target)
    Reflect.ownKeys(obj).forEach(key => {
      if(isObj(obj[key])) {
        target[key] = inner(obj[key], hash)
      } else {
        target[key] = obj[key]
      }
    })
    return target
  })(obj)
}

var obj1 = {
  a:1,
  b:{a:2}
}
var obj2 = deepClone(obj1)
obj1.a = 2
console.log(obj2)