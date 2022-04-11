function coinChange(coins, amount) {
  let dp = []
  for(let i = 0; i <= amount; i++) {
    dp[i] = amount + 1
  }
  dp[0] = 0
  for(let i = 1; i <= amount; i++) {
    for(let j = 0; j < coins.length; j++) {
      if(coins[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
      }
    }
  }
  console.log(dp)
  return dp[amount] > amount ? -1 : dp[amount]
}

console.log(coinChange([3,4, 5], 13))
