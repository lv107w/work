const express = require('express')
const http = require('http')

let app = express()

app.post('/', (req, res, next) => {
  console.log('post 捕获 request.method 是 POST 的请求3')
  next()
})


//在这之前会调用app.param('pat'...)
app.use('/:pat', (req, res, next) => {
  console.log(req.pat, '3');
  console.log('use 不区分request的method进行捕获');
  next()
})



app.get('/set', (req, res, next) => {
  console.log('get 捕获 request.method 是GET请求');
  next()
})


//会优先调用
app.param('pat', (req, res, next, id) => {
  console.log('1 param: ', req.params)
  req.pat = req.params
  console.log(req.pat, '2');
  next()
})

app.use((req, res, next) => {
  res.send('ok')
})

const server = http.createServer(app)
server.listen(3008)
server.on('listening', () => {
   console.log('端口3008建立链接');
})
server.on('request', (req) => {
  console.log(`请求:${req.url}`);
})