function minPathSum(matrix) {
  let m = matrix.length
  let n = matrix[0].length
  if(m <= 0 || n <= 0) return 0
  
  let dp = []
  // 初始化
  dp[0] = [matrix[0][0]]
  // 初始化最左边的列
  for(let i = 1; i < m; i++) {
    dp[i] = [dp[i-1][0] + matrix[i][0]]
  }
  // 初始化最上面的行
  for(let i = 1; i < n; i++) {
    dp[0].push(dp[0][i-1] + matrix[0][i])
  }
  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j-1]) + matrix[i][j]
    }
  }
  return dp[m - 1][n - 1]
}


console.log(uniquePaths([
  [1,3,1],
  [1,5,1],
  [4,2,1]
]))