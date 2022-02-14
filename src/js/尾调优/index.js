/**
 * 尾调用优化
 * @description 尾调用就是一个函数A出现在另一个函数B“结尾”处的函数调用
 * 这样在函数A调用函数后，另一个函数B的栈帧就会销毁，通常用于递归优化
 * 支持TOC的引擎会自己判断函数A是否会在B的结尾调用，来决定是否销毁B的栈帧
 */


/**
 * 
 * @param {*} n 
 * @returns 计算n!递归调用
 */
function factorial(n) {
  if(n < 2) return n
  let res = n * factorial(n - 1)
  return res
}

/**
 * 
 * @param {*} n 
 * @description 计算n!使用尾递归
 */
function factorial2(n) {
  function fact(n, res) {
    if(n < 2) return res
    return fact(n - 1, n * res)
  }
  return fact(n, 1)
}

/**
 * 
 * @param {*} n 
 * @returns 斐波那契数的第n个值
 * @description 斐波那契数列
 */
function fibonacci(n) {
  if(n === 1 || n === 0) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}


/**
 * 
 * @param {*} n 
 * @returns 斐波那契数的第n个值
 * @description 斐波那契数列使用尾递归
 */
function fibonacci2(n) {
  function inner(n, current, next) {
    if(n === 1) return next
    if(n === 0) return 0
    return inner(n - 1, next, current + next)
  }
  return inner(n, 0, 1)
}
console.log(fibonacci2(10))