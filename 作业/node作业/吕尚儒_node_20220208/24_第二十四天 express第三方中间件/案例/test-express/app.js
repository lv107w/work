const http = require('http')
const express = require('express')
const createError = require('http-errors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const fs = require('fs')




const app = express()

// var logStream = fs.createWriteStream(path.join(process.cwd(), '/logs/app-msg.log'), { flags: 'a' })
// console.log(path.join(process.cwd(), '/logs/app-msg.log'))


//morgan 参数 format日志格式 
app.use(morgan('combined'))
app.use(cors({
  "origin": true, //true 设置为 req.origin.url
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
  "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 1728000, //options预验结果缓存时间 20天
  "credentials": true, //携带cookie跨域
  "optionsSuccessStatus": 200 //options 请求返回状态码
}))

app.use(cookieParser());

app.use(express.json())



app.use('/login', (req, res, next) => {


})
app.use('/sigin', (req, res, next) => {


})

app.use('/user', (req, res, next) => {
  console.log(req.cookies, 'cookie 内容')
  res.header("Set-Cookie", "ua_token=39218397218931")
  res.send(200, 'ok')
})


app.use((req, res, next) => {
  //返回404
  let err = createError(404)
  next(err)
})

app.use((err, req, res, next) => {
  // console.error(err.message)
  // console.info(err)
  res.status(err.status || 500)
  res.json({ errMsg: err.message })
  // throw err //给请求端返回错误信息后 抛出错误 node服务关闭 pm2 会记录 throw抛出的错误 之后重启
})







http.createServer(app).listen(3001, function () {
  console.log(`端口3001 已开启`)
})

// process.on('uncaughtException', err => { //语法 堆栈错误 promise.then().catch()
//   console.error(err, 'promise')
//   process.exit(1)
// })

// process.on("unhandledRejection", (reason, p) => { //语法 堆栈错误 promise.then().catch()
//   console.error(reason, "promise not which catch", p)
// })

/*
  node server 中抛出系统错误

*/