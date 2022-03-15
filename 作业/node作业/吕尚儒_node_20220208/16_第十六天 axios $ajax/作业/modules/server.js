const { http, url, path } = require('./httpRequire')
const {port, host, root} = require('./config')
function start(router) {
  http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname
    let method = req.method.toUpperCase()
    console.log(`来自请求${pathname} 请求方式为 ${method}`)

    //router路由模块 处理不同资源的请求
    // router()
  }).listen(port, () => {
    console.log(`${host}: ${port}开启服务`);
  })
}

module.exports = {
  start
}