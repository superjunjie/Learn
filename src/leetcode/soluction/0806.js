/**
 * @param {number[]} widths
 * @param {string} s
 * @return {number[]}
 */
var numberOfLines = function(widths, s) {
  let lines = 1
  let count = 0
  for(let i = 0; i < s.length; i++) {
    const length = widths[s[i].charCodeAt() - 'a'.charCodeAt()]
    if(count + length > 100) {
      lines++
      count = length
    } else {
      count += length
    }
  }
  return [lines, count]
}

console.log(numberOfLines([4,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], 'bbbcccdddaaa'))