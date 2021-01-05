// timeout
function trap2(height) {
    let max = 0
    height.forEach(i => {
        if(i > max) {
            max = i
        }
    })
    let count = 0
    for(let i = 1; i <= max; i++) {
        let left = 0,
            right = height.length - 1
        while(height[left++]<i);
        while(height[right--]<i);
        for(let j = left; j <= right; j++) {
            if(height[j] < i) {
                count++
            }
        }
    }
    return count
}

function trap(height) {
    let count = 0
    for(let i = 1; i < height.length - 1; i++) {
        let leftMax = height[i],
            rightMax = height[i],
            j = i - 1,
            k = i + 1
        while (j >= 0) {
            if(height[j] > leftMax) {
                leftMax = height[j]
            }
            j--
        }
        while (k < height.length) {
            if(height[k] > rightMax) {
                rightMax = height[k]
            }
            k++
        }
        let minMax = Math.min(leftMax, rightMax)
        if(height[i] < minMax) {
            count += (minMax - height[i])
        }
    }
    return count
}

function trap2(height) {
    if(height.length < 3) return 0
    let left = 0
    let right = height.length - 1
    let leftMax = 0
    let rightMax = 0
    let result = 0
    while (left <= right) {
        if(leftMax < rightMax) {
            result += leftMax - height[left] > 0 ? leftMax - height[left] : 0
            leftMax = Math.max(leftMax, height[left])
            left ++
        } else {
            result += rightMax - height[right] > 0 ? rightMax - height[right] : 0
            rightMax = Math.max(rightMax, height[right])
            right--
        }
    }
    return result
}
console.log(trap2([0,1,0,2,1,0,1,3,2,1,2,1]))
