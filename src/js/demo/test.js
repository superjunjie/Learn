const list = ['div', 'a', 'html', 'p', 'a', 'html','p','p', 'a', 'a']


function countTagName(list) {
  const map = new Map()
  let res = []
  for(let i = 0; i < list.length; i++) {
    if(map.has(list[i])) {
      map.set(list[i], map.get(list[i]) + 1 )
    } else {
      map.set(list[i], 1)
    }
  }
  for(const [key, value] of map) {
    res.push({
      [key]: value
    })
  }
  res.sort((a, b) => {
    return Object.values(a) - Object.values(b)
  })
  return res
}

// const res = countTagName(list)
// console.log(res)


const arr = []
for(let i = 0; i < 10000; i++) {
  arr.push(i)
}
function shuffle(arr) {
  return arr.sort((a, b) => {
    if(a * Math.random() > b * Math.random()) {
      return 1
    } else {
      return -1
    }
  })
}
function getKth(arr, k) {
  let partitionIndex
  let low = 0,
      high = arr.length - 1
  while (partitionIndex !== k - 1) {
    partitionIndex = partition(arr, high, low, high)
    low = partitionIndex < k ? partitionIndex + 1 : low
    high = partitionIndex < k ? high : partitionIndex - 1
  }
  return arr[partitionIndex] 
}
function partition(arr, pivot, low, high) {
  let pivotVal = arr[pivot]
    let startIndex = low
    for(let i = low; i < high; i++) {
        if(arr[i] < pivotVal) {
            [arr[i], arr[startIndex]] = [arr[startIndex], arr[i]]
            startIndex++
        }
    }
    [arr[startIndex], arr[pivot]] = [arr[pivot], arr[startIndex]]
    return startIndex
}
// test
shuffle(arr)
const startDate = new Date().getTime()
console.log(getKth(arr, 5000)) // 49
const endDate = new Date().getTime()
console.log(endDate - startDate)


function groupBy(arr) {
  const list = []
  const map = arr.reduce((pre, cur) => {
    return pre.set(cur, (pre.get(cur) || 0) + 1)
  }, hash = new Map())
  for(const [key, value] of map) {
    list.push({
      [key]: value
    })
  }
  return list
}

console.log(groupBy(list))


function uniquePaths(m, n) {
  if(m <= 0 || n <= 0) return 0
  const dp = []
  for(let i = 0; i < m; i++) {
    dp[i] = [1]
  }
  for(let i = 0; i < n; i++) {
    dp[0].push(1)
  }
  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      dp[i][j] = dp[i-1][j] + dp[i][j-1]
    }
  }
  return dp[m-1][n-1]
}

console.log(uniquePaths(4,3))