const fs = require('fs')
const path = require('path')

fs.readdir(__dirname, (err, data) => {
  if(err) {
    throw err
  }
  //过滤出来后缀名js且不是headfile.js的文件
  let files = data.filter(item => {
    return /js/.test(path.extname(item)) && (item !== 'headfile.js')
  }).filter(item => {
    let src = path.normalize(`${__dirname}\\${item}`)
    console.log(src);
    let stats = fs.statSync(src) //同步函数，异步回调return的结果没办法和filter同步
    return stats.isFile()
  })
  
  for(let item of files) {
    let src = path.normalize(`${__dirname}\\${item}`)
    fs.readFile(src, (err, bufferBody) => {
      if(err) {
        throw err
      }
      let bufferHead = Buffer.from(renderTemp(item))
      let bufferContent = Buffer.concat([bufferHead, bufferBody])

     
      const regex = new RegExp('readed by lv');
      let isExist = regex.test(bufferBody.toString('utf-8'))
      if(isExist) {
        console.log(`${item}已经写过了`);
        return false
      }
      fs.writeFile(src, bufferContent, (err) => {
        if(err) {
          throw err
        }
        console.log(`${item}写入成功`);
      })
    })
  }
})

function renderTemp(fileName, author = 'lv') {
  let date = new Date();
  return `
  /**
  *  from ${fileName}
  *  readed by ${author} on ${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日
  */
`
}
