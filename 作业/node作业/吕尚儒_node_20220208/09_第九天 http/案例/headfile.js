/**
  *  from headfile.js
  *  reated by 海牙 on 2020年10月30日
  */

//需求进阶 如果文件本身有文件头 修改文件头时间 没有文件头才添加文件头



const fs = require('fs')
const path = require('path')

/*
 fs.readdir 读取目录
 fs.stat => data.isFile 判定文件
 fs.readfile 读取文件
 fs.write 写入文件内容

*/
const base = __dirname


function renderTemp (fileName, author = '海牙') {
  let date = new Date();
  return `/**
  *  from ${fileName}
  *  reated by ${author} on ${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日
  */

  `
}

fs.readdir(base, (err, data) => {
  if (err) {
    throw err
  }
  let files = data.filter(item => {
    return /js/.test(path.extname(item))
  }).filter(item => {
    let src = path.normalize(`${base}\\${item}`)
    let stats = fs.statSync(src)
    return stats.isFile()
  })

  for (let key in files) {
    let item = files[key]
    let src = path.normalize(`${base}\\${item}`)
    fs.readFile(src, (err, bufferBody) => {
      if (err) {
        throw err
      }
      //
      let bufferHead = Buffer.from(renderTemp(item))
      let bufferContent = Buffer.concat([bufferHead, bufferBody])
      fs.writeFile(src, bufferContent, (err) => {
        if (err) {
          throw err
        }
        console.log(`写入完成: ${path.basename(src)}`)
      })
    })
  }
})