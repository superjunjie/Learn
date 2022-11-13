function rk(a, b) {
  const n = a.length
  const m = b.length
  const bHash = getHash(b)
  for (let i = 0; i < n - m + 1; i++) {
    const hash = getHash(a.substr(i, m))
    if (hash === bHash) return i
  }
  return -1
}
function getHash(s) {
  const n = s.length
  let num = 0
  for (let i = 0; i < n; i++) {
    num = num + (s.charCodeAt(i) - 96) * Math.pow(26, n - i - 1)
  }
  return num
}