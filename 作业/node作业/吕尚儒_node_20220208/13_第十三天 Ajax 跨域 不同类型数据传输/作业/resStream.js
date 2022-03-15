const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')


const uploadUrl = path.normalize(__dirname + '/upload')
http.createServer((req, res) => {
  const method = req.method.toUpperCase()
  const requestContentType = req.headers['content-type']

  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天
  //在非简单请求且跨域的情况下，浏览器会发起options预检请求。
  
  if(method === 'OPTIONS') {
    console.log('options预访问');
    res.end()
    return false
  }



  if(method === 'POST') {
    req.on('data', chunk => {
      let reqStr = chunk.toString('utf-8')
      console.log(reqStr);
      let { filename } = JSON.parse(reqStr) 
      console.log(filename);
      let {ext, name, base} = path.parse(filename)

      fs.readFile(path.normalize(uploadUrl + `/${base}`), (err, data) => {
        if(err) {
          throw err
        }
        if(data) {
          res.writeHead(200, {
            'content-type': 'application/octet-stream',
            "content-disposition": `attachment;fileName=${base}`
          })
          res.write(data, 'binary')
          res.end()
        }
      })
    })
  }
  req.on('end', () => {
    console.log('数据加载结束');
  })
}).listen(3004, () => {
  console.log('3004服务器启动');
})


function shuntContentType (type) {
  type = mime(type).trim()
  const contentType = {
    'application/x-www-form-urlencoded': 'url',
    'multipart/form-data': 'form',
    'text/plain': 'text',
    'application/json': 'json'
  }
  return contentType?.[type]
}
function mime (type) {
  return type?.split(';')[0]
}


