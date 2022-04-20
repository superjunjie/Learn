/**
 * @param {string} input
 * @return {number}
 * @description 388
 */
var lengthLongestPath = function(input) {
  const words = input.split('\n')
  const pathLens = []
  pathLens[0] = -1
  let ans = 0
  for(const word of words) {
    let level = word.lastIndexOf('\t')+1+1
    let nameLen = word.length - level + 1
    pathLens[level] = pathLens[level - 1] + nameLen + 1
    if(word.includes("."))
      ans = Math.max(ans, pathLens[level])
  }
  return ans
};


console.log(lengthLongestPath('dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext'))