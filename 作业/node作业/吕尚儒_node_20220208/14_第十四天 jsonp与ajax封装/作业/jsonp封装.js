const http = require('http')
const url = require('url')
const path = require('path')

http.createServer((req, res) => {
  console.log(url.parse(req.url));
  const pathname = url.parse(req.url).pathname

  if(pathname === '/jsonp') {
    let params = url.parse(req.url, true).query
    let data = Object.entries(params)
    data.pop()
    data = data.reduce((acc, curr) => {
      console.log(curr);
      acc[curr[0]] = curr[1]
      return acc
    },{})
    console.log(data);
    
    res.write(`window['${params.callback}'](${JSON.stringify(data)})`)
    res.end()
  }
}).listen(3001, () => {
  console.log('3001 启动服务');
})