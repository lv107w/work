const querystring = require('querystring')
module.exports.queryFormat = function (query) {
  let obj = {}
  let reg = /([^?&=]+)=([^?&=]+)/g
  //先把query字符串 正则切割为 ['key=value','key=value']
  let result = query.match(reg)
  //['key=value','key=value'] map方法正则match替换为 [[key,value],[key,value]]
  result = result.map(item => item.match(/([^?=&]+)/g));
  //Object.fromEntries 方法把二维数组 整理为 对象{key:value,key:value}
  return Object.fromEntries(result)
}
module.exports.isJSON = function (str) {
  try {
    JSON.parse(str)
    return true;
  } catch (err) {
    return false;
  }
  return false;
}

module.exports.isQueryStr = function (str) {
  return /([^&=?]*)=([^&=?]*)/.test(str)
}
