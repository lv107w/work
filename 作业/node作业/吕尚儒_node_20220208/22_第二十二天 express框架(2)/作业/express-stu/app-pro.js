const express = require('express')
const http = require('http')
const path = require('path')

let app = express()

app.set('age', '12')
console.log(app.get('env'));
console.log(app.get('views'));
console.log(app.get('age'));

app.use('/jsonp?callback=fn', (req, res, next) => {
  res.jsonp({a: 1})
})

const server = http.createServer(app)
server.listen(3001, () => {
  console.log('3001端口启动');
})