const http = require('http');
const url = require('url');

let port = 3002;
//服务端返回的数据
let data = { 'name': 'kyogre', 'age': 13 };

http.createServer(function (req, res) {
  let pathname = url.parse(req.url).pathname
  let params = url.parse(req.url, true);
  if (pathname === '/jsonp') {
    if (params.query && params.query.callback) {
      console.log(params.query);
      let str = params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
      res.end(str);
    } else {
      res.end(JSON.stringify(data));//普通的json
    }
  }
}).listen(port, function () {
  console.log('server is listening on port ' + port);
})