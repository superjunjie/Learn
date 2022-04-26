/**
 * @param {number[][]} grid
 * @return {number}
 */
var projectionArea = function(grid) {
  let dp = []
  let a = 0, b = 0, c = 0
  for(let i = 0; i < grid.length; i++) {
    b += getMax(grid[i])
    for(let j = 0; j < grid[i].length; j++) {
      if(grid[i][j]) a++
      if(grid[i][j] > (dp[j] || 0)) {
        dp[j] = grid[i][j]
      }
    }
  }
  c = dp.reduce((p, c) => p + c)
  return a + b + c
};


function getMax(nums) {
  return nums.reduce((a,b) => {
    return Math.max(a,b)
  })
}


console.log(projectionArea([[1,0],[0,2]]))