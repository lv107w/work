const { clear } = require('console');
const fs = require('fs');
const path = require('path')

/*
  fs模块
  fill System 文件系统

  目录 文件夹 文件 shell上对文件和目录的操作 fs都继承了下来
 shell
*/
//检测路径是目录还是文件
fs.stat(__dirname, function (err, stats) {
  if (err) {
    throw err;
  }
  //console.dir(stats) //回调一个stats对象 
  // stats.isFile() //判断是否是文件
  // stats.isDirectory() //判断是否是目录
  // console.log(`我是文件吗? ${stats.isFile()} , 我是目录吗 ${stats.isDirectory()}`)
});
//mkdir 创建目录 参数 目录名称/路径 mode 读写权限(0777) callback回调 回调参数err
// fs.mkdir('img', err => {
//   if (err) {
//     throw err;
//   }
//   console.log('文件夹 img 创建成功')
// })
//删除目录
// fs.rmdir('img', err => {
//   if (err) {
//     throw err;
//   }
//   console.log('文件夹 img 删除成功')
// })
//创建文件并写入 file, data[, options], callback  异步
// let buf = Buffer.alloc(10, 64)// @ 
// fs.writeFile('hellow.js', 'const a = 10', { flag: 'w', encoding: 'utf8' }, err => {
//   if (err) {
//     throw err;
//   }
//   console.log('文件 hellow.js 成功创建 并写入')
// })

//writeFileSync 同步操作 flag w 代表直接覆盖写入 a 代表追加写入
// fs.writeFileSync('hellow.js', 'const x = 10', { flag: 'w', encoding: 'utf8' })
// console.log('写入成功', result)


//追加内容 writeFile flag a/a+
// fs.appendFile('hellow.js', '\n' + Date.now() + '\n', function () {
//   console.log('ok');
// })


//删除文件
// fs.unlink('hellow.js', err => {
//   if (err) {
//     throw err;
//   }
//   console.log('删除成功')
// })

//读取目录
// console.log(path.resolve(__dirname))
fs.readdir(`${path.resolve(__dirname)}\\dist`, (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data)
})


 //你好 再见
 //你好 再见