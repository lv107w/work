const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')
const querystring = require('querystring')
const multiparty = require('multiparty')
//POST user 请求服务
http.createServer((req, res) => {
  let reqMethod = req.method;
  let reqUrl = req.url;
  let pathname = url.parse(reqUrl).pathname
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with,Authorization,token, content-type"); //这里要加上content-type 
  res.setHeader("Access-Control-Allow-Credentials", "true");

  console.log(req.headers)

  if (pathname !== '/upload') {
    res.write('路径不正确 非诚勿扰')
    res.end()
    return false;
  }

  if (reqMethod === 'GET') {
    res.write('不接受get请求, 请回吧')
    res.end()
    return false;
  }

  let form = new multiparty.Form({
    uploadDir: '../upload'//指定上传的文件路径
  });

  form.parse(req);
  //接收普通数据
  form.on('field', (name, value) => {
    // name:字段名
    // value:值
    console.log('数据:', name, value);

  })
  //接收文件数据
  form.on('file', (name, file) => {
    console.log('文件:', name, file);
  })


  //表单解析完成
  form.on('close', () => {
    console.log('完成');
  })

  res.writeHead(200)
  res.write('123')
  res.end()
}).listen(8088)



