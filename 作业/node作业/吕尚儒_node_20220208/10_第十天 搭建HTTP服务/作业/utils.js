//数据处理，把query转换成json格式 正则处理
let queryFormat = function(query) {
  let reg = /([^?&=]+)=([^?&=]+)/g
  let result = query.match(reg)
  result = result.map(item => {
    return item.match(/([^=]+)/g)
  })
  return Object.fromEntries(result)
}
console.log(queryFormat("name=maigan&age=12"))


//数据处理，把query转换成json格式 split处理
function queryParse(query) {
  let result = query.split('&')
  result = result.map(item => item.split('='))
  return Object.fromEntries(result)
}
console.log(queryParse("name=maigan&age=12"))

