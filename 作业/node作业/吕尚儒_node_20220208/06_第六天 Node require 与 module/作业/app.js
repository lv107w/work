let foo = require('./foo');
console.log(foo);
console.log(__filename);
console.log(__dirname);
console.log(require.main);



/*

  require

  require.main 入口文件 主程入口  入口模c块(文件) 的 module对象

  module 当前模块(文件) 的模块对象

  __filename 当前模块(文件) 的文件名 等同于 module.filename


  require() 传参模块路径/模块名称 如果没有写任何路径符 '/' '../' './' require默认模块寻址目录为 root/node_modules文件夹中寻找


  require() 参数直接指定某个文件夹 而非文件的时候 会默认将文件夹内的 index.js 作为模块文件

  require 导入自定义模块名称如果与原生node内置模块冲突 优先使用node内置模块

  require('./foo')
    1. root 根目录下的 foo.js
    2. root 根目录下的 foo 文件夹里 找package.json 里面 的 main 属性的值 对应的文件作为 模块文件
    3. root 根目录下的 foo 文件夹 里的 index.js

*/
/*
  exports
  写法

  module.exports = { }
  或者
  exports.x =


  不可以 写

    exports = {}

  // 相当于给一个隐式声明的变量 exports 赋值 {a:1,b:2}
  每个文件模块 会有一行隐式代码 如下
  let exports = module.exports // 对象 赋值给变量 引用关系

  exports.a = 10; // module.exports.a = 10

  exports = {}; // 内存中 exports的地址不再指向 module.exports 而是指向一个新的 地址 这就切断了 exports变量与module.exports 的引用关系
*/