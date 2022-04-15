/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  if(n <= 2) return n
  let a = 1, b = 2, temp = 2
  for(let i = 2; i < n; i++) {
      b = a + b
      a = temp
      temp = b
  }
  return b
};