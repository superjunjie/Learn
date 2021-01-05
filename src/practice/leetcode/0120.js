/*
 * 0120: 三角形最小路径和
 */
function minimumTotal(triangle) {
    let dp = []
    for(let i = 0; i < triangle[triangle.length - 1].length; i++) {
        dp[i] = triangle[triangle.length - 1][i]
    }
    for(let i = dp.length - 2; i >=0; i--) {
        for(let j = 0; j < triangle[i].length; j++) {
            dp[j] = Math.min(dp[j], dp[j+1]) + triangle[i][j]
        }
    }
    return dp[0]
}


let triangle = [
    [2],
    [3,4],
    [6,5,7],
    [4,1,8,3]
]
console.log(minimumTotal(triangle))
