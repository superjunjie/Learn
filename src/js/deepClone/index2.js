function deepClone(obj, hash = new WeakMap()) {
    if (hash.has(obj)) {
        return obj
    }
    let res = null
    const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error]

    if (reference.includes(obj?.constructor)) {
        res = new obj.constructor(obj)
    } else if (Array.isArray(obj)) {
        res = []
        obj.forEach((e, i) => {
            res[i] = deepClone(e)
        })
    } else if (typeof obj === "Object" && typeof obj !== null) {
        res = {}
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                res[key] = deepClone(obj[key])
            }
        }
    } else {
        res = obj
    }
    hash.set(obj, res)
    return res
}

var obj1 = {
  a:1,
  b:{a:2}
}
var obj2 = deepClone(obj1)
obj1.a = 2
console.log(obj2)