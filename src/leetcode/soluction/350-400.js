/**
 * @param {string} input
 * @return {number}
 * @detail https://leetcode-cn.com/problems/longest-absolute-file-path/
 */
var lengthLongestPath = function(input) {
  const words = input.split('\n')
  const pathLens = []
  pathLens[0] = -1
  let ans = 0
  for(const word of words) {
    let level = word.lastIndexOf('\t')+1+1
    let nameLen = word.length - level + 1
    pathLens[level] = pathLens[level - 1] + nameLen + 1
    if(word.includes("."))
      ans = Math.max(ans, pathLens[level])
  }
  return ans
};


/**
 * @param {number[]} nums
 * @return {number}
 * @detail https://leetcode-cn.com/problems/rotate-function/
 * [4,3,2,6]
 */
var maxRotateFunction = function(nums) {
  let f = 0, n = nums.length, numSum = nums.reduce((a,b) => a+b)
  for(let i = 0; i < n; i++) {
    f += i * nums[i]
  }
  let res = f
  for(let i = n - 1; i > 0; i--) {
    f += numSum - n * nums[i]
    res = Math.max(res, f)
  }
  return res
};


console.log(maxRotateFunction([4,3,2,6]))