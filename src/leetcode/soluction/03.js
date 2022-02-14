/**
 * @param {string} s
 * @return {number}
 * @example
 *  Input: s = "abcabcbb"
    Output: 3
    Explanation: The answer is "abc", with the length of 3.
 */
var lengthOfLongestSubstring = function(s) {
  let count = 0
  let i = 0
  let j = 0
  let window = new Set()
  while (i < s.length && j < s.length) {
    if(window.has(s[j])) {
      window.delete(s[i])
      i++
    } else {
      window.add(s[j])
      j++
    }
    if(window.size > count) {
      count = window.size
    }
  }
  return count
}

console.log(lengthOfLongestSubstring('abcdbcedf'))