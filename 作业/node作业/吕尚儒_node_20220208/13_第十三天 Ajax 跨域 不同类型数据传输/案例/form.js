const { http, fs, url, path, multiparty, querystring } = require('./modules/httpRequire')

const uploadPath = path.normalize(__dirname + '/upload')
console.log(uploadPath)//D:\预科班6.2\Node服务班\Node第十三天 Ajax 封装\案例\upload 

//path.join(地址1,地址2,地址3) => path.normalize(地址1+地址2+地址3)

http.createServer(function (req, res) {
  //
  /*
  
  
  */

  let { pathname, query, search, host, port } = url.parse(req.url)
  let method = req.method.toUpperCase()
  let contentType = req.headers['content-type']


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

  if (method === 'OPTIONS') {
    console.log('options 预验请求')
    res.end('ok')
    return false
  }

  if (!(/upload/.test(pathname))) {
    res.write('非 upload  请求')
    res.end()
    return false;
  }
  contentType = shuntContentType(mime(contentType))
  if (contentType !== 'form') {
    res.end('请求内容类型非 multipart/form-data ')
    return false;
  }

  if (method === 'POST') {
    let form = new multiparty.Form({
      uploadDir: uploadPath
    })
    form.parse(req, function (err, fields, files) {
      if (err) {
        throw err
      }
      if (fields) {
        console.log(fields)
      }
      if (files) {
        console.log(files)
        res.end(JSON.stringify({
          'statusCode': 2000,
          'msg': 'ok'
        }))
      }


    })
  }


}).listen(3003, function () {
  console.log('3003 服务启动 form文件上传')
})

function shuntContentType (type) {
  const contentType = {
    'application/x-www-form-urlencoded': 'url', // pathname?key=value&key=value form表单默认的 enctype content-type

    'multipart/form-data': 'form', // form表单提交文件到服务端 form表单文件流
    'text/plain': 'text', //基础文本内容 
    'application/json': 'json' // "{name:kyogre,age:1}"
  }
  return contentType[type]
}
//application/json

function mime (type) {
  return type?.split(';')[0]
}

function isJSON (str) {
  try {
    JSON.parse(str)
    return true;
  } catch (err) {
    return false;
  }
  return false;
}

