const http = require('http')
const fs = require('fs')
const express = require('express')
const path = require('path')
const hbs = require('hbs')


const app = express()
app.use(express.static(path.join(process.cwd(), '/public')))

app.set('views', path.join(__dirname, 'views')); //设置模板view所在目录
app.set('view engine', 'hbs'); //设置模板引擎类型 hbs




app.use('/', (req, res, next) => {
  // res.send(200,{a:123})
  // res.json(200, { name: "ok" })

  // compile 方法(模板内容) return 一个方法 template 使用这个方法可以直接渲染 compile编译的模板内容
  let hTemp = hbs.handlebars.compile("<h1>你好 哈哈哈哈哈 {{data}}</h1>")
  res.render('index',
    {
      html: hTemp({ data: "opouiooio" }),
      title: "express hbs 模板渲染",
      msg: "你好 访问者",
      list: ["黄瓜", "玉米", "茄子"],
      orderList: [
        {
          hot: true,
          price: 999,
          name: "吸尘器",
          detials: {
            commit: [
              "aaaa",
              "bbbb"
            ]
          }
        },
        {
          hot: false,
          price: 12222,
          name: Date.now(),
          detials: {
            commit: [
              "aaaa",
              "bbbb"
            ]
          }
        },
        {
          hot: false,
          price: 222,
          name: "语音助手 <",
          detials: {
            commit: [
              "aaaa",
              "bbbb"
            ]
          }
        }
      ],
      obc: { "name": "kyogre", "age": 13 }
    })


  /*

    

    res.render (模板名称 ,{ 模板数据对象},渲染回调函数)
    
    通过模板名称  结合 view engine 属性值 识别模板文件类型

    index.hbs 文件路径 查询 views 属性获取 index.hbs所在目录

    读取index.hbs 模板内容 

    htmlStr = hbs.template(模板内容,模板数据对象)

    res.send(200,htmlStr)

    如果存在 layout.hbs

    index.hbs编译好的内容 作为 body 传给layout.hbs再次包装渲染
    渲染完成之后输出 layout(index)



  
  */

  // res.sendFile('./index.html', {}) //发送文件内容 无法插入变量进行动态修改
})


http.createServer(app).listen(3000, function () {
  console.log(`listen 3000 port`)
})