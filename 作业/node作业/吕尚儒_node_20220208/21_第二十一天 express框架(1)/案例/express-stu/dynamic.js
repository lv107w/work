const express = require('express')
const fs = require('fs')
const http = require('http')
const multer = require('multer')
const path = require('path')
let app = express()

const storage = multer.diskStorage({
  destination (req, file, cb) {
    // req 中间件处理 请求时 
    // file 上传的文件
    // cb  参数 this指向 , 存放文件的位置

    let userUid = req.params['uid'] // uid3304
    let uploadPath = req.params['upath']

    let uidPath = path.join(__dirname, `./uploads/uid${userUid}`)
    fs.existsSync(uidPath) || fs.mkdirSync(uidPath)
    uidPath = path.join(uidPath, `./${uploadPath}`)
    fs.existsSync(uidPath) || fs.mkdirSync(uidPath)

    cb(null, uidPath)
  },
  filename (req, file, cb) {
    // req 请求 中间件带过来的 reqest对象
    // file 上传的文件对象
    // cb 回调处理 参数 this, 文件存储名

    let { ext, name } = path.parse(file.originalname)
    cb(null, `${name}-${Date.now()}${ext}`)
  }
})

let upload = multer({ storage })

app.use('/user/:uid/upload/:upath', upload.single('file'), (req, res, next) => {
  res.send(`${req.file.filename} 上传完毕 `)
})

//multer 中间件会给 req对象挂3个属性 body file files

// app.use('/', upload.single('file'), (req, res, next) => {
//   console.log(req.file)
//   res.send('文件上传成功')
// })




// app.use('/user/:uid/setname', (req, res, next) => {
//   let uid = req.params['uid']
//   let setname = req.query['name']
//   fs.readFile('./userData/user.json', 'utf8', (err, data) => {
//     if (err) {
//       console.log(err)
//     }
//     let userArr = JSON.parse(data)
//     let userIdx = userArr.findIndex(item => item['user_uid'] === uid)
//     if (userIdx !== -1) {
//       userArr[userIdx]['user_name'] = setname
//     }
//     let userStr = JSON.stringify(userArr)
//     fs.writeFile('./userData/user.json', userStr, { flag: 'w+' }, () => {
//       res.send(`UID: ${uid} 用户的 name 设置为 ${setname}`)
//       next()
//     })
//   })
// })

// /user/4040/upload/avatar

// uploads/uid4040?/avatar?/xxx.png

// uid4040 not Found  mkdir uid4040

// uid4040 > avatar not Found mkdir avatar


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










const server = http.createServer(app)
server.listen(3008)

server.on('listening', () => {
  console.log('端口 3008 建立连接')
})
server.on('request', (req) => {
  console.log(`请求: ${req.url}`)
})