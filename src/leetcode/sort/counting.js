/**
 * 
 * @param {Array} nums 
 * @description 计数排序
 */
function countingSort(nums) {
  let n = nums.length
  let max = nums[0]
  for(let i = 1; i < n; i++) {
    if(max < nums[i]) {
      max = nums[i]
    }
  }
  let c = new Array(max + 1).fill(0)
  for(let i = 0; i < n; i++) {
    c[nums[i]]++
  }
  for(let i = 1; i <= max; i++) {
    c[i] = c[i-1] + c[i]
  }
  let r = new Array(n)
  for(let i = n - 1; i >= 0; i--) {
    r[c[nums[i]] - 1] = nums[i]
    c[nums[i]]--
  }
  for(let i = 0; i < n; i++) {
    nums[i] = r[i]
  }
}

let nums =[]
for(let i = 0; i < 20; i++) {
  nums.push(Math.floor(Math.random() * 5))
}
countingSort(nums)
console.log(nums)
