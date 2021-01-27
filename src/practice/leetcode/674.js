/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
    let count = 0,
        max_len = 0,
        max_value = -Number.MAX_VALUE
        for(let i = 0; i < nums.length; i++) {
            if(nums[i] > max_value) {
                max_value = nums[i]
                count++
            } else {
                if(count > max_len) {
                    max_len = count
                }
                max_value = nums[i]
                count = 1
            }
        }
        if(count > max_len) {
            max_len = count
        }
        return max_len
};

console.log(findLengthOfLCIS([2,1,3]))
