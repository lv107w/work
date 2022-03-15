function responseJSON (res, data) {
  res.writeHead(200, {
    'content-type': 'application/json;charset=utf8'
  })
  res.write(JSON.stringify(data))
  res.end()
}

function responsePlain (res, data) {
  res.writeHead(200, {
    'content-type': 'text/plain;charset=utf8'
  })
  res.write(data)
  res.end()
}

function responseHTML (res, html) {
  res.writeHead(200, {
    'content-type': 'text/html;charset=utf8'
  })
  res.write(html)
  res.end()
}

function responseBinary (res, data) {
  res.writeHead(200, {
    'content-type': 'application/octet-stream'
  })
  res.write(data, 'binary')
  res.end()
}

function setCORSHeader () {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setheader("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
}

module.exports = {
  responseJSON, responseBinary, responseHTML, responsePlain, setCORSHeader
}