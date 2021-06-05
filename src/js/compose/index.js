/**
 * 实现一个组合函数
 */

function compose(...fns) {
    if(!fns.length) return v => v
    if(fns.length === 1) return fn[0]
    return fns.reduce(
        (pre, cur) => 
            (...args) => 
                pre(cur(...args))
    )
}


function fn1(x) {
    return x + 1
  }
  function fn2(x) {
    return x - 2
  }
  function fn3(x) {
    return x * 3
  }
  function fn4(x) {
    return x / 4
  }

  const fun = compose(fn1, fn2, fn3, fn4)
  console.log(fun(1))