// 指的是将一个接受多个参数的函数 变为 接受一个参数返回一个函数的固定形式，这样便于再次调用，例如f(1)(2)
function _curry(func) {
    return function curried(...args) {
        if(args.length >= func.length) {
            return func.apply(this, args)
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}

// TEST
function threeSum(a,b,c){
    return a+b+c
}

let curried = _curry(threeSum)
let result = curried(1)(2)(3)
console.log(result)