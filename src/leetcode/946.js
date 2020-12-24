/**
 * 验证序列
 * example
 * input: pushed = [1,2,3,4,5] popped = [4,5,3,2,1]
 */

 /**
  * @param {number[]} pushed
  * @param {number[]} popped
  * @return {boolean}
  */
let vaildateStackSequences = (pushed, popped) => {
    let stack = []
    for(let i = 0; i < pushed.length; i++) {
        stack.unshift(pushed[i])
        while(stack[0] === popped[0] && stack.length) {
            stack.shift()
            popped.shift()
        }
        
    }
    return !stack.length
}

let result = vaildateStackSequences([1,2,3,4,5], [4,5,1,3,2])
console.log(result)