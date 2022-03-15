const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const baseURL = './upload';

http.createServer(function (req, res) {
  const reqPathname = path.parse(req.url).pathname
  res.writeHead(200, {
    "Content-Type": "application/octet-stream"
  })
  console.log(res.headers)

  if (reqPathname === '/stream/avatar') {
    fs.readFile(path.normalize(baseURL + '/1.jpg'), 'binary', (err, data) => {
      if (err) {
        throw err
      }
      res.write(data)
      res.end()
    })
  }


}).listen(8080, function () {
  console.log('服务启动 监听8080 .....')
})