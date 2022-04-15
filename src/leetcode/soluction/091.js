/**
 * @param {string} s
 * @return {number}
 * @input 226
 */
var numDecodings = function(s) {
  const n = s.length
  let dp = new Array(n + 1).fill(0)
  dp[0] = 1
  for(let i = 1; i <= n; i++) {
    if(s.charAt(i - 1) !== '0') {
      dp[i] += dp[i - 1]
    }
    if(i > 1 && s.charAt(i - 2) !== '0' && ((s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0') <= 26)) { 
      dp[i] += dp[i - 2]
    }
  }
  console.log(dp)
  return dp[n]
}

console.log(numDecodings('226'))