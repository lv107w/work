const express = require('express')
const { fstat } = require('fs')
const http = require('http')
let app = express()

//路由中间件 中间件可以嵌套传参 



app.use('/:pat', (req, res, next) => {
  console.log(req.pat, '2')
  console.log('use 不区分request的 method 进行捕获 3') //2
  next()
})




app.get('/', (req, res, next) => {
  console.log('get 捕获 request.method 是 GET 的请求')
  next()
})



app.post('/', (req, res, next) => {
  console.log('post 捕获 request.method 是 POST 的请求1')
  next()
}, (req, res, next) => {
  console.log('post 捕获 request.method 是 POST 的请求2')
  next()
}, (req, res, next) => {
  console.log('post 捕获 request.method 是 POST 的请求3')
  next()
})


app.param('pat', function (req, res, next, id) {
  console.log('1 params --------- ', req.params) // 1
  req.pat = req.params
  next()
});

app.post('/', (req, res, next) => {
  console.log('post 捕获 request.method 是 POST 的请求1')
  next()
})
app.post('/', (req, res, next) => {
  console.log('post 捕获 request.method 是 POST 的请求2')
  next()
})
app.post('/', (req, res, next) => {
  console.log('post 捕获 request.method 是 POST 的请求3')
  next()
})

app.delete('/', (req, res, next) => {
  console.log('delete 捕获 request.method 是 DELETE 的请求')
  next()
})

app.put('/', (req, res, next) => {
  console.log('put 捕获 request.method 是 PUT 的请求')
  next()
})

app.all('/', (req, res, next) => {
  console.log('VERB 所有method 都会捕获')
  next()
})



app.use((req, res, next) => {
  res.send('ok')
})







const server = http.createServer(app)
server.listen(3008)

server.on('listening', () => {
  console.log('端口 3008 建立连接')
})
server.on('request', (req) => {
  console.log(`请求: ${req.url}`)
})