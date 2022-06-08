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

/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 * @description https://leetcode-cn.com/problems/minimum-genetic-mutation/
 */
var minMutation = function(start, end, bank) {
  const m = start.length;
  const n = bank.length;
  const adj = new Array(n).fill(0).map(() => new Array());
  let endIndex = -1;
  for (let i = 0; i < n; i++) {
      if (end === bank[i]) {
          endIndex = i;
      }
      for (let j = i + 1; j < n; j++) {
          let mutations = 0;
          for (let k = 0; k < m; k++) {
              if (bank[i][k] !== bank[j][k]) {
                  mutations++;
              }
              if (mutations > 1) {
                  break;
              }
          }
          if (mutations === 1) {
              adj[i].push(j);
              adj[j].push(i);
          }
      }
  }
  if (endIndex === -1) {
      return -1;
  }

  const queue = [];
  const visited = new Array(n).fill(0);
  let step = 1;
  for (let i = 0; i < n; i++) {
      let mutations = 0;
      for (let k = 0; k < m; k++) {
          if (start[k] != bank[i][k]) {
              mutations++;
          }
          if (mutations > 1) {
              break;
          }
      }
      if (mutations == 1) {
          queue.push(i);
          visited[i] = true;
      }
  }        
  while (queue.length) {
      const sz = queue.length;
      for (let i = 0; i < sz; i++) {
          const curr = queue.shift();
          if (curr === endIndex) {
              return step;
          }
          for (const next of adj[curr]) {
              if (visited[next]) {
                  continue;
              }
              visited[next] = true;
              queue.push(next);
          }
      }
      step++;
  }
  return -1;
};


const res = pacificAtlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]])
console.log(res)

