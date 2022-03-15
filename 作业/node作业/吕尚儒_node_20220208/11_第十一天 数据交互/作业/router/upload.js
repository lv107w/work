const url = require('url')
const fs = require('fs')
const path = require('path')
const uploadPath = '../upload'
exports.uploadRouter = function (req, res) {
  let pathname = url.parse(req.url).pathname
  if (!(/upload/g.test(pathname))) {
    return false;
  }

  let { base, ext, name } = path.parse(pathname)
  fs.readFile(path.normalize(`./upload/${base}`), (err, data) => {
    if (err) {
      throw err
    }
    res.writeHead(200, { 'Content-Type': `image/${ext}` })
    res.write(data)
    res.end()
  })
}


// console.log(path.parse('upload\89D9F253EbqcsJ1W1hfjDj4H.png'))