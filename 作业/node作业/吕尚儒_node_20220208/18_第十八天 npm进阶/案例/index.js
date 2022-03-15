//主程序模块入口文件 整合与调用 模块
const { start } = require('./moduleCase/server') //http服务层
const { route } = require('./moduleCase/router') //路由层
const { into, getDbMovie, getStatic } = require('./moduleCase/requestHandle') //业务层

const routeMap = {
  '/index': into,
  '/dbmovie': getDbMovie,
  '/static': getStatic
}

start(route, routeMap)
/*
  入口主模块 index
    http server层 start
    router 路由层 route
    routeMap 关联业务层与路由层
    { into, getDbMovie, getStatic } requestHandle 业务层


    工具方法
      mime => 根据文件后缀获取http传输的MIME类型
      responseMethod => {
        返回txt 返回json 返回file 响应头(响应status ) 跨域处理
      }
      httpRequire => 常用基础模块整合包
      config => 服务器的基础变量

*/








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