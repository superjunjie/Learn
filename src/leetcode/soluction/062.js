function uniquePaths(m, n) {
  if(m <=0|| n <=0) return 0
  let dp = []
  for(let i = 0; i < n; i++) {
    dp[i] = 1
  }
  for(let i = 1; i < m; i++) {
    dp[0] = 1
    for(let j = 1; j < n; j++) {
      dp[j] = dp[j - 1] + dp[j]
    }
  }
  return dp[n-1]
}

function uniquePaths2(m,n) {
  let ans = 1
  for (let x = n, y = 1; y < m; ++x, ++y) {
    ans = ans * x / y
  }
  return ans
}

console.log(uniquePaths2(4,4))