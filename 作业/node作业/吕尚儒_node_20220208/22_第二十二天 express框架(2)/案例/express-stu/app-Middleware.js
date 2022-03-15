const express = require('express')
const fs = require('fs')
const http = require('http')
const path = require('path')

const loginRouter = require('./routes/login')

let app = express()

// 调用 内置 express 应用 中间件 json() 处理content-type为 application/json 的请求内容解析后挂载到 req.body上
// app.use(express.json())
// // 处理content-type为 x-www-urlencode 的请求内容解析后挂载到 req.body上
// app.use(express.urlencoded({
//   extended: true
// }))
// 处理静态资源请求的中间件 static
// /images/h1.jpg  => /public/images/h1.jpg  // nginx 代理静态资源 
app.use(express.static(path.join(__dirname, '/public')))

// app.use('/images/*', (req, res, next) => {
//   if (req.baseUrl === '/images/h1.jpg') {
//     fs.rename('./public/h1.jpg', './public/images/h1.jpg', () => {
//       console.log('文件放置成功')
//       res.redirect('/images/h1.jpg')
//       next()

//     })
//   }
// })

/*
options
{
  limit: 100, //请求内容的最大字节数
  type: "application/json" //限制请求content-type的类型
}
*/

// // POST http://127.0.0.1:3001/login/pwd  application/json  {json数据}
// app.use('/login/:auto', (req, res, next) => {
//   console.log(req.body) // express.json 中间件 会处理 request中 json的请求内容 解析后 挂载到 req.body上 并且 已JSON.parse

//   res.send(200, 'ok')
// })

// // 解析 urlencode 请求内容
// app.use('/sigin', (req, res, next) => {
//   console.log(req.body) // express.urlencode 中间件 会处理 request中 json的请求内容 解析后 挂载到 req.body上 并且 已JSON.parse

//   res.send(200, 'ok')
// })




http.createServer(app).listen(3001, function () {
  console.log(`express 服务已开启 监听 3001 端口`)
})



