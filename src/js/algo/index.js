
function bSearch(nums, val) {
  let low = 0
  let high = nums.length
  while (low <= high) {
    const mid = low + (high - low) >> 1
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function(nums, k) {
  if(k <= 1) return 0
  let l = 0
  let prod = 1
  let count = 0
  for(let r = 0; r < nums.length; r++) {
    prod *= nums[r]
    while (prod >= k) {
      prod /= nums[l++]
    }
    count += r - l + 1
  }
  return count
};

const res = numSubarrayProductLessThanK([10,9,10,4,3,8,3,3,6,2,10,10,9,3], 19)
console.log(res)