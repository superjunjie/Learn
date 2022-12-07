function solution(n, r) {
  // Write your answer here
  const getName = (name) => {
    return name.match(/\w+\d+/)[0]
  }
  const map = new Map()
  for (let i = 0; i < n.length; i++) {
    const name = getName(n[i])
    const passFlag = r[i] === 'passed'
    if (map.has(name) && map.get(name) && !passFlag) {
      map.set(name, false)
    } else {
      map.set(name, passFlag)
    }
  }
  let total = 0
  let passCount = 0
  for (let [_key, value] of map) {
    if (value) passCount++
    total++
  }
  return Math.floor((passCount / total) * 100)
}


solution(['test1', 'name2a', 'name2b', 'name3a', 'name3b', 'name4a', 'name4b'],
  ['passed', 'failed', 'passed', 'passed', 'passed', 'failed', 'failed'])