const { url, path, fs, querystring, http } = require('./moduleCase/httpRequire')
const { root } = require('./moduleCase/config')
const { resFile, resJSON, resStatus, resText, setCORSHeader } = require('./moduleCase/responseMethod')
const { mime } = require('./moduleCase/mime')

http.createServer((req, res) => {
  getStatic(req, res)
}).listen(3003)

function getStatic (req, res) {
  console.log(`router: /static 请求静态资源`)
  // /static/image/1.png
  let pathname = url.parse(req.url).pathname
  let fileName = path.parse(pathname).base
  let filePath = path.join(root, pathname)
  const normalPicUrl = path.join(root, '/static/image/', '/p449897379.jpg')
  fs.stat(filePath, (err, stats) => {
    if (err) {
      resStatus(res, 'SUCCESS')
      res.setHeader('content-type', mime(pathname))
      fs.createReadStream(normalPicUrl).pipe(res)
      return
    }
    if (stats.isDirectory()) {
      resStatus(res, 'NOT FOUND')
      resText(res, `${fileName} 404 Not Found`)
      return
    }
    if (stats.isFile()) {
      resStatus(res, 'SUCCESS')
      res.setHeader('content-type', mime(pathname))
      //创建一个文件读取流 读取结果直接 提交给res 返回给客户端
      fs.createReadStream(filePath).pipe(res)
    }
  })
}