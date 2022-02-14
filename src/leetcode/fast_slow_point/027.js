function removeElement(nums, val) {
    let slow = 0
    for(let fast = 0; fast < nums.length; fast++) {
        if(nums[fast] !== val) {
            nums[slow] = nums[fast]
            slow++
        }
    }
    return slow
}

let nums = [3,2,2,3,3,4]
console.log(removeElement(nums, 3))
