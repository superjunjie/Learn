function insertionSort(nums) {
    let n = nums.length
    if(n <= 1) return
    for(let i = 1; i < n; i++) {
        let val = nums[i]
        let j = i - 1
        for(; j >=0; j--) {
            if(nums[j] > val) {
                nums[j + 1] = nums[j]
            }
            else {
                break
            } 
        }
        nums[j + 1] = val
    }
}

let nums = [4,5,6,1,2,3]
insertionSort(nums)
console.log(nums)
