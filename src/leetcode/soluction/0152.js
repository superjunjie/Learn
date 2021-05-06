const maxProduct = function (nums) {
    let max = Number.NEGATIVE_INFINITY
        imax = 1,
        imin = 1
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] < 0) {
            [imax, imin] = [imin, imax]
        }
        imax = Math.max(imax*nums[i], nums[i])
        imin = Math.min(imin*nums[i], nums[i])
        max = Math.max(max, imax)
    }
    return max
}

console.log(maxProduct([-2]))
