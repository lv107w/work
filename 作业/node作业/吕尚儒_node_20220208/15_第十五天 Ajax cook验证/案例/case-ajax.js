const { http, url, path, fs, multiparty, querystring } = require('./modules/httpRequire')
const { isJSON, isQueryStr } = require('./modules/utils/utils')
const viewPath = path.normalize(__dirname + '/views')

const server = http.createServer(function (req, res) {
  const pathname = url.parse(req.url).pathname
  const method = req.method.toUpperCase()
  const requestContentType = req.headers?.['content-type']
  console.log(`${method} HTTP/${req.httpVersion} ${req.url}`)

  let responseData = {}
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天
  //在非简单请求且跨域的情况下，浏览器会发起options预检请求。

  res.setHeader('content-type', 'text/plain;charset=utf8')
  if (method === 'OPTIONS') {
    responseData = JSON.stringify({ status: '200', errMsg: '预验证通过' })
    res.end(responseData);
    return false
  }

  if (pathname !== '/login') {
    responseData = JSON.stringify({ status: '9002', errMsg: '请求pathname不正确' })
    //write 和 end 都可以传参设置响应内容 write之后可以end  end之后就正式返回了 不能再write或者再次end
    res.end(responseData);
    return false;
  }

  if (method === 'GET') {
    console.log('GET 请求')
    let viewPage = '/login.html'
    let { json, str } = queryURLFromat(req)
    let cookie = req.headers.cookie
    if (cookie && /token/.test(cookie)) {
      let { token } = querystring.parse(cookie, ';')
      if (token) {
        viewPage = '/index.html'
      }
    }

    //返回登录页面
    fs.readFile(viewPath + viewPage, 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      if (data) {
        res.setHeader('content-type', 'text/html;charset=utf8')
        res.end(data)
      }
    })
    // responseData = JSON.stringify({ status: '9003', errMsg: 'method方式错误' })
    // res.end(responseData)
    return false;
  }

  if (method === 'POST') {
    console.log(req.headers)
    let type = shuntContentType(requestContentType)
    if (type === 'form') {
      let form = new multiparty.Form({
        uploadDir: path.normalize(__dirname + '/upload')
      })
      form.parse(req, (err, fields, files) => {
        if (err) {
          throw err
        }
        if (fields) {
          console.log(fields)
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
      let cookie = req.headers.cookie
      if (cookie && /token/.test(cookie)) {
        let { token } = querystring.parse(cookie, ';')
        if (token) {
          responseData = JSON.stringify({
            status: '200', errMsg: '免验证登录'
          })
          res.end(responseData)
          return false;
        }
      }

      let str = chunk.toString('utf8')
      let reqData = isQueryStr(str) ? querystring.parse(str) : JSON.parse(str)

      let { user, pwd } = reqData

      if (!user || !pwd) {
        responseData = JSON.stringify({
          status: '8998', errMsg: '账号或者密码错误'
        })
        res.end(responseData)
        return false;
      }
      // let token = Date.now() + String(Math.random()).replace('.', '')
      let token = Buffer.from(user + pwd)
      //用户登录凭证 7869616f6d696e67786d313233
      token = token.toString('hex')

      console.log(token)
      res.setHeader('Set-Cookie', 'token=' + token)
      responseData = JSON.stringify({
        status: '200', errMsg: '请求成功', data: {
          user, token: token
        }
      })
      res.end(responseData)
      // res.setHeader('content-type', 'text/html;charset=utf8')
      // fs.readFile('./views/index.html', 'utf8', function (err, data) {
      //   if (err) {
      //     throw err
      //   }
      //   res.end(data)
      // })

    })
    req.on('end', () => {
      console.log('传输结束')
    })
  }
}).listen(3008, function () {
  console.log('3008 启动 application/json')
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


