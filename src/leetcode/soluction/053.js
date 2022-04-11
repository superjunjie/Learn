function maxSubArray(nums) {
  let len = nums.length
  if(len === 0) return 0
  let dp = [nums[0]]
  let max = dp[0]
  for(let i = 1; i < len; i++) {
    dp[i] = Math.max(dp[i-1] + nums[i], nums[i])
    if(dp[i] > max) {
      max = dp[i]
    }
  }
  return max
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))