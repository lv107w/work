const http = require('http')
const url = require('url')
const path = require('path')
const multipart = require('multiparty')
const { LOADIPHLPAPI } = require('dns')


http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  const method = req.method.toUpperCase()
  const requestContentType = req.headers?.['content-type']

  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天
  //在非简单请求且跨域的情况下，浏览器会发起options预检请求。
  if(method === 'OPTIONS') {
    console.log('options预检验');
    res.write('pass')
    res.end()
    return false
  }

  if(method === 'GET') {
    console.log('GET请求');
    let {json, str} = queryURLFromat(req)
    res.setHeader('content-type', 'text/plain;charset=utf8')
    res.write(str)
    res.end()
    return false
  }

  if(method === 'POST') {
    console.log('POST请求');
    let type = shuntContentType(requestContentType)
    if(type === 'form') {
      console.log('dawwda');
      let form = new multipart.Form({
        uploadDir: path.normalize(__dirname + '/upload')
      })

      form.parse(req, (err, fields, files) => {
        if(err) {
          throw err
        }
        if(fields) {
          console.log(fields);
        }
        if(files) {
          console.log(files);
        }
        console.log('进入')
      })
      console.log('789');
      res.setHeader('content-type', 'text/plain;charset=utf8')
      res.write(JSON.stringify({statusCode: 200, msg: "请求符合规范"}))
      res.end()
      return false
    }
    req.on('data', chunk => { 
      let str = chunk.toString('utf-8')
      console.log(str);
      res.setHeader('content-type', 'text/plain;charset=utf8')
      res.write(JSON.stringify(str))
      res.end()
    })
  
    req.on('end', () => {
      console.log('数据传输完毕');
    })
  }
}).listen(3008, () => {
  console.log('3008服务端启动');
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
    json: params,  //query json对象
    str: requestParamStr //query描述信息
  }
}

