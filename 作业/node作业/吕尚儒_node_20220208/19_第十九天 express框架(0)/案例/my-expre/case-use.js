const express = require('express')
const http = require('http')
const path = require('path')
const url = require('url')

let app = express()

//中间件1
app.use((req, res, next) => {
  console.log("中间件1");
  app.locals.method = req.method
  next();// 调用下一次app.use中的回调处理函数
})
// 第二个中间件
app.use('/', (req, res, next) => {
  console.log("中间件2");   //继续执行第二个中间件
  console.log(app.locals.method)
  res.append('ao-token', '123123123') //res.header 追加内容
  next();
})
// 第三个中间件
app.use('/user', (req, res, next) => {
  console.log("中间件3");
  res.send('中间件3')
  // res.send('hello');       // 终结请求-响应循环
})
// 第四个中间件 /user/* /user:pathname req.params获取pathname对应的值
app.use('/user:pathname', (req, res, next) => {
  console.log("中间件4");   // 中介后的中间件不再执行
});

// 匹配任意 /user 开头的二级路由 /user/get /user
app.use('/user/*', (req, res, next) => {
  console.log("中间件4");   // 中介后的中间件不再执行
});


// /abcd /abd 这两个都请求都能匹配 c? c可以有可以没有
app.use('/abc?d', function (req, res, next) {
  next();
});

// abcd abbcd abbbbbcd + 正则中的 最少一次   n+ n最少连续性出现一次
app.use('/ab+cd', function (req, res, next) {
  next();
});

// /abcd /ab任意值cd 
app.use('/ab\*cd', function (req, res, next) {
  next();
});
// /ad /abcd
app.use('/a(bc)?d', function (req, res, next) {
  next();
});


// 直接写正则 `/abc` and `/xyz`:
app.use(/\/abc|\/xyz/, function (req, res, next) {
  next();
});

// 数组中存放正则 和 路径名称 `/abcd`, `/xyza`, `/lmn`, and `/pqr`:
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) {
  next();
});



http.createServer(app).listen('3008', function () {
  console.log(`listen: ${3008} 服务已启动`)
})




/*
  请求开始 ->  处理流程 [中间件1,中间件2,中间件3]-> 响应结束

*/