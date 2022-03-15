const http = require('http')

http.createServer((req, res) => {
  // console.log(req);
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8' })
  res.write('hello')
  res.end()
}).listen(8080)