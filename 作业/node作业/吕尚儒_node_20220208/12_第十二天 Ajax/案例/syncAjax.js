const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const baseURL = './upload';

http.createServer(function (req, res) {

  const reqPathname = url.parse(req.url).pathname
  res.writeHead(200, 'ok', {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    "X-Powered-By": ' 3.2.1',
    "Content-Type": "image/png"

  })
  console.log(req.url, reqPathname)

  if (reqPathname === '/stream/avatar') {
    fs.readFile(path.normalize(baseURL + '/1.png'), 'binary', (err, data) => {
      if (err) {
        throw err
      }
      res.write(data, 'binary')
      res.end()
    })
  }


}).listen(8080, function () {
  console.log('服务启动 监听8080 .....')
})