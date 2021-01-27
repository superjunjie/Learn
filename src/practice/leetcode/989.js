/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var addToArrayForm = function(A, K) {
    if(K > Number.MAX_SAFE_INTEGER) return
    let len1 = A.length,
        len2 = K.toString().length,
        carry = 0
    for(let i = 0; i < len2; i++) {
        if(i + 1 > len1) {
            let temp2 = Number(K.toString()[len2 - i - 1]) + carry
            if(temp2 >= 10) {
                A.unshift(temp2 - 10)
                carry = 1
            } else {
                A.unshift(temp2)
                carry = 0
            }
        } else {
            let temp = A[len1 - i - 1] + Number(K.toString()[len2 - i - 1]) + carry
            if(temp >= 10) {
                A[len1 - i - 1] = temp - 10
                carry = 1
            } else {
                A[len1 - i - 1] = temp
                carry = 0
            }
        }
    }
   if(len1 > len2 && carry > 0) {
       for(let i = len1 - len2 - 1; i >= 0; i--) {
           if(A[i] + carry >= 10)  {
               A[i] = (A[i] + carry - 10)
               carry = 1
           } else {
               A[i] += carry
               carry = 0
           }
       }
   }
   if(carry > 0) {
       A.unshift(1)
   }
    return A
};

var addToArrayForm2 = function(A, K) {
    const res = [];
    const n = A.length;
    for (let i = n - 1; i >= 0 || K > 0; --i, K = Math.floor(K / 10)) {
        if (i >= 0) {
            K += A[i];
        }
        res.push(K % 10);
    }
    res.reverse();
    return res;
};

console.log(addToArrayForm([9,9,9,9,9,9,9,9,9,9],99999999999990000000000))
