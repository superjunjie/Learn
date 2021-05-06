/*
归并排序
 */

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


/*
快速排序
 */
function partition(arr, pivot, left, right) {
    const pivotVal = arr[pivot]
    let startIndex = left
    for (let i = left; i < right; i++) {
        if(arr[i] < pivotVal) {
            [arr[i], arr[startIndex]] = [arr[startIndex], arr[i]]
            startIndex++
        }
    }
    [arr[startIndex], arr[pivot]] = [arr[pivot], arr[startIndex]]
    return startIndex
}
function quick_sort(arr, left, right) {
    if(left < right) {
        let pivot = right
        let partitionIndex = partition(arr, pivot, left, right)
        quick_sort(arr, left, partitionIndex - 1 < left ? left : partitionIndex - 1)
        quick_sort(arr, partitionIndex + 1 > right ? right : partitionIndex + 1, right)
    }
}
function quickSort(arr) {
    let n = arr.length
    if(n <= 1) return arr
    quick_sort(arr, 0, n - 1)
}

let arr = [6,7,8,3,2,1,4,5,9]
quickSort(arr)
console.log(arr)
