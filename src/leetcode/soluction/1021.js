/**
 * @param {string} S
 * @return {string}
 */
var removeOuterParentheses = function(S) {
    let res = ''
    let cnt = 0
    let start = 0
    for(let i = 0; i < S.length; i++) {
        if(S[i] === '(') {
            cnt++
        } else {
            if(--cnt === 0) {
                res + S.substring(start+1, i)
                start = i + 1
            }
        }
    }
    return res
};
