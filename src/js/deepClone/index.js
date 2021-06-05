function isObj(val) {
    return typeof val === 'object' && val !== null
}

function deepClone(obj, hash = new WeakMap()) {
    if(!isObj(obj)) return
    if(hash.has(obj)) {
        return hash.get(obj)
    }
    let target = Array.isArray(obj) ? [] : {}
    hash.set(obj, target)
    Reflect.ownKeys(obj).forEach(key => {
        if(isObj(obj[key])) {
            target[key] = deepClone(obj[key], hash)
        } else {
            target[key] = obj[key]
        }
    })
    return target
}

var obj1 = {
    a:1,
    b:{a:2}
}
var obj2 = deepClone(obj1)
obj1.a = 2
console.log(obj2)