const { http, url, path, fs, multiparty, querystring } = require('./modules/httpRequire')
// const Cookies = require('cookies')

const server = http.createServer(function (req, res) {
  console.log(1)
  const pathname = url.parse(req.url).pathname
  const method = req.method.toUpperCase()
  const requestContentType = req.headers?.['content-type']
  console.log(`${method} HTTP/${req.httpVersion} ${req.url}`)

  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true)
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天
  //在非简单请求且跨域的情况下，浏览器会发起options预检请求。
  if (method === 'OPTIONS') {
    console.log('options')
    res.write('pass')
    res.end();
    return false
  }

  // res.cookie('username', 'kyogre', { maxAge: 10000 })

  // var cookies = new Cookies()

  // // 获取cookie,new Cookies时设置了签名，获取时也要进行签名认证
  // var lastVisit = cookies.get('LastVisit', { signed: true });
  // // 设置cookie('键名','值','有效期')
  // cookies.set('LastVisit', new Date().getTime(), { signed: true });
  // cookies.set('k1', 'v1', { signed: true, maxAge: 0 }); //永久有效
  // cookies.set('k3', 'v3', { signed: true, maxAge: -1 }); //删除cookie
  // cookies.set('k2', 'v2', { signed: true, maxAge: 60000 * 60 * 24 * 7 }); //单位毫秒，有效期为7天

  if (!lastVisit) {
    res.setHeader('Content-Type', 'text/plain;charset=utf8')
    res.end('你好，你这是首次访问!')
  } else {
    res.setHeader('Content-Type', 'text/plain;charset=utf8')
    res.end('欢迎回来! 上一次访问时间为 ' + lastVisit + '.')
  }

  if (method === 'GET') {
    console.log('GET 请求')
    let { json, str } = queryURLFromat(req)
    res.setHeader('content-type', 'text/plain;charset=utf8')
    res.write(str)
    res.end()
    return false;
  }

  if (method === 'POST') {
    console.log(requestContentType)
    let type = shuntContentType(requestContentType)
    if (type === 'form') {
      let form = new multiparty.Form({
        uploadDir: path.normalize(__dirname + '/upload')
      })
      form.parse(res, (err, fields, files) => {
        if (err) {
          throw err
        }
        if (fields) {
          console.log(fileds)
        }
        if (files) {
          console.log(files)
        }
        res.write('pass')
        res.end()
      })
      return false
    }



    req.on('data', (chunk) => {
      let str = chunk.toString('utf8')
      console.log(str)
      res.setHeader('content-type', 'text/plain;charset=utf8')
      res.write(str)
      res.end()
    })
    req.on('end', () => {
      console.log('传输结束')
    })
  }
}).listen(3007, function () {
  console.log('3007 启动 application/json')
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

function queryURLFromat (req) {
  let queryStr = url.parse(req.url, true)
  let params = queryStr.query
  let requestParamStr = Object.entries(params).reduce((acc, [key, value]) => {
    let paramsStr = `参数名称: ${key}, 参数值: ${value} \n`
    acc += paramsStr
    return acc
  }, `请求参数为 : \n`)
  return {
    json: params,
    str: requestParamStr
  }
}


/*

关于简单请求和复杂请求：
1 简单请求

  简单请求需满足以下两个条件

  请求方法是以下三种方法之一：
    HEAD
    GET
    POST
  HTTP 的头信息不超出以下几种字段
    Accept
    Accept-Language
    Content-Language
    Last-Event-ID
    Content-Type: 只限于 (application/x-www-form-urlencoded、multipart/form-data、text/plain)
2 复杂请求

非简单请求即是复杂请求

常见的复杂请求有：

  请求方法为 PUT 或 DELETE

  Content-Type 字段类型为 application/json

  添加额外的http header 比如access_token

  在跨域的情况下，非简单请求会先发起一次空body的OPTIONS请求，称为"预检"请求，用于向服务器请求权限信息，等预检请求被成功响应后，才发起真正的http请求。

  浏览器的预检请求结果可以通过设置Access-Control-Max-Age进行缓存


   //设置允许跨域的域名，*代表允许任意域名跨域
    res.setheader("Access-Control-Allow-Origin", "*");
  //允许的header类型
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
*/
