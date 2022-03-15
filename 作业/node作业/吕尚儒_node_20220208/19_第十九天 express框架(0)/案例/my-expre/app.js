const express = require('express')
const http = require('http')
const path = require('path')
const url = require('url')

let app = express()
// 调用内置中间件 以urlencoded方法来解析request请求内容
app.use('/user', function (req, res, next) {
  console.log('user')
  //http://localhost:3008/user/get?username=kyogre&pwd=2132131231
  // console.log(req.baseUrl, 'baseUrl') // /user/get pathname 请求资源地址路径
  // console.log(req.body, 'body') // post请求的 请求主体内容
  // console.log(req.params, 'params') //:二级path路径的匹配值 {} params.path => get
  // console.log(req.cookies, 'cookies') // request 客户端携带cookie
  // console.log(req.hostname, 'hostname') // 请求主机地址
  // console.log(req.query, 'query') // queryString => json username=kyogre&pwd=2132131231 =>  { username: 'kyogre', pwd: '2132131231' } url地址上的参数
  // console.log(req.get('content-type'))
  // console.log(req.get('Cookie'))

  // res.json({a:1,b:2}) // 返回String类型的json
  // res.send() //动态根据参数内容设置对应的响应content-type
  // res.sendFile(path.join(__dirname, '/public/image/a.jpg'))// 返回文件 文件地址 必须是绝对路径 根据返回的文件类型动态设置 content-type

  // /user/get?callback=mf
  // res.json({ path: '/user' }) //返回一个 text/javascript 的 js文件 内容为 mf(回调参数)
  next()
  // res.sendStatus(404) //相当于 res.status(404).send('Not Found')
})

app.use('/user/get', function (req, res, next) {
  console.log('user/get')
  next()
})

// app.use(function (req, res, next) {
//   res.status(404)
//   res.json({ path: 'not found' })
//   // res.send('警告 非法访问 找不到页面')
// })

http.createServer(app).listen('3008', function () {
  console.log(`listen: ${3008} 服务已启动`)
})