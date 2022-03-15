const express = require('express')
const http = require('http')
const path = require('path')

let app = express()
app.locals.kyogreName = 'zhagnsan'
app.set('hahah', 'heiheihei')
console.log(app.get('env')) //默认为 开发环境 development
console.log(app.get('views'))// express 应用

const staticPath = path.join(__dirname, '/static')

console.log(app.set('view engine')) // 对app对象属性的获取方法

// app.get('/', function () { }) // method 路由

//view engine 设置模板引擎类型

// dust|ejs|hbs|hjs|jade|pug|twig|vash

//jsonp callback name   ?callback= 基本不需要修改

app.use('/jsonp?callback=fn', (req, res, next) => {
  //默认识别的jsonp回调函数为 callback
  res.jsonp({ a: 1, b: 2 })
})


// console.info(app)

http.createServer(app).listen(3001, function () {
  console.log(`express 服务已开启 监听 3001 端口`)
})



