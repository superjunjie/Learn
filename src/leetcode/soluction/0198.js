/**
 *输入：[1,2,3,1]
  输出：4
  解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
  偷窃到的最高金额 = 1 + 3 = 4 。
 */

function rob(nums) {
  let len = nums.length
  if(len === 0) return 0
  if(len === 1 ) return nums[0]
  if(len === 2) return Math.max(nums[0], nums[1])
  let dp = [nums[0]]
  dp[1] = (nums[0] > nums[1]) ? nums[0] : nums[1]
  for(let i = 2; i < nums.length; i++) {
    dp[i] = ((nums[i] + dp[i-2]) > dp[i-1]) ? (nums[i]+dp[i-2]) : dp[i-1]
  }
  return dp[len-1]
}

console.log(rob([1,2,3,1]))