const express = require('express')
const http = require('http')
const fs = require('fs')

let app = express()

//应用中间件
app.use((req, res, next) => {
  let ip = req.ip
  next()
})

//路由中间
app.use('/login', (req, res, next) => {
  let username = req.query
  console.log(username);
  fs.readFile(`/${username}`, (err, data) => {
    if(err) {
      next(err)
    }
  })
})

//错误中间件处理
app.use((err, req, res, next) => {
  let message = err.message
  console.log(message);
  res.json({message: message})
})

http.createServer(app).listen(3001, () => {
  console.log('3001端口启动');
})