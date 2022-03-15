const { data } = require('jquery')
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

  res.setHeader('content-type', 'text/html;charset=utf8')



  console.log(req.headers.cookie, 'cookie')
  let ga = querystring.parse(req.headers.cookie).ga
  if (ga === '123') {
    res.end('恭喜你登录了')
    return false
  }

  if (ga !== '123') {
    fs.readFile('./views/login.html', 'utf8', function (err, data) {
      if (err) {
        throw err
      } let date = new Date();
      //Expires 有效期设置为前一天 cookie设置完成 直接失效
      date.setDate(date.getDate() + 1)
      res.setHeader('Set-Cookie', `ga=456; Expires=${date.toUTCString()};HttpOnly`)
      res.end(data)
    })
    return false;
  }




}).listen(3004, function () {
  console.log('3004 启动 cookie')
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


