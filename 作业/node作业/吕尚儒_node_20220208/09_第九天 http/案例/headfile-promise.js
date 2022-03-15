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


// fs.readFile('./target.js', 'utf8').then(data => {
//   return fs.writeFile('./target.js', data + '我好')
// }).catch(err => { throw err })

// function myReadFile (url, charset) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, charset, function (err, data) {
//       if (err) {
//         reject(err)
//         return
//       }
//       resolve(data)
//     })
//   })
// }

// myReadFile('./target.js', 'utf8').then(data => console.log(data))
//监听文件 url callback(当前文件的stats , 变动前的stats)
fs.watchFile('./target.js', (curr, prev) => {
  console.log(curr)
  console.log(prev)
})