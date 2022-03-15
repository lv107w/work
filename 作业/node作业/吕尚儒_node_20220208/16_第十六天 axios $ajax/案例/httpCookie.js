const { http, url, path, fs, multiparty, querystring } = require('./modules/httpRequire')
// const Cookies = require('cookies')

const server = http.createServer(function (req, res) {
  const pathname = url.parse(req.url).pathname
  const method = req.method.toUpperCase()
  const requestContentType = req.headers?.['content-type']
  console.log(`${method} HTTP/${req.httpVersion} ${req.url}`)
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "http://40.122.76.83:3001");
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5503");
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type,sa-time,sa-token');
  //响应报头指示的请求的响应是否可以暴露于该页面。当true值返回时它可以被暴露。
  //凭证是 Cookie ，授权标头或 TLS 客户端证书。
  //当作为对预检请求的响应的一部分使用时，它指示是否可以使用凭证进行实际请求。请注意，简单的GET请求不是预检的，所以如果请求使用凭证的资源，如果此资源不与资源一起返回，浏览器将忽略该响应，并且不会返回到 Web 内容。
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
  console.log(req.headers['sa-time'], req.headers['sa-token'])
  console.log(req.headers.cookie, 'cookie')
  // 获得客户端的Cookie
  let Cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
    let parts = Cookie.split('=');
    Cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  console.log(Cookies)

  res.writeHead(200, {
    "Set-Cookie": "myCookie=successCookie",
    "Content-Type": "text/plain",
  });
  res.end(JSON.stringify({ status: 200, data: { msg: 'welcome' } }));


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

