const http = require('http')

const server = http.createServer((request, response) => {
  console.log(`有人访问了服务`, request)

  response.statusCode = 200;
  response.setHeader('Content-type', "text/plain;charset=utf-8")
  response.end('你好 欢迎来到server 服务')

})
server.listen(80, () => {
  console.log('服务器运行中')
})