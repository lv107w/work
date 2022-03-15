const http = require('http')
const url = require('url')

http.createServer((req, res) => {
  let method = req.method.toUpperCase()
  let contentType = req.headers['content-type']


  //CORS解决跨域
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type')
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH")
  res.setHeader('Access-Control-Max-Age', 1728000)
  res.writeHead(200, {
    'content-type': 'text/plain;charset=utf8'
  })

  if(method === 'OPTIONS') {
    console.log('options 预请求');
    res.end('ok') //必须结束响应
    return false
  }

  contentType = shuntContentType(mime(contentType))
  if(contentType !== 'json') {
    res.write('请求内容类型非application/json ')
    res.end()
    return false
  }

  
  if(method === 'POST') {
    req.on('data', chunk => {
      if(!isJSON(chunk.toString('utf-8'))) {
        res.end(JSON.stringify({
          'statusCode': 9001,
          'msg': '请求内容不符合JSON规范'
        }))
        return false
      }
      let reqData = JSON.parse(chunk.toString('utf-8'))
      res.end('{"statusCode": 200, "msg": "请求符合规范"}')
    })

    req.on('end', () => {
      console.log('数据请求完毕');
    })
  }
  
}).listen(3007, () => {
  console.log('3007服务启动 json类型ajax数据交互');
})





function shuntContentType(type) {
  const contentType = {
    'application/x-www-form-urlencoded': 'url',
    'multipart/form-data': 'form',
    'text/plain': 'text',
    'application/json': 'json'
  }
  return contentType[type]
}

function mime(type) {
  return type?.split(';')[0]
}

//如果请求的不是JSON字符串,捕获错误
function isJSON(str) {
  try {
    JSON.parse(str)
    return true
  } catch (err) {
    return false
  }
  return false
}