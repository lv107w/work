const { resolveSoa } = require('dns')
const http = require('http')
const path = require('path')
const url = require('url')
const querystring = require('querystring')

http.createServer((req, res) => {
  console.log(req);
  let reqMethod = req.method
  let reqUrl = req.url
  let pathName = url.parse(reqUrl).pathname;

  res.writeHead(200, {'Content-Type': 'text/plain;charset=utf8'})


  if(pathName !== '/user') {
    res.write('只开放用户登录')
    res.end()
    return false
  }

  if(reqMethod === 'GET') {
    res.write('不接受get请求')
    res.end()
    return false
  }

  let contentType = mime(req)
  if(contentType.trim() !== 'application/x-www-form-urlencoded') {
    res.write('只接受表单请求')
    res.end()
    return false
  }

  if(req.headers['content-length'] === 0) {
    res.write('不存在请求内容')
    res.end()
    return false
  }

  req.on('data', (chunk) => {
    console.log(chunk);
    let query = chunk.toString('utf8');
    let reqData = querystring.parse(query)

    if(!reqData['pwd'] || reqData['pwd'].trim().length === 0) {
      res.write('密码不能为空')
      res.end()
      return false
    }
    if(!reqData['user'] || reqData['user'].trim().length === 0) {
      res.write('用户名不能为空')
      res.end()
      return false
    }

    if(reqData['pwd'] !== '123456') {
      res.write('密码错误')
      res.end()
      return false
    }

    res.write(`欢迎登录, 用户${reqData['user']}`)
    res.end()
  })

  req.on('end', () => {
    console.log('请求数dwadwa据完毕');
  })
}).listen(8080)

function mime(req) {
  const mimeType = req.headers['content-type']
  return mimeType.split(';')[0]
}