/*
冒泡排序
 */
function bubbleSort(nums) {
    let n = nums.length
    if(n <= 1) return nums
    for(let i = 0; i < n; i++) {
        let flag = false
        for(let j = 0; j < n - i - 1; j++) {
            if(nums[j] > nums[j+1]) {
                let temp = nums[j]
                nums[j] = nums[j+1]
                nums[j+1] = temp
                flag = true
            }
        }
        if(!flag) break
    }
}

/*
插入排序
 */
function insertion(nums) {
    let n = nums.length
    if(n <= 1) return nums
    for(let i = 1; i < n; i++) {
        let j = i - 1
        let val = nums[i]
        for(; j>=0; j--) {
            if(nums[j] > val) {
                nums[j + 1] = nums[j]
            } else {
                break
            }
        }
    }
}

/*
    选择排序
 */
function selection(nums) {
    if(nums.length <= 1) return nums
    let n = nums.length
    for(let i = 0; i < n - 1; i++) {
        let min = nums[i]
        let k = i
        for(let j = i + 1; j < n; j++) {
            if(nums[j] < min) {
                min = nums[j]
                k = j
            }
        }
       [nums[i], nums[k]] = [nums[k], nums[i]]
    }
}
let nums = [4,5,6,3,2,1]
selection(nums)
console.log(nums)
