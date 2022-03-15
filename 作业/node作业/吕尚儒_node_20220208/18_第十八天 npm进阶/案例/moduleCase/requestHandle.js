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

//如果请求的是服务器上的静态文件 根据请求pathname 获取文件名 以及文件路径  通过fs模块读取文件 res返回给前端

/*
  1. 需求是否明确 (知不知道要做什么 目标)
    //接收到一个req 根据req的 pathname请求路径  获取所需文件的 名称和地址
    根据文件名和地址 通过fs模块 读取文件进行判断 => 把读取的文件返回给前端 res
  2. 所需资源 所需工具
    1. pathname 请求地址 资源路径 => req获取pathname
    2. 设置静态资源路径 path.join(process.cwd(),'/static/image/1.png')
    3. fs readFile(回调 res) createReadStream+pipe
    4. fs stat => err || isDirectory() || isFile()
    5. response 
      1. res setHeader (content-type)
      2. res statusCode 200
      3. res write res end
  3. 根据需求 整理思路 和 流程 完善业务代码 进行测试
    1. 创建一个demo 文件 单独测试 这个方法是否成功

*/
function getStatic (req, res) {
  console.log(`router: /static 请求静态资源`)
  // /static/image/1.png
  let pathname = url.parse(req.url).pathname
  let fileName = path.parse(pathname).base
  let filePath = path.join(root, pathname)
  const normalPicUrl = path.join(root, '/static/image/','/p449897379.jpg')
  fs.stat(filePath, (err, stats) => {
    if(err){
      resStatus(res,'SUCCESS')
      res.setHeader('content-type', mime(pathname))
      fs.createReadStream(normalPicUrl).pipe(res)
      return 
    }
    if (stats.isDirectory()) {
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