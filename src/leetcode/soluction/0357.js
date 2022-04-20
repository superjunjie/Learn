


/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function(n) {
  let ans = 1
  for(let i = 1; i <= n; i++) {
    let sum = 9, temp = i
    while (temp > 1) {
      temp--
      sum *= 10 - temp
    }
    ans = sum + ans
  }
  return ans
};

console.log(countNumbersWithUniqueDigits(2))