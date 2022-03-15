const express = require('express')
const path = require('path')
const http = require('http')

let app = express()

// 调用内置中间件 以urlencoded方法来解析request请求内容
// app.use(express.urlencoded())
app.use('/user/:pat', (req, res, next) => {
  // console.log(req.baseUrl);
  // console.log(req.body, 'body');
  // console.log(req.params);
  // console.log(req.cookies);
  // console.log(req.hostname);
  // console.log(req.query);
  // console.log(req.get('content-type'));
  // console.log(req.get('Cookie'));

  // res.json({a:1, b:2})
  // res.jsonp({token: '123456'}) //http://127.0.0.1:3008/user/get?callback=mf
  console.log(path.join(__dirname, '/public/image/a.jpg'));
  res.sendFile(path.join(__dirname, '/public/image/a.jpg'))
  next() 
})

app.use(() => {
  console.log('123456');
  // next() //如果开启next() res.sendFile会报错Can't set headers after they are sent.
})

let server = http.createServer(app)
server.listen(3008)
server.on('listening', () => {
  console.log('端口3008启动');
})
server.on('request', (req) => {
  console.log(`请求:${req.url}`);
})