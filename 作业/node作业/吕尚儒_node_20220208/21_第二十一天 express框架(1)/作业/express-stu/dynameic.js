const express = require('express')
const fs = require('fs')
const http = require('http')
const multer = require('multer')
const path = require('path')


/*
  multer

  1. 生成一个磁盘缓存 (预设文件的存储地址 和 文件名) 
  let storage = multer.diskStorage({
                  destination(req,file,cb)
                      req 请求发展到multer中间件调用时的 request
                      file 上传的文件对象
                      可以在这里结合 req 和 file 提供的信息 动态的声明 修改 存储文件的路径
                      cb(contextThis,存储文件的路径)
                  filename
                      req 请求发展到multer中间件调用时的 request
                      file 上传的文件对象
                      可以在这里结合 req 和 file 提供的信息 动态的声明 修改 存储文件的文件名
                      cb(contextThis,文件的存储文件名)
                })
   
  2. 实例化 multer 中间件    
            let upload = multer({ storage })

  3. 路由中 监听对应上传文件 中间件

          app.use(文件上传api地址,upload.single(input的name属性值),后续处理中间件)

    请求进入 upload创建的multer中间件 => 
    获取req and input['name'] => 
    切二进制流 获取对应name的上传文件 =>
    调用destination 与 filename 函数 通过内部的 cb 实参 去寻找对应的地址存储文件 为 设置的对应文件名 => 
    next()

    multer文档地址 
    https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
  
*/


let app = express()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    //req中间件处理 请求
    //file 上传的文件
    //cb 参数this指向, 存放文件的位置
    let userid = req.params['uid'] //3304
    let uploadPath = req.params['upath']

    let uidPath = path.join(__dirname, `/uploads/uid${userid}`)
    fs.existsSync(uidPath) || fs.mkdirSync(uidPath)
    uidPath = path.join(uidPath, `/${uploadPath}`)
    fs.existsSync(uidPath) || fs.mkdirSync(uidPath)

    cb(null, uidPath)
  },
  filename(req, file, cb) {
    //req中间件处理 请求
    //file 上传的文件
    //cb 参数this指向, 文件储存名
    let {ext, name} = path.parse(file.originalname)
    cb(null, `${name}-${Date.now()}${ext}`)
  }
})

let upload = multer({storage})


app.use('/user/:uid/upload/:upath', upload.single('file'), (req, res, next) => {
  res.send(`${req.file.filename}上传完毕`)
})


const server = http.createServer(app)
server.listen(3008)
server.on('listening', () => {
  console.log('端口3008建立链接');
})
server.on('request', (req) => {
  console.log(`请求:${req.url}`);
})