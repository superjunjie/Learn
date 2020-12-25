function binaryFind (sortedArr, target) {
    if(sortedArr.length === 0) return -1
    let low = 0
    let high = sortedArr.length - 1
    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        if(target === sortedArr[mid]) {
            return mid
        } else if (target < sortedArr[mid]) {
            high = mid - 1
        } else {
            low = mid + 1
        }
    }
    return -1
}

const arr = [1, 4, 5, 6, 7, 8, 10, 11, 23, 42, 44, 54, 56, 77, 102]
console.log(binaryFind(arr, 44))
console.log(binaryFind(arr, 1))
console.log(binaryFind(arr, 102))
console.log(binaryFind(arr, 1111))
