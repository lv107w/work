const express = require('express')
const http = require('http')
const path = require('path')

const loginRouter = require('./routes/login')

let app = express()

//路由中间件   // path/path/search?query
// /uid
// /login => 进入 router路由模块中间件处理   /uid

/*

  /login/auth/  第三方认证登录
  /login/sms/   短信登录
  /login/pwd/  密码登录

  登录总路由(类) /login 
      细分 
        /auth  =>  处理业务代码
        /sms   =>  处理业务代码
        /pwd   =>  处理业务代码 



*/

app.use('/login', loginRouter)







http.createServer(app).listen(3001, function () {
  console.log(`express 服务已开启 监听 3001 端口`)
})



