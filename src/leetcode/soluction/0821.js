/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function(s, c) {
  const n = s.length
  const ans = new Array(n).fill(n)
  for(let i = 0, last = -n; i < n; i ++) {
    if(s.charCodeAt(i) === c.charCodeAt(0)) {
      for(let j = i; j >= Math.max(0, (last + i -1) >> 1); j--) {
        ans[j] = Math.min(ans[j], i - j)
      }
      last = i
    } else {
      ans[i] = Math.min(ans[i], i - last)
    }
  }
  return ans
};

console.log(shortestToChar('loveleetcode', 'e'))