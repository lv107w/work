const url = require('url')
const fs = require('fs')
const path = require('path')
const multiparty = require('multiparty') //解析表单提交内容的

exports.dataRouter = function (req, res) {
  let pathname = url.parse(req.url).pathname
  if (!(/data/g.test(pathname))) {
    return false;
  }
  res.writeHead(200, { 'Content-Type': 'text/palin;charset=utf8' })
  let form = new multiparty.Form({
    uploadDir: '../upload',//指定上传的文件路径
  });
  form.parse(req, function (err, field, files) {
    if (err) {
      throw err
    }
    if (files) {

      console.log(files) //表单内的file文件字段对象
      let { path, fieldName, size } = files['avatar'][0]
      setTimeout(function () {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
        res.write(`
      <!DOCTYPE html>
        <html lang="zh-cn">

        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        </head>

        <body>
        这是返回的页面 ${fieldName}
        <img src="${path}" alt="">

        </body>

        </html>
      `)
        res.end()
      }, 20000)

    }
  })
}