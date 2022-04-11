/**
 * @description 给定两个单词 word1 和 word2，计算出将 word1 转换成 word2 所使用的最少操作数
 * @example
 * @input word1 = "horse", word2 = "ros"
 * @output 3
 */

function minDistance(s1, s2) {
  let m = s1.length
  let n = s2.length
  if(m === 0) return n
  if(n === 0) return m
  let dp = []
  dp[0] = [0]
  // 初始化dp[0...m][0]的初始值
  for(let i = 1; i <= m; i++) {
    dp[i] = [dp[i-1][0] + 1]
  }
  // 初始化dp[0][n]的初始值
  for(let i = 1; i <= n; i++) {
    dp[0].push(dp[0][i-1] + 1)
  }
  for(let i = 1; i <= m; i++) {
    for(let j = 1; j <= n; j++) {
      if(s1.charAt(i - 1) === s2.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(dp[i-1][j-1], dp[i][j-1], dp[i-1][j]) + 1
      }
    }
  }
  return dp[m][n]
}

console.log(minDistance('sea', 'ate'))