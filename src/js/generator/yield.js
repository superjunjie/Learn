/**
 * @description yield 委托
 */

function *foo() {
  console.log('inside *foo():', yield 'B')
  console.log('inside *foo():', yield 'C')
  return 'D'
}

function *bar() {
  console.log('inside *bar()', yield 'A')
  console.log('inside *bar()', yield *foo())
  console.log('inside *bar()', yield 'E')
  return 'F'
}

var it = bar()
console.log('outside:', it.next().value)
console.log('outside:', it.next(1).value)
console.log('outside:', it.next(2).value)
console.log('outside:', it.next(3).value)
console.log('outside:', it.next(4).value)