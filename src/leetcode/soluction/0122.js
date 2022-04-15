/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  const n = prices.length
  let noStoke = 0
  let hasStoke = -prices[0]
  for(let i = 1; i < n; i++) {
    const temp = noStoke
    noStoke = Math.max(noStoke, hasStoke + prices[i])
    hasStoke = Math.max(temp - prices[i], hasStoke)
  }
  return noStoke
};


console.log(maxProfit([7,1,5,3,6,4])) 