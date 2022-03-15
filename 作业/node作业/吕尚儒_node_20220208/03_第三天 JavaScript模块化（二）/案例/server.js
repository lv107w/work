const fs = require('fs'); //引入内置模块fs
const mod = require('./kyogre');//require模块路径 服务器环境下 同级文件路径 ./文件名

console.log(mod)
// fs.readFile('index.html', 'utf-8', function (err, data) {
//   // console.log(err)
//   // console.log(data)
// })


/*
  文件就是模块 模块就是文件

  1. 导入模块 require(文件路径)
  2. 模块声明 每个js文件都是模块
  3. 模块如何导出暴露项目 exports.xx module.exports = {xxx,xxx,xx}

*/