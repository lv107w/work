const express = require('express')
const http = require('http')
const router = require('./routes/login')

const app = express()
app.use('/login', router)

const server = http.createServer(app)
server.listen(3001, ()=> {
  console.log('3001端口启动');
})
