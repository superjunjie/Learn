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
