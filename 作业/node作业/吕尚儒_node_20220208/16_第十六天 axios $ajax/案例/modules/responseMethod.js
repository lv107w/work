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

function setCORSHeader (req, res) {
  let method = req.method
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", '*');
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
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
}

module.exports = {
  responseJSON, responseBinary, responseHTML, responsePlain, setCORSHeader
}