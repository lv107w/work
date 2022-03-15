module.exports = {
  port: '3004',
  host: 'http://127.0.0.1',
  root: process.cwd() 
}

//项目根目录， 但是会根据终端运行文件的目录而改变(process.cwd() 方法返回 Node.js 进程的当前工作目录)
console.log(process.cwd()); 