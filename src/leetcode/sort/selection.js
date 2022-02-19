function selectionSort(nums) {
    let n = nums.length
    if(n <= 1) return nums
    for(let i = 0; i < n-1; i++) {
        let k = i
        let min = nums[i]
        for(let j = i + 1; j < n; j++) {
            if(nums[j] < min) {
                min = nums[j]
                k = j
            }
        }
        if(k !== i) {
            let temp = nums[i]
            nums[i] = nums[k]
            nums[k] = temp
        }
    }
}

let nums = [4,5,6,1,2,3]
selectionSort(nums)
