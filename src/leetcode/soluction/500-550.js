/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function(nums, k) {
  const map = new Map()
  let count = 0
  if(k < 0) return count
  for(let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1)
  }
  for(const [val, num] of map) {
    const target = k  + val
    if(k === 0) {
      if(map.get(val) > 1) count++
    } else if(map.has(target)){
      count++
    }
  }
  return count
};

console.log(findPairs([3, 1, 3, 4, 1, 5], 2))

