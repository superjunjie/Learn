/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map()
    nums.forEach((value, index) => {
        if(map.has(target - value)) {
            return [map.get(target - value), index]
        } else {
            map.set(value, index)
        }
    })
    return []
}

const result = twoSum([1,2,3,4], 7)
console.log(result)
