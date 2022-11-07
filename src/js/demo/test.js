
const items = [
  {
    folderName: 'folder1',
    fileName: 'A'
  },
  {
    folderName: 'folder1',
    fileName: 'B'
  },
  {
    folderName: 'folder2',
    fileName: 'C'
  }
]

function groupBy(list, groupByKey) {
  const map = list.reduce((map, item) => {
    const arr = map.get(item[groupByKey]) || []
    arr.push(item)
    map.set(item[groupByKey], arr)
    return map
  }, new Map())
  const res = []
  for (const [key, value] of map) {
    res.push({
      [groupByKey]: key,
      filList: value
    })
  }
  return res
}

const res = groupBy(items, 'folderName')
console.log(res)

