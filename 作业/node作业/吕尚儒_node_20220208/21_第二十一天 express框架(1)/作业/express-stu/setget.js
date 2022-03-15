const express = require('express')
const http = require('http')

let app = express()




// 洋葱模型 
// 模块化处理流程中 条件后决 灵活处理
app.use((req, res, next) => {
  //http://127.0.0.1:3008/user?name=132456
  console.log(req['queryNameA'], 'into1'); //undefined into1
  next()
  console.log(req['queryNameA'], 'out1');  //132456 out1
})

app.use((req, res, next) => {
  console.log(req['queryNameA'], 'into2'); //undefined into2
  let { name } = req.query
  req['queryNameA'] = name
  next()
  console.log(req['queryNameA'], 'out2');  //132456 out2
})



app.enable('toggle')
app.disable('switch')

console.log(app.get('toggle'));
console.log(app.get('switch'));

app.use('/set/:prop', (req, res, next) => {
  http://127.0.0.1:3008/set/user?name=123456&&value=kkkk
  console.log(req.url) // /?name=123456
  let prop = req.params['prop']
  let {value} = req.query
  app.set(prop, value)
  console.log(prop);
  console.log(value);
  res.send('ok')
  next()
})

app.use((req, res, next) => {
  console.log(`获取express 中存储的 user属性${app.get('user')}获取express 中存储的 user属性`);
})


const server = http.createServer(app)
server.listen(3008)
server.on('listening', () => {
  console.log('端口3008建立链接');
})
server.on('request', (req, res) => {
  console.log(`请求: ${req.url}`);
})