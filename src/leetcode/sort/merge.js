function mergeSort(nums) {
    let n = nums.length
    if(n <= 1) return nums
    let mid = Math.floor(n / 2),
        left = nums.slice(0, mid),
        right = nums.slice(mid, n)
    return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
    let result = []
    while (left.length && right.length) {
        if(left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    while (left.length) {
        result.push(left.shift())
    }
    while (right.length) {
        result.push(right.shift())
    }
    return result
}

let nums = [4,5,6,1,1,2,3]
console.log(mergeSort(nums))

