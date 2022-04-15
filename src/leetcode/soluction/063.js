/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 * @input obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
 * @output 2
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  let m = obstacleGrid.length, n = obstacleGrid[0].length
  obstacleGrid[0][0] = obstacleGrid[0][0] ? 0 : 1
  for(let i = 1; i < n; i++) {
    obstacleGrid[0][i] = (obstacleGrid[0][i] === 1 || obstacleGrid[0][i - 1] === 0) ? 0 : 1
  }
  for(let i = 1; i < m; i++) {
    obstacleGrid[i][0] = (obstacleGrid[i][0] === 1 || obstacleGrid[i - 1][0] === 0) ? 0 : 1
  }
  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      if(obstacleGrid[i][j]) {
        obstacleGrid[i][j] = 0
      } else {
        obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1]
      }
    }
  }
  console.log(obstacleGrid)
  return obstacleGrid[m - 1][n - 1]
}

uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])