function quick_sort(nums, low, high) {
    if(low < high) {
        let pivot = high
        let partitionIndex = partition(nums, pivot, low, high)
        quick_sort(nums, low, partitionIndex - 1 < low ? low : partitionIndex - 1)
        quick_sort(nums, partitionIndex + 1 > high ? high : partitionIndex + 1, high)
    }

}
function partition(nums, pivot, low, high) {
    let pivotVal = nums[pivot]
    let startIndex = low
    for(let i = low; i < high; i++) {
        if(nums[i] < pivotVal) {
            [nums[i], nums[startIndex]] = [nums[startIndex], nums[i]]
            startIndex++
        }
    }
    [nums[startIndex], nums[pivot]] = [nums[pivot], nums[startIndex]]
    return startIndex
}
function quickSort(nums) {
    if(nums.length <= 1) return nums
    quick_sort(nums, 0, nums.length - 1)
}

let nums = [1,1,1]
quickSort(nums)
console.log(nums)
