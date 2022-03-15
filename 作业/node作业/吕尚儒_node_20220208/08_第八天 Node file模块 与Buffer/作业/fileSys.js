let fs = require('fs')
let path = require('path')
//检测路径是目录还是文件
fs.stat(__dirname, (err, stats) => {
  if(err) {
    throw err
  }
  console.dir(stats)
  console.log(stats.isFile());
  console.log(stats.isDirectory());
})
//创建目录
// fs.mkdir('img', err => {
//   if(err) {
//     throw err
//   }
//   console.log('img文件夹创建成功');
// })
//删除目录
// fs.rmdir('img', err => {
//   if(err) {
//     throw err
//   }
//   console.log('img文件夹删除成功');
// })

//创建文件并写入 file, data[, options], callback  异步
//flag w 代表直接覆盖写入 a 代表追加写入
// fs.writeFile('hellow.js', 'const a = 10', {flag: 'w', encoding: 'utf-8'}, err => {
//   if(err) {
//     throw err
//   }
//   console.log('hellow.js文件创建写入成功');
// })
//writeFileSync 同步操作
// fs.writeFileSync('hello.js', 'const x = 10', {flag: 'w',encoding: 'utf-8'})

//追加内容 writeFile flag a/a+
// fs.appendFile('hellow.js', '\n' + Date.now() + '\n', function(err) {
//   if(err) {
//     throw err
//   }
//   console.log('OK');
// })

//删除文件
// fs.unlink('hellow.js', err => {
//   if(err) {
//     throw err
//   }
//   console.log('删除成功');
// })

//读取目录
console.log(path.resolve(__dirname));
fs.readdir(`${path.resolve(__dirname)}\\js`, (err, data) => {
  if(err) {
    throw err;
  }
  for(let i = 0, len = data.length; i < len; i++) {
    let src = `${path.resolve(__dirname)}\\js\\${data[i]}`
    if(!(/js/.test(path.extname(src)))) {
      continue;
    }
    fs.stat(src, (err, stat) => {
      if(err) {
        throw err
      }
      if(stat.isFile()) {
        fs.appendFile(src, 'hello readdir', err => {
          if(err) {
            throw err
          }
          console.log('写入成功');
        })
      }
    })
  }
})
