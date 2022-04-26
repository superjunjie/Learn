/**
 * @param {string} sentence
 * @return {string}
 * @detail https://leetcode-cn.com/problems/goat-latin/
 */
var toGoatLatin = function(sentence) {
  const words = sentence.split(' ')
  const vowel  = 'aeiouAEIOU'
  for(let i = 0; i < words.length; i++) {
    if(!vowel.includes(words[i].charAt(0)))
      words[i] = words[i].substring(1) + words[i].substring(0, 1)
    words[i] += 'ma'
    words[i] += 'a'.padEnd(i+1, 'a')
  }
  return words.join(' ')
}

console.log(toGoatLatin('I speak Goat Latin'))

/**
 * @param {number} n
 * @return {number}
 * @detail https://leetcode-cn.com/problems/binary-gap/
 */
var binaryGap = function(n) {
  let ans = 0
  for(let i = 31, j = -1; i >=0; i--) {
    if(((n >> i) & 1) === 1) {
      if(j !== -1) ans = Math.max(ans, j - i)
      j = i
    }
  }
  return ans
};


console.log(binaryGap(22))