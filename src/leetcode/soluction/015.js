/*
三数之和
 */
function threeSum(nums) {
    let res = []
    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            for (let k = i + 2; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] === 0) {
                    res.push([i, j, k])
                }
            }
        }
    }
    return res
}


function threeSum2(nums) {
    let res = []
    if (nums == null || nums.length < 3) {
        return res
    }
    let len = nums.length
    nums.sort((a,b) => a - b)
    for(let i = 0; i < len -2;) {
        const element = nums[i]
        if(element > 0) {
            break
        }
        let L = i + 1,
            R = len - 1
        while (L < R) {
            const sum = element + nums[L] + nums[R]
            if(sum === 0) {
                res.push([element, nums[L], nums[R]])
                while (L < R && nums[L] === nums[++L]);
                while (L < R && nums[R] === nums[--R]);
            } else if(sum < 0){
                while (L < R &&　nums[L] === nums[++L]);
            } else {
                while (L < R && nums[R] === nums[--R]);
            }
        }
        while (nums[i] === nums[++i]);
    }
    return res
}

function threeSum3(nums) {
    let left = []
    let right = []
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] > 0) {
            right.push(nums[i])
        } else {
            left.push(nums[i])
        }
    }
    let res = []
    for(let i = 0; i < left.length; i++) {
        let set = new Set()
        for(let j = 0; j < right.length; j++) {
            let temp = -(right[j] + left[i])
            if(set.has(temp)) {
                res.push([left[i], right[j], temp])
            } else {
                set.add(right[j])
            }
        }
    }
    for(let i = 0; i < right.length; i++) {
        let set = new Set()
        for(let j = 0; j < left.length; j++) {
            let temp = -(right[i] + left[j])
            if(set.has(temp)) {
                res.push([left[j], temp, right[i]])
            } else {
                set.add(left[j])
            }
        }
    }
    return res
}
console.log(threeSum3([0,1,-1]))
