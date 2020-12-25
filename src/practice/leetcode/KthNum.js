/*
 * 第k大元素
 * @param {array} arr
 * @param {number} k
 */

function kthNum(arr, k) {
    if(arr.length < k) {
        return -1
    }
    const len = arr.length
    let p = partition(arr, 0, len - 1)
    while (p + 1 !== k) {
        if(p + 1 > k) {
            p = partition(arr, 0, p - 1)
        } else {
            p = partition(arr, p + 1, len - 1)
        }
    }
    return arr[p]
}
function partition(arr, low, high) {
    let start = low
    let pivotVal = arr[high]
    for(let i = low; i < high; i++) {
        if(arr[i] < pivotVal) {
            [arr[i], arr[start]] = [arr[start], arr[i]]
            start++
        }
    }
    [arr[start], arr[high]] = [arr[high], arr[start]]
    return start
}

let nums = [5,6,7,1,2,3]
console.log(kthNum(nums, 8) )
