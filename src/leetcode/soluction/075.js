/*
 * 75. 颜色分类
 * 输入：nums = [2,0,2,1,1,0]
 * 输出：[0,0,1,1,2,2]
 */

function sortColors(nums) {
    let [k,j] = [0,0]
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] === 0) {
            k++
        } else if (nums[i] === 1) {
            j++
        }
    }
    nums.fill(0, 0, k)
    nums.fill(1, k, k + j)
    nums.fill(2, k + j, nums.length)
}


sortColors([2,0,2,1,1,0])
