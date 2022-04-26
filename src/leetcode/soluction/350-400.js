import { matches } from "lodash";

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

// console.log(maxRotateFunction([4,3,2,6]))


/**
 * @param {number[]} nums
 * @detail https://leetcode-cn.com/problems/random-pick-index/
 */
var Solution = function(nums) {
  this.map = new Map()
  for(let i = 0; i < nums.length; i++) {
    if(this.map.has(nums[i])) {
      this.map.set(nums[i], [i].concat(this.map.get(nums[i])))
    } else {
      this.map.set(nums[i], [i])
    }
  }
};

/** 
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function(target) {
  if(this.map.has(target)) {
    const list = this.map.get(target)
    return list[Math.floor(Math.random() * list.length)]
  }
};

/**
 * @param {number[]} nums
 * @detail https://leetcode-cn.com/problems/random-pick-index/
 */
var Solution = function(nums) {
  this.nums = nums
};

/** 
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function(target) {
  let ans = 0
  for(let i = 0, cnt = 0; i < this.nums.length; i++) {
    if(this.nums[i] === target) {
      ++cnt
      if(Math.floor(Math.random() * cnt) === 0) {
        ans = i
      }
    }
  }
};
