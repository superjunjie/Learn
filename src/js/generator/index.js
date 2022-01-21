// function *foo() {
//   var x = yield 2
//   z++
//   var y = yield (x * z)
//   console.log(x, y, z)
// }

// var z = 1
// var it1 = foo()
// var it2 = foo()

// var val1 = it1.next().value
// var val2 = it2.next().value
// console.log('val1==>', val1 + '\n')
// console.log('val2==>', val2 + '\n')
// console.log('=======>split<=======\n')
// val1 = it1.next(val2 * 10).value
// val2 = it2.next(val1 * 5).value
// console.log('val1==>', val1 + '\n')
// console.log('val2==>', val2 + '\n')
// console.log('=======>split<=======\n')
// it1.next(111)
// it2.next(222)

// const arr = [1,[[2,3],4],[5,6]]

// function *flat(arr) {
//   const length = arr.length
//   for(let i = 0; i < length; i++) {
//     if(Array.isArray(arr[i])) {
//       yield* flat(arr[i])
//     } else {
//       yield arr[i]
//     }
//   }
// }

// for(let i of flat(arr)) {
//   console.log(i)
// }

var a = 1
var b = 2

function *foo() {
  a++
  yield
  b = b * a
  a = (yield b) + 3
}

function *bar() {
  b--
  yield
  a = (yield 8) + b
  b = a * (yield 2)
}

function step(gen) {
  var it = gen()
  var last
  return function() {
    last = it.next(last).value
  }
}

var s1 = step(foo)
var s2 = step(bar)

s1()
s1()
s1()

s2()
s2()
s2()
s2()

console.log(a,b)