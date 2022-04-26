var canBeEqual = function(target, arr) {
  let map = new Map()
  for(let i = 0; i < target.length; i++) {
    map.set(target[i], (map.get(target[i]) || 0) + 1)
  }
  for(let i = 0; i < arr.length; i++) {
    if(!map.has(arr[i])) return false
    map.set(arr[i], (map.get(arr[i]) - 1))
  }
  for(let val of map.values()) {
    if(val) return false
  }
  return true
};

console.log(canBeEqual([1,2,3,3], [1,1,2,3]))