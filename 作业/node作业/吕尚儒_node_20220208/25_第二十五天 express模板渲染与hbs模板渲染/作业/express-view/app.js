const http = require('http')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use('/', (req, res, next) => {
  let Htemp = hbs.handlebars.compile("<h1>hell hbs{{data}}</h1>")
  res.render('index', {
    html: Htemp({data: '你好hbs'}),
    title: "express hbs 模板渲染",
    msg: "你好 访问者",
    list: ["黄瓜","西瓜", "蔬菜"],
    orderList: [
      {
        host: true,
        price: 999,
        name: '吸尘器',
        detail: {
          commit: [
            'aaaa',
            'bbbbb'
          ]
        }
      },
      {
        host: false,
        price: 10000,
        name: '油烟机',
        detail: {
          commit: [
            'aaaa',
            'bbbbb'
          ]
        }
      },
      {
        host: false,
        price: 222,
        name: '手机',
        detail: {
          commit: [
            'aaaa',
            'bbbbb'
          ]
        }
      }
    ],
    obc: {"name": 'kyogre', "age": 13}
  })
})

http.createServer(app).listen(3001, () => {
  console.log('3001端口开启');
})