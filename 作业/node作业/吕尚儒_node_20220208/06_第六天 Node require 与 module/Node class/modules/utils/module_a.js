const util = require('./utils')
console.log(util.isFunction(function () { }), 'isFun')
//commonjs 中 js文件模块 不指定exports 导出内容 也会把 module对象的 exports属性默认导出
console.log(require.main === module, ' module_a')