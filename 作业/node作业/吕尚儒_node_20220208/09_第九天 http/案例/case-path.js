/**
  *  from case-path.js
  *  reated by 海牙 on 2020年10月30日
  */

  /**
  *  from case-path.js
  *  reated by 海牙 on 2020年10月30日
  */

  /**
  *  from case-path.js
  *  reated by 海牙 on 2020年10月30日
  */

  /**
  *  from case-path.js
  *  reated by 海牙 on 2020年10月30日
  */

  /**
  *  from case-path.js
  *  reated by 海牙 on 2020年10月30日
  */

  const { dirname } = require('path');
const path = require('path');

//windows  D:\预科班6.2\Node服务班\Node第七天 Node events 事件\案例

//posix  ./js/demo.js
/*
  basename 返回路径中最终的文件名称+后缀
  path.delimiter 在windows 环境下是 ; 在posix 环境下是 :
      process.env.PATH用户环境变量 
      windows ; 
      posix :
  dirname 获取路径中的目录名称 

  extname 获取路径中文件的后缀名称(扩展名)

  parse 解析路径 
    { 
      //根目录
      root: 'D:\\', 
      //dirname
      dir: 'D:\\预科班6.2\\Node服务班\\Node第七天 Node events 事件\\案例',
      //basename
      base: 'case-path.js',
      //extname
      ext: '.js',
      //basename(path,extname)
      name: 'case-path'
    }

  format 传递一个对象 根据对象生成对应path地址

  - 如果提供了`pathObject.dir`,则`pathObject.root`会被忽略
  - 如果提供`pathObject.base`存在，则`pathObject.ext`和`pathObject.name`会被忽略

  path.isAbsolute(path) 返回布尔值 判断path是否是绝对路径  / \\

    path.isAbsolute('/foo/bar'); // true
    path.isAbsolute('/baz/..'); // true
    path.isAbsolute('qux/'); // false
    path.isAbsolute('.'); // false

  path.join([...paths])
    根据当前path系统环境拼接 paths 
  path.normalize
    规范路径 清除路径中的无效目录 无效内容 
    返回 标准化路径内容

  path.resolve([...paths])  
    将路径或者路径片段序列解析为绝对路径 
      在服务器或者电脑上 锚定一个资源最稳定的方式是 获取资源的相对路径

    系统资源图片A  D://pic/logo/a.png

    app.js  D://node/src/proj/app.js

    在app.js中引入 图片A 相对路径写法 ../../../pic/logo/a.png

    如果把 app.js 移到了E盘 这个相对路径 瞬间失效 无法正确获取到资源图片A


    path.sep 属性 当前系统下的 默认路径符号 Windows  \\ 或者 posix /
    path.delimiter 属性 当前系统下的环境变量地址分隔符 Windows ; 或者 posix :
*/
let stylFileName = path.basename(__filename, '.js')
let pathDirName = path.dirname('./bar/logo/src/1.text')
let extName = path.extname(__filename)
let parseName = path.parse(__filename)
let formatPath = path.format({
  //dirname
  dir: 'D:\\预科班6.2\\Node服务班\\Node第七天 Node events 事件\\案例',
  //basename
  base: 'case-path.js',
  //extname
  //basename(path,extname)
})

let filepath = ['../', '/bar/', 'src']
let joinPath = path.join('../nar/src') //..\bar\src
let normalPath = path.normalize('/foo/bar//baz/asdf/quux/..')

let mainPath = require.main.filename
let relativePath = path.relative(__filename, mainPath)
let resolvePath = path.resolve('static_files/png/', '../gif/image.gif')
console.log(resolvePath);
// console.log(stylFileName)
// console.log(process.env.PATH.split(path.delimiter));
// console.log(path.delimiter)