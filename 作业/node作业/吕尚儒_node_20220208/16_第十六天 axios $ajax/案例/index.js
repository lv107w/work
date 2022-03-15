const { start } = require('./moduleCase/server')
const { route } = require('./moduleCase/router')
const { into, getDbMovie, getStatic } = require('./moduleCase/requestHandle')

const routeMap = {
  '/index': into,
  '/dbmovie': getDbMovie,
  '/static': getStatic
}

start(route, routeMap)




















/*

 node 原生封装 server

 支持 GET POST 请求

 支持 跨域

 解析静态资源请求 js png jpg html css

 动态接口请求 dbmovie 设置请求分页  => 预存懒加载ajax 瀑布流

 路由接口封装
  '/index': 返回主页 HTML
  '/dbmovie': 返回jsonString 数据
  '/static': 返回对应静态文件

 mime 解析映射

  req

    info{
      url
      method
      origianl
    }

    请求内容 => queryParse (JSON queryString)

  res
    fs

*/