const http = require('http')
const { stringify } = require('querystring')

http.createServer((req, res) => {


  res.writeHead(200, {
    'Content-Type': 'text/plain;charset=utf8',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    "X-Powered-By": ' 3.2.1',
  })

  req.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
    let {user, pwd} = JSON.parse(chunk.toString('utf-8'))
    console.log(user);
    let resData = {
      data: new Date(),
      token: user
    }

    res.write(JSON.stringify(resData), 'utf-8')
    res.end()
  })
}).listen(80)