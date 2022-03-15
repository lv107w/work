const http = require('http')

const server = http.createServer((req, res) => {
  console.log('有人访问了服务');

  res.statusCode = 200
  res.setHeader('Content-type', "text/plain;charset=utf-8")
  res.end('欢迎来到server服务')

}).listen(80, () => {
  console.log('服务器运行中');
})