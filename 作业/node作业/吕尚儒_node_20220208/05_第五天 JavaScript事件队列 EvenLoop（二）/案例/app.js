const fs = require('fs')
fs.readFile('./test.js', 'utf-8', function (err, data) {
  console.log('结果')
})
console.log('主队列任务')