function _curry(fn) {
  return function curried(...args) {
    if(args.length >= fn.length) {
      return fn.apply(this, args)
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