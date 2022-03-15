const http = require('http')

http.createServer((req, res) => {

  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.setHeader('Access-Control-Max-Age', 1728000);

  // res.writeHead('content-type', 'text/plain;charset=utf8')

  // res.write('dadadad')
  // res.end()
  req.on('data', (chunk) => {
    console.log(chunk.toString());
    res.write('dada')
    res.end()
  }) 
}).listen(3005, () => {
  console.log('3005端口启动');
})