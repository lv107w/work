const express = require('express')
const fs = require('fs')
const http = require('http')
const path = require('path')


// const loginRouter = require('./routes/login')

let app = express()

//处理content-type为 application/json 的请求内容解析后挂载到 req.body上
// app.use(express.json())
// 处理content-type为 x-www-urlencode 的请求内容解析后挂载到 req.body上
// app.use(express.urlencoded({
//   extended: true
// }))


// app.use('/user', (req, res, next) => {
//   console.log(req.body);
//   res.send(200, 'ok')
// })

// app.use(express.static(path.join(__dirname, '/public')), (req, res, next) => {
//   next()
// })
app.use('/images/*', (req, res, next) => {
  console.log(req.baseUrl);
  next()
})
app.use((req, res, next) => {
  console.log(123456);
})

http.createServer(app).listen(3001, () => {
  console.log(`express 3001端口 服务已开启`);
})