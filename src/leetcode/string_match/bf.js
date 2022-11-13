function bf(a, b) {
  const n = a.length
  const m = b.length
  for (let i = 0; i < n - m + 1; i++) {
    let j = 0
    let k = i
    while (a[k] === b[j] && j < m) {
      j++
      k++
    }
    if (j === m) return i
  }
  return -1
}