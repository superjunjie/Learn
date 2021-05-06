/**
 * @param {number[]} A
 * @return {boolean[]}
 */
var prefixesDivBy5 = function(A) {
    let i = -1, n = 0
    while (++i < A.length) A[i] = (n = ((n << 1) + A[i]) % 5) === 0
    return A
}

console.log(prefixesDivBy5([1,0,1]))
