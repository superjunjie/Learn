function bubbleSort(nums) {
    if(nums.length <= 1) return 
    let n = nums.length
    for(let i = 0; i < n; i++) {
        let flag = false
        for(let j = 0; j < n - i - 1; j++) {
            if(nums[j] > nums[j+1]) {
                let temp = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = temp
                flag = true
            }
        }
        if(!flag) break
    }
}


let nums = [5,2,7,1,0]
bubbleSort(nums)
console.log(nums)