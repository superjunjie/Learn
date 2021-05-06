function maxArea(nums) {
    let maxArea = 0
    for(let i = 0; i < nums.length - 1; i++) {
        for(let j = i + 1; j < nums.length; j++) {
            let area = Math.min(nums[i], nums[j]) * (j - i)
            if(area > maxArea) {
                maxArea = area
            }
        }
    }
    return maxArea
}

function maxArea2(nums) {
    if(nums.length < 2) {
        return 0
    }
    let left = 0
    let right = nums.length - 1
    let maxArea = 0
    while(left < right) {
        let area = Math.min(nums[left], nums[right]) * (right - left)
        if(area > maxArea) {
            maxArea = area
        }
       if(nums[left] > nums[right]) {
            right--
        } else {
            left++
        }
    }
    return maxArea
}
let nums = [1,8,6,2,5,4,8,3,7]
console.log(maxArea2(nums))
