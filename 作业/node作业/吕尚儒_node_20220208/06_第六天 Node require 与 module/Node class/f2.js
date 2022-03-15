// exports = {
//   a: 1,
//   b: 2
// }
// 相当于给一个隐式声明的变量 exports 赋值 {a:1,b:2}

let exports = module.exports // 对象 赋值给变量 引用关系

exports.a = 10; // module.exports.a = 10

exports = {}; // 内存中 exports的地址不再指向 module.exports 而是指向一个新的 地址 这就切断了 exports变量与module.exports 的引用关系

