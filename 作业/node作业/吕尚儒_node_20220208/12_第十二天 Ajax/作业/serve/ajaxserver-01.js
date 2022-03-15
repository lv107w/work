const http = require('http')
const multiparty = require('multiparty')

http.createServer((req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with,Authorization,token, content-type"); //这里要加上content-type 
  res.setHeader("Access-Control-Allow-Credentials", "true");

  let form = new multiparty.Form({
    uploadDir: '../upload'
  })

  form.parse(req)
  //接收文件数据
  form.on('file', (name, file) => {
    console.log('文件', name, file);
  })
  //接收普通数据 
  form.on('field', (name, value) => {
    console.log('文件', name, value);
  })

  form.on('close', () => {
    console.log('完成');
  })

  res.writeHead(200)
  res.write('123546')
  res.end()
}).listen(8088)