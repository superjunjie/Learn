const execSync = require('child_process').execSync

const str1 = execSync('git add .', {encoding: 'utf8'})
const str2 = execSync('git commit -m "aaa"', {encoding: 'utf8'})
const re = str1.match(/^On branch (.+)\s/)
console.log('你现在所在分支：' + re[1] + '\n')