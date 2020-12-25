function removeElement(nums) {
    let slow = 0
    for(let fast = 1; fast < nums.length; fast++) {
        if(nums[fast] !== nums[slow]) {
            slow++
            nums[slow] = nums[fast]
        }
    }
    return slow + 1
}

console.log(removeElement([1,2,2,3,3]))
