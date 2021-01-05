/*
 * LeetCode 136: 只出现一次的数字
 */

function singleNumber(nums) {
    let res = 0
    for(let i = 0; i < nums.length; i++) {
       res ^= nums[i]
    }
    return res
}

console.log(singleNumber([1,1,2,2,4]))
