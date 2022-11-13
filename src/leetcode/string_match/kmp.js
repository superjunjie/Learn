function kmp(a, b) {
  const n = a.length
  const m = b.length
  const next = getNext(b)
  let j = 0
  for (let i = 0; i < n; i++) {
    while (j > 0 && a[i] !== b[j]) {
      j = next[j - 1] + 1
    }
    if (a[i] === b[j]) {
      j++
    }
    if (j === m) {
      return i - m + 1
    }
  }
  return -1
}

function getNext(s) {
  const n = s.length
  const next = new Array(n)
  next[0] = -1
  let k = -1
  for (let i = 1; i < n; i++) {
    while (k !== -1 && s[k + 1] !== s[i]) {
      k = next[k]
    }
    if (s[k + 1] === s[i]) {
      k++
    }
    next[i] = k
  }
  return next
}