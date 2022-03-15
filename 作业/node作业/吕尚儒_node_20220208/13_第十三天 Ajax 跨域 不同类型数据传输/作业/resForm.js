const http = require('http')
const url = require('url')
const path = require('path')
const multiparty = require('multiparty')

const uploadPath = path.normalize(__dirname + '/upload')

console.log(uploadPath);

http.createServer((req, res) => {
  let method = req.method.toUpperCase()
  let contentType = req.headers['content-type']
  let {pathname} = url.parse(req.url)

  //cors 解决跨域
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  //我容许跟我不同源的页面像我发起请求
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天


  res.writeHead(200, {
    'content-type': 'text/plain;charset=utf8'
  })

  if(method === 'OPTIONS') {
    console.log('options预请求');
    res.end('ok')
    return false
  }

  if(!(/upload/.test(pathname))) {
    res.write('非upload请求与')
    res.end()
    return false
  }

  if(method === 'POST') {
    let form = new multiparty.Form({
      uploadDir: uploadPath
    })


    form.parse(req, (err, fields, files) => {
      if(err) {
        throw err
      }
      if(fields) {
        console.log(fields);
      }
      if(files) {
        console.log(files);
        res.end(JSON.stringify({
          'statusCode': 200,
          'msg': 'ok'
        }))
      }
    })
  }
}).listen(3003, () => {
  console.log('3003 服务启动 form文件上传');
})