const { url, http, path, fs } = require('./moduleCase/httpRequire')

const staticURL = './static/image'

fs.readFile('./data/dbMovie.json', 'utf8', (err, data) => {
  if (err) {
    throw err
  }
  let imageData = JSON.parse(data).map(item => item.images.large)
  let reqUrl = imageData[0]
  let index = 0
  setInterval(function () {
    if (index === imageData.length) {
      console.log('爬取完毕')
      return false
    }
    index++;
    let fileName = path.parse(url.parse(imageData[index]).pathname).base
    slowReptile(imageData[index], fileName)
  }, 1500)

})

function slowReptile (reqUrl, fileName) {

  http.get(reqUrl, (res) => {
    let buffer = Buffer.from('')
    // res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
    res.on("data", function (chunk) {
      buffer = Buffer.concat([buffer, Buffer.from(chunk)])
    });
    res.on("end", function () {
      fs.writeFile('./static/image/' + fileName, buffer, "binary", function (err) {
        if (err) {
          console.log("down fail");
        }
        console.log("down success");
      });
    });
  })
}