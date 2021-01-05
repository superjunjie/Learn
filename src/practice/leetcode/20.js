// 有效的括号
// input: "()" output: true

/**
 * @param {string} s
 * @return {boolean}
 */

function isValid(s) {
        if(s.length & 1) return false
        let stack = []
        for(let i = 0; i < s.length; i++) {
        if(s[i] === '(' || s[i] === '{' || s[i] === '[') stack.push(s[i])
        else if(s[i] === ')' && stack[stack.length - 1] === '(') stack.pop()
        else if(s[i] === '}' && stack[stack.length - 1] === '{') stack.pop()
        else if(s[i] === ']' && stack[stack.length - 1] === '[') stack.pop()
        else return false
    }
    return !stack.length
}

console.log(isValid('(({{}}[]))'))
