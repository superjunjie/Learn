const majorityElement = function(nums) {
    if(nums.length < 1) return -1
    let first = nums[0]
    let count = 0
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] === first) {
            count++
        } else {
            count--
        }
        if(count === 0) {
            first = nums[i]
            count = 1
        }
    }
    count = 0
    for(let i of nums) {
        if(first === i) count++
        if(count > nums.length / 2) return first
    }
    return -1
}

/**
 * 
 * @param {*} target 
 * @param {*} nums 
 * @returns minLen
 * @description https://leetcode-cn.com/problems/2VG8Kg/comments/
 */
var minSubArrayLen = function(target, nums) {
    let min = Number.MAX_VALUE
    let sum = 0
    for(let i = 0, j = 0; j < nums.length; j++){
        sum += nums[j]
        while (i <= j && sum >= target) {
            min = Math.min(min, j - i + 1)
            sum -= nums[i++]
        }
    }
    return min === Number.MAX_VALUE ? 0 : min
};


console.log(minSubArrayLen(7, [2,3,1,2,4,3]))