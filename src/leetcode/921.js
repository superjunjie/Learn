/**
 * description: 使括号有效最少添加
 * example
 * input: (({))
 * output: 1
 */
function minAddToMakeValid(s) {
    let count = 0
    for(let i = 0; i < s.length; i++) {
        if(s[i] === '(' || s[i] === '{' || s[i] === '[') count ++
        else if (s[i] === ')' || s[i] === '}' || s[i] === ']') count --
        else return false
    }
    return Math.abs(count)
}

console.log(minAddToMakeValid('(({{'))