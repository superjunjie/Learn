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

function singleNumber2(nums) {
    return nums.reduce((cur, pre) => cur^pre)
}


console.log(singleNumber2([1,1,2,2,4]))

