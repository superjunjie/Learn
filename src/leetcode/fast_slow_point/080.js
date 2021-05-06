function removeDuplicate(nums) {
   let i = 0
    for(let n of nums) {
        if(i < 2 || n > nums[i - 2]) {
            nums[i++] = n
        }
    }
    return i
}

function removeDuplicate2(nums) {
  let maxRepeat = 2
    let slow = maxRepeat - 1
    for(let fast = maxRepeat; fast < nums.length; fast++) {
        if(nums[fast] !== nums[slow - maxRepeat + 1]) {
            slow++
            nums[slow] = nums[fast]
        }
    }
    return slow + 1
}

let nums = [1,2,2,2,3]
console.log(removeDuplicate(nums))
