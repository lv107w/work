const express = require('express')
const { fstat } = require('fs')
const http = require('http')
let app = express()


// app.enable('toggle') // 设置全局属性 toggle 值为 true
// app.disable('switch')
// console.log(app.get('toggle'), app.get('switch'))

//洋葱模型 事件会在中间件层之间 顺序传递 所有中间件层 调用结束后 事件冒泡传递

// 模块化处理流程中 条件后决 灵活处理


//不过滤对应请求地址 应用中间件

app.use((req, res, next) => {
  console.log(req['queryNameA'], 'into 1')
  next()//中间件2()
  if (req['queryNameA']) {
    fs.createWriteStream()
  }
  console.log(req['queryNameA'], 'out 1') // kyogre 成功拿到req上自定义属性的值
})

//根据query 给 req对象挂上对应的 query[key] 属性
app.use((req, res, next) => {
  console.log(req['queryNameA'], 'into 2')
  let { name } = req.query
  req['queryNameA'] = name;
  next()// 中间件1() 如果后续没有中间件层 调用到这里就结束了 开始返回
  console.log(req['queryNameA'], 'out 2')
})






// /set/* *会存储在req.params['prop']
// app.use('/set/:prop', (req, res, next) => {
//   console.log(req.url)
//   let prop = req.params['prop']
//   let { value } = req.query
//   app.set(prop, value)
//   console.log(prop)
//   res.send('ok')
//   next()
// })

// app.use((req, res, next) => {
//   console.log(`${app.get('name')} 获取express 中存储的 name属性`)
//   next()
// })




const server = http.createServer(app)
server.listen(3008)

server.on('listening', () => {
  console.log('端口 3008 建立连接')
})
server.on('request', (req) => {
  console.log(`请求: ${req.url}`)
})