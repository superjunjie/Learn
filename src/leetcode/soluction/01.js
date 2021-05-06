// to sum
// example input : list = [1,2,3,4] target = 7  output: [2,3]

function twoSum(nums, target) {
    let map = new Map()
    for(let i = 0; i < nums.length; i++) {
        if(map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i]
        }
        else {
            map.set(nums[i], i)
        }
    }
    return []
}

const result = twoSum([1,2,3,4], 7)
console.log(result)