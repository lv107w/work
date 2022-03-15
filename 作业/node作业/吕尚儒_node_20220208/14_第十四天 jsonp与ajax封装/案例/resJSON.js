const { http, fs, url, path, multiparty, querystring } = require('./modules/httpRequire')

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

  if (!(/json/.test(pathname))) {
    res.write('非json pathname 请求')
    res.end()
    return false;
  }
  contentType = shuntContentType(mime(contentType))
  // console.log(contentType)
  if (contentType !== 'json') {
    res.end('请求内容类型非 StringJson')
    return false;
  }



  if (method === 'POST') {
    req.on('data', function (chunk) {
      if (!isJSON(chunk.toString('utf8'))) {
        res.end(JSON.stringify({
          'statusCode': 9001,
          'msg': '请求内容不符合JSON规范'
        }))
        return false;
      }
      let reqData = JSON.parse()
      res.end("hahahha")
      return false;
    })

    req.on('end', function () {
      console.log('数据获取完毕')
    })
  }


}).listen(3007, function () {
  console.log('3001 服务启动 json类型数据ajax交互')
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

