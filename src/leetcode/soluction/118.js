/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  const dp = [[1]]
  for(let i = 2; i <=numRows; i++) {
      const temp = [1,1]
      for(let j = 0; j < i - 2; j++) {
          temp.splice(1, 0, dp[i - 2][j] + dp[i - 2][j+1])
      }
      dp.push(temp)
  }
  return dp
};


console.log(generate(5))