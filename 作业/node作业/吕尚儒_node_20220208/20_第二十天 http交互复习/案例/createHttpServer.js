const url = require('url')
const path = require('path')
const fs = require('fs')
const http = require('http')
const querystring = require('querystring')
const multiparty = require('multiparty')

let server = http.createServer()


server.listen(8080)

// server.close(() => {
//   console.log('服务器已关闭')
// }) //关闭http服务
server.on('request', (request, response) => {
  // 设置允许跨域的域名，* 代表允许任意域名跨域
  response.setHeader("Access-Control-Allow-Origin", request.headers.origin);
  //我容许跟我不同源的页面像我发起请求
  //允许的header类型
  response.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
  response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  response.setHeader('Access-Control-Allow-Credentials', true)
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  response.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天

  response.setHeader('Set-Cookie', "name=zhagnan");//预请求缓存20
  console.log(request.header)
  console.log(request.url)
  console.log(request.method)
  let { pathname, path, query, params, search } = url.parse(request.url, true)

  request.on('data', chunk => {
    console.log(chunk.toString('utf8'))
  })

  console.log(pathname, path, query, params, search)

  // fs.readFile('./index.html', 'utf8', (err, data) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   // response.setHeader('Content-Type', 'text/html;charset=utf8')
  //   response.end(data)
  // })


  /*
    queryString
    formData
    jsonString
  
  */
  response.end("{key:kyogre}")

  console.log('====== 每当有请求时触发 request ======')
})
server.on('connection', (socket) => {
  console.log('====== 建立新的 TCP 流时触发 connection ======')
})
server.on('error', () => {
  console.log(arguments)
  console.log('====== 服务器错误时触发 error ======')
})
server.on('listening', () => {
  console.log('====== 监听开启后触发 listening ======')
})
server.on('close', () => {
  console.log('====== 服务器关闭时触发 close ======')
})