const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')
const querystring = require('querystring')

/*
  http



    交互
     请求 
      request
     响应
      response
  

*/
let myServer = http.createServer(function (request, response) {

  // console.log(request.method) //请求方式
  // console.log(request.url) //请求地址
  // console.log(request.httpVersion) //请求HTTP协议版本
  console.log(`请求起始行信息: ${request.method} ${request.url} HTTP\\${request.httpVersion}`)
  console.log(request.headers);


  //监听请求内容获取
  request.on('data', (chunk) => {
    //post requestContent内容获取为Buffer
    console.log(chunk.toString('utf8'))
  })

  //监听请求内容获取完毕
  request.on('end', () => {
    console.log('数据读取完毕')
  })
  /*
    content-type: application/x-www-form-urlencoded 表单内容 form data
    'content-length': '22',
  */
  // console.log(url.parse("http://127.0.0.1:3001/user?user=asdf123&pwd=21312312"))

  /*
  protocol: 'http:', //协议头
  slashes: true, //是否是斜杠
  auth: null, 
  host: '127.0.0.1:3001', //主机
  port: '3001', //端口
  hostname: '127.0.0.1', //主机名
  hash: null, //哈希
  search: '?user=asdf123&pwd=21312312', //查询内容
  query: 'user=asdf123&pwd=21312312', //查询条件
  pathname: '/user', //资源路径名称
  path: '/user?user=asdf123&pwd=21312312', //资源路径
  href: 'http://127.0.0.1:3001/user?user=asdf123&pwd=21312312'
  
  */
  //请求头
  // console.log(request.headers)




  // 请求URL
  /*
  http://127.0.0.1:3001/user?user=asdf123&pwd=21312312

  协议://主机地址:端口/资源地址(?查询)参数1=参数1值&参数2=参数2值&...&参数n=参数n值

  */

  /*
    response 
      设置返回首部

      设置返回主体 

      设置完成 end结束 进行返回
  */
  response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8' })
  response.write('这是response 响应返回的信息')
  response.end();

})

myServer.listen(3001)


