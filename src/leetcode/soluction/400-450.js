/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
function pacificAtlantic(heights) {
  const m = heights.length
  const n = heights[0].length
  const canReachP = new Array(m).fill(false).map(i => new Array(n).fill(false))
  const canReachX = new Array(m).fill(false).map(i => new Array(n).fill(false))
  const res = []
  for (let i = 0; i < m; i++) {
    dfs(heights, canReachP, i, 0)
    dfs(heights, canReachX, i, n - 1)
  }
  for (let j = 0; j < n; j++) {
    dfs(heights, canReachP, 0, j)
    dfs(heights, canReachX, m - 1, j)
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (canReachP[i][j] && canReachX[i][j]) {
        res.push([i,j])
      }
    }
  }
  return res
}

function dfs(heights, canReach, i, j) {
  if (canReach[i][j]) return
  canReach[i][j] = true
  if (i - 1 >= 0 && heights[i][j] <= heights[i - 1][j]) dfs(heights, canReach, i - 1, j)
  if (j - 1 >= 0 && heights[i][j] <= heights[i][j - 1]) dfs(heights, canReach, i, j - 1)
  if (i + 1 < heights.length && heights[i][j] <= heights[i + 1][j]) dfs(heights, canReach, i + 1, j)
  if (j + 1 < heights[0].length && heights[i][j] <= heights[i][j + 1]) dfs(heights, canReach, i, j + 1)
}

const res = pacificAtlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]])
console.log(res)