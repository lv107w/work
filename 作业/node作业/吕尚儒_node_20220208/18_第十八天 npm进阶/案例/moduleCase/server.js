const { http, url, path, fs, querystring } = require('./httpRequire')
const { port, host, root } = require('./config')
const { setCORSHeader } = require('./responseMethod')


/*
 *@func: start
 *@description: 创建node http 服务
 *@param: {module} router路由模块 处理不同资源的请求
 *@param: {Object} handle 路由映射map  pathname <==> 处理方法
 *@return: {type} 返回值
 *@author: 海牙
*/
function start (router, handle) {
  http.createServer(function (req, res) {
    let pathname = url.parse(req.url).pathname
    let method = req.method
    console.log(` 来自请求 ${pathname} 请求方式: ${method}`)
    setCORSHeader(req, res)
    router(pathname, handle, req, res)

  }).listen(port, function () {
    console.log(`${host}:${port} 服务开启`)
  })
}
module.exports = {
  start
}

