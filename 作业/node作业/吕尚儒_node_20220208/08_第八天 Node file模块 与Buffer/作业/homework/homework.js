/**
 *  from ${fileName}
 *  reated by ${author} on ${Date Time}
 */

 //写一个node脚本  headfile.js

/*
  执行脚本的时候
    读取脚本目录的同级js文件 给每个js文件添加 head注释头
  模板如上
*/

const { count } = require('console');
const fs = require('fs');
const path = require('path');
fs.readdir(path.resolve(__dirname), (err, data) => {
  if(err) {
    throw err
  }
  for(let i = 0, len = data.length; i < len; i++) {
    let today = new Date(Date.now());
    let date = today.toDateString();
    let src = `${path.resolve(__dirname)}\\${data[i]}`;
    if(!(/js/.test(path.extname(src))) || src === __filename) {
      continue;
    }
    fs.stat(src, (err, stat) => {
      if(err) {
        throw err
      }
      if(stat.isFile()) {
        let str = `
        from ${src}
        reated by lv on ${date}
        `
        fs.appendFile(src, `/*${str}*/`, err => {
          if(err) {
            throw err
          }
          console.log('写入成功');
        })
      }
    })
  }
})