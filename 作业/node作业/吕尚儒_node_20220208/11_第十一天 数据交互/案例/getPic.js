const { url, path, http, querystring, fs } = require('./modules/httpRequire')
const handlebars = require('handlebars')

const { uploadRouter } = require('./router/upload') //路由 图片资源
const { dataRouter } = require('./router/data') //路由 表单提交

// 异步情况下 res 如果已经 end 那就不可以在其他的异步时刻 再次 write和end
// 同一个请求不能返回两次

/*
  一次请求 
    /upload 入口
      => req,res => 
      async readFile()=> wait等待 异步队列 => res.write(ERROR-01) + res.end


    /data => 主栈同步 => res.write(html) => res.end()

    /data 先res.end() 先返回了内容并且 关闭了res通道


    ERROR-01:res在end之后 不容许继续 write写入返回内容

*/

http.createServer(function (req, res) {
  const method = req.method;
  let { pathname, search, query } = url.parse(req.url)
  uploadRouter(req, res)
  dataRouter(req, res)

}).listen(8080)

/*
  1. 前端表单提交内容 request node如何解析
    1. get
      请求会拼接到URL上
      http://localhost:8080/pathname?key=value&key=value
      node 使用 url.parse方法 切割得到对象
      {
        pathname:'pathname?key=value&key=value'
        search:'?key=value&key=value'
        query:'key=value&key=value'
      }
    2. post
      1. 有文件 => 前端提交需要设置enctype属性设置 请求头的content-type为multipart/form-data
      2. 没有文件=> 前端提交需要设置enctype属性设置 请求头的content-type为application/x-www-form-urlencoded 将表单内容解析为 key=value&key=value
      name="user" value="ooo" => user=ooo


  2. node response 返回内容
      1. res.writeHead() 设置返回的首部
       根据返回的内容设置对应的MIME Content-Type : MIME
      2. res.write() 设置返回内容(响应主体)
      3. res.end() 表示返回结束 关闭返回通道 之后无法继续res.write或者 res.end()





*/

