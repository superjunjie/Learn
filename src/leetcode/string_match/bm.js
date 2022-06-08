function bm(a, b) {
  const n = a.length
  const m = b.length
  const bc = new Array(256)
  generateBC(b, m, bc)
  const suffix = new Array(m)
  const prefix = new Array(m)
  generateGS(b, m, suffix, prefix)
  let i = 0
  while (i <= n - m) {
    let j = m - 1
    while (j >= 0) {
      if (a[i + j] !== b[j]) break
      j--
    }
    if (j < 0) {
      return i
    }
    const x = j - bc[a.charCodeAt(i + j)]
    let y = 0
    if (j < m - 1) {
      y = moveByGS(j, m, suffix, prefix)
    }
    i = i + Math.max(x, y)
  }
  return -1
}
function generateBC(b, m, bc) {
  for (let i = 0; i < 256; i++) {
    bc[i] = -1
  }
  for (let i = 0; i < m; i++) {
    const ascii = b.charCodeAt(i)
    bc[ascii] = i
  }
}
// cabcab
function generateGS(b, m, suffix, prefix) {
  for (let i = 0; i < m; i++) {
    suffix[i] = -1
    prefix[i] = false
  }
  for (let i = 0; i < m - 1; i++) {
    let j = i
    let k = 0
    while (j >= 0 && b[j] === b[m - 1 - k]) {
      j--
      k++
      suffix[k] = j + 1
    }
    if (j === -1) prefix[k] = true
  }
}

function moveByGS(j, m, suffix, prefix) {
  const k = m - 1 - j
  if (suffix[k] !== -1) return j - suffix[k] + 1
  for (let r = j + 2; r <= m - 1; r++) {
    if (prefix[m - r]) {
      return r
    }
  }
  return m
}