const fs = require('fs')
const path = require('path')
// fs.appendFile('./doc/doc.md', "哈哈哈哈", (err, data) => {
//   console.log(data)
// })

// //读取图片base64格式 得到数据后 一定要加上 base64图片头使用 data:image/jpg;base64,
// fs.readFile('./img/1.jpg', 'base64', (err, data) => {
//   console.log(`data:image/jpg;base64,` + data)
// })

//打开文件 不是读取 也不是写入 就是单纯打开文件 fd是文件标识ID
// fs.open('./doc/doc.md', 'r+', 0600, function (err, fd) {
//   console.log(fd);
//   //声明缓存区  分配了 12位 1个汉字 占3位
//   let buf = Buffer.alloc(12, 0)
//   fs.read(fd, buf, 0, 12, 0, (err, bytesRead, buffer) => {
//     if (err) {
//       throw err
//     }
//     console.log(bytesRead); //12位
//     console.log(buffer.toString('utf8'));
//   })
// });


//写入文件 先打开 再write 准备好写入内容的Buffer
fs.open('./doc/doc.md', 'a+', 0600, function (err, fd) {
  console.log(fd);
  //声明缓存区  分配了 12位 1个汉字 占3位
  let buf = Buffer.from('你好,我是快乐的海牙 你今天吃了吗')
  fs.write(fd, buf, 0, buf.length, 0, (err, written, buffer) => {
    if (err) {
      throw err
    }
    console.log(written);
    console.log(buffer.toString('utf8'));
    //同步磁盘缓存 对文件改动操作之后 关闭文件之前 一定要同步缓存
    fs.fsync(fd, err => {
      if (err) {
        throw err
      }
      console.log('同步完成')
      fs.close(fd, err => {
        if (err) {
          throw err
        }
        console.log('文件关闭')
      })
    });
  });
});
