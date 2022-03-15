const { http, url, path, fs, querystring } = require('./httpRequire')
const { root } = require('./config')
const { mime } = require('./mime')
const { getParam } = require('./utils')
const {resFile, resJSON, resStatus, resText} = require('./responseMethod')
const { getMovieData} = require('./dataPipe')


function into (req, res) {
  console.log(`router: / or /index 请求入口html `)

  resStatus(res,'SUCCESS')
  resFile(res,'<!doctype html><html><head><title>index</title></head><body><h1>welcome to my Node Server</h1></body></html>','html')

}

function getStatic (req, res) {
  console.log(`router: /static 请求静态资源`)

  let pathname = url.parse(req.url).pathname
  let fileName = path.parse(pathname).base
  let filePath = path.join(root, pathname)
  fs.stat(filePath, (err, stats) => {
    if (err || stats.isDirectory()) {
      resStatus(res,'NOT FOUND')
      resText(res,`${fileName} 404 Not Found`)
      return 
    }
    if (stats.isFile()) {
      resStatus(res,'SUCCESS')
      res.setHeader('content-type', mime(pathname))
      //创建一个文件读取流 读取结果直接 提交给res 返回给客户端
      fs.createReadStream(filePath).pipe(res)
    }
  })
}

function getDbMovie(req,res){
  getParam(req,function(reqData){
    let { start=0,count=10 } = reqData
    start = Number(start)
    count = Number(count)
    getMovieData(start,count,function(resData){
      resJSON(res,resData)
    })
  })
  //http://127.0.0.1:3001/dbmove?start=0&count=10
  //返回 第0到9条数据
}


module.exports = {
  getStatic,into,getDbMovie
}


 // /static/image/bird.png

  /*
    1. 根据pathname 拆分出请求资源的 ext base name
    2. 根据pathname 确定文件所在路径
    3. fs 读取对应路径文件 
      1. 读取判断是否是 文件  mime模块支持
        1. 是文件 => 读取文件流 返回 同时设置返回content-type image/png
          
  */