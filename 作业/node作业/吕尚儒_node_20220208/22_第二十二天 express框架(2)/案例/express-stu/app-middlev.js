const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')

let app = express()
//中间件 
/*
  应用中间件
    任何请求到访 不识别路由 
    单纯对所有request 做基础的处理

    例: 获取request 请求内容 解析之后  挂载到req.query req.body 

    对于请求通用级的处理


  路由中间件

    区分不同请求的路由 实现对应引导和业务办理

  错误处理中间件

*/

const errMap = {
  '9008': "您无权访问此端口"
}

//应用中间件 记录访问IP count计数
app.use((req, res, next) => {
  let ip = req.ip
  // 日志文件中添加 一条 ip访问信息  日志中更新 当日访问总数
  next()
})

//路由中间件
app.use('/login', (req, res, next) => {
  //根据req参数获取用户名 密码 进行登录验证 验证结果 res 返回
  let username = req.query
  console.log(username)
  fs.readFile(`/${username}`, (err, data) => {
    if (err) {
      next(err)
    }

  })
})

//错误处理中间件
app.use(function (err, req, res, next) {
  let msgCode = err.message
  //根据错误类型 错误描述 区分对应返回给客户端的信息
  res.json({ errMsg: msgCode })
});


//错误处理中间件


// console.info(app)

http.createServer(app).listen(3001, function () {
  console.log(`express 服务已开启 监听 3001 端口`)
})



