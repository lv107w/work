const { path } = require("./httpRequire")

function route (pathname, handle, req, res) {
  // / or /index  => 访问主页
  // /dbmovie?start=0&count=20
  // 

  /*
    const routeMap = {
      '/index': into,
      '/dbmovie': getDbMovie,
      '/static': getStatic
    }
  
  */
  if (pathname === '/') {
    pathname = '/index'
  }
  // /static/image/1.png  '/static'

  /*
     {
      '/index': into,
      '/dbmovie': getDbMovie,
      '/static': getStatic
    } => [['/index',into],['/dbmovie',getDbMovie]].filter()
   /^\/index/.test('/static/image/1.png') => [['/static',getStatic]][0][1]
    过滤出了 对应pathname的路由处理方法
   getStatic()

   request 接收请求的对象
   response 返回响应的对象
  */
  let handMethod = Object.entries(handle).filter(([key, value]) => {
    let regExp = new RegExp(`^${key}`, 'g')
    return regExp.test(pathname)
  })?.[0]?.[1]

  if (typeof handMethod === 'function') {
    handMethod(req, res)
  }


  if (pathname === '/favicon.ico') {
    res.statusCode = 200
    res.end()
    return
  }



  console.log(`路由 地址为${pathname}`)


}

module.exports = {
  route
}