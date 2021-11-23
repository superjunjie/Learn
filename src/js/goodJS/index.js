/**
 * 判断对象数据类型
 */

function isType(type) {
  return function(target) {
    return `[object ${type}]` === Object.prototype.toString.call(target)
  }
}
const isArray = isType('Array')


/**
 * 循环实现map方法
 */
const selfMap = function(fn, context) {
  let arr = Array.prototype.slice.call(this)
  let mappedArr = Array()
  for(let i = 0; i < arr.length; i++) {
    if(!arr.hasOwnProperty(i)) continue
    mappedArr[i] = fn.call(context, arr[i], i, this)
  }
  return mappedArr
}

/**
 * reduce实现map方法
 */
const selfMap2 = function(fn, context) {
  let arr = Array.prototype.slice.call(this)
  return arr.reduce((pre, cur, index) => {
    return [...pre, fn.call(context, cur, index, this)]
  }, [])
}
Array.prototype.selfMap2 = selfMap2

/**
 * 循环实现filter方法
 */
const selfFilter = function(fn, context) {
  const arr = Array.prototype.slice.call(this)
  const filteredMap = []
  for(let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(arr[i])) continue
    fn.call(context, arr[i], i, this) && filteredMap.push(arr[i])
  }
  return filteredMap
}

/**
 * reduce实现filter方法
 */
const selfFilter2 = function(fn, context) {
  const arr = Array.prototype.slice.call(this)
  return arr.reduce((pre, cur, index) => {
    return fn.call(context, cur, index, this) ? [...pre, cur] : [...pre]
  }, [])
}
