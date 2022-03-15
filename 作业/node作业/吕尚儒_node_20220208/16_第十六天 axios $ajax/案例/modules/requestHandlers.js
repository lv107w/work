const fs = require('fs')
const path = require('path')
const url = require('url')
const mime = require('./mime')
const { getParam } = require('./utils/utils')
const dbmoviePath = path.join(__dirname, '../data/dbMovie.json')
module.exports = {
  staticFile (req, res) {
    let filePath = path.join('./', url.parse(req.url).pathname)
    console.log(`staticFile 请求资源路径 ${filePath}`)

    fs.stat(filePath, (err, stats) => {
      if (err) {
        // throw err
        res.statusCode = 404
        res.setHeader('content-type', 'text/plain;charset=utf8')
        res.end(`${filePath} is not a file`)
        return
      }
      if (stats.isFile()) {
        const mimeType = mime(filePath)
        res.statusCode = 200
        res.setHeader('content-type', mimeType)
        fs.createReadStream(filePath).pipe(res)
        return
      }
      if (stats.isDirectory()) {
        res.statusCode = 404
        res.setHeader('content-type', 'text/plain;charset=utf8')
        res.end(`${filePath} is not a file`)
        return
      }
    })
  },
  getDbMovie (req, res) {
    console.log(`请求 dbmoive接口 ${req.url}`)
    getParam(req, function (data) {
      let { start = 0, count = 20 } = data
      getDbJSON(start, count, function (resData) {
        res.statusCode = 200
        res.setHeader('content-type', 'application/json;charset=utf8')
        res.end(JSON.stringify(resData))
      })
    })
  },
  into (req, res) {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
    res.write("<!doctype html><html><head><title>主页</title></head><body><h1>welcome to Node Server</h1></body></html>");
    res.end();
  }
}

function getDbJSON (start, count, callback) {
  fs.readFile(dbmoviePath, 'utf8', function (err, data) {
    if (err) console.log(err);
    // console.log(data);
    var dataArr = JSON.parse(data);
    var end = (start * 1) + (count * 1);
    console.log(`返回${start} - ${end} 合计: ${count}条数据 `);
    var newDataArr = dataArr.slice(start, end);

    callback && callback(newDataArr);
  })
}
