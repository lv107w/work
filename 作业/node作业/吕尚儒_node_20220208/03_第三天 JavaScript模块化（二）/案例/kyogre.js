const NUMBER = 100;
const add = function (param) {
  return NUMBER + param
}
const name = 'hahah';
//exports.age = 13; //单独导出某个变量
module.exports = { //导出多个变量
  add, name
}




