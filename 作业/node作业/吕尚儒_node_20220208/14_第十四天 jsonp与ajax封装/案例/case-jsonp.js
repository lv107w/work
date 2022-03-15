const { http, url, path, fs, multiparty, querystring } = require('./modules/httpRequire')

http.createServer(function (req, res) {
  const pathname = url.parse(req.url).pathname
  const method = req.method.toUpperCase()
  const requestContentType = req.headers?.['content-type']
  console.log(`${method} HTTP/${req.httpVersion} ${req.url}`)

  let { ext, base, name } = path.parse(pathname)
  console.log(ext, base, name)

  // fs.readFile('./upload/' + base, function (err, data) {
  //   if (err) {
  //     throw err
  //   }
  //   console.log(data.toString('utf8'))
  //   res.writeHead(200, { 'content-type': 'text/plain;charset=utf8' })
  //   res.write(data.toString('utf8'))
  //   res.end()
  // })

  if (pathname === '/jsonp') {
    let params = url.parse(req.url, true).query
    console.log(params)
    let data = JSON.stringify({ a: 1, b: 2 })
    res.write(`window['${params.callback}']('${data}')`) // "callback('{a:1,b:2}')"
    res.end()
  }




}).listen(3001, function () {
  console.log('3001 启动 application/json')
})

function shuntContentType (type) {
  type = mime(type).trim()
  const contentType = {
    'application/x-www-form-urlencoded': 'url',
    'multipart/form-data': 'form',
    'text/plain': 'text',
    'application/json': 'json'
  }
  return contentType?.[type]
}


function mime (type) {
  return type?.split(';')[0]
}

function queryURLFromat (req) {
  let queryStr = url.parse(req.url, true)
  let params = queryStr.query
  let requestParamStr = Object.entries(params).reduce((acc, [key, value]) => {
    let paramsStr = `参数名称: ${key}, 参数值: ${value} \n`
    acc += paramsStr
    return acc
  }, `请求参数为 : \n`)
  return {
    json: params,
    str: requestParamStr
  }
}

