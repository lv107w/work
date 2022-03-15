const path = require('path');

// basename 返回路径中最终的文件名称+后缀, 第二个参数从后截取返回值
let fileName = path.basename(__filename, 'h.js')
console.log(fileName); //pat

//dirname 获取路径中的目录名称 
let dirName = path.dirname(__filename)
console.log(dirName);
let pathDirName = path.dirname('./bar/logo/src/1.text')
console.log(pathDirName); //./bar/logo/src

//extname 获取路径中文件的后缀名称(扩展名)
let extName = path.extname(__filename)
console.log(extName); //.js

//parse解析路径
// {
//   root: 'C:\\',
//   dir: 'C:\\Users\\13196\\Desktop\\作业\\node作业\\吕尚儒_node_20220208\\07_第七天 Node events 事件与 path模块\\作业',
//   base: 'path.js',
//   ext: '.js',
//   name: 'path'
// }
let parseName = path.parse(__filename)
console.log(parseName);


//format 传递一个对象 根据对象生成对应path地址
//- 如果提供了`pathObject.dir`,则`pathObject.root`会被忽略
//- 如果提供`pathObject.base`存在，则`pathObject.ext`和`pathObject.name`会被忽略

let formatPath = path.format(
  {
    // root: 'C:\\',
    dir: 'C:\\Users\\13196\\Desktop\\作业\\node作业\\吕尚儒_node_20220208\\07_第七天 Node events 事件与 path模块\\作业',
    base: 'path.js',
    // ext: '.js',
    // name: 'path'
  }
)

console.log(formatPath);


// path.join([...paths])
// 根据当前path系统环境拼接 paths 
let joinPath = path.join('../nar/src');
console.log(joinPath);

/* 
 path.normalize
    规范路径 清除路径中的无效目录 无效内容 
    返回 标准化路径内容
 */
let normalPath = path.normalize('/foo/bar//baz/asdf/quux/..')
console.log(normalPath);



let mainPath = require.main.filename
console.log(mainPath);
let relativePath = path.relative(__dirname, mainPath)
console.log(relativePath, 123);

/* 
 path.resolve([...paths])  
    将路径或者路径片段序列解析为绝对路径 
*/
let resolvePath = path.resolve('static_files/png/', '../gif/image.gif')
console.log(resolvePath);

/*     path.sep 属性 当前系统下的 默认路径符号 Windows  \\ 或者 posix /
    path.delimiter 属性 当前系统下的环境变量地址分隔符 Windows ; 或者 posix : */
let stylFileName = path.basename(__filename, '.js')
console.log(stylFileName);
console.log(process.env.PATH.split(path.delimiter));
console.log(path.delimiter);