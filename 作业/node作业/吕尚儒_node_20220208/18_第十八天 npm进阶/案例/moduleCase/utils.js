const querystring = require('querystring')
const multiparty = require('multiparty')
const url = require('url')
const path = require('path')
const fs = require('fs')

function queryFormat (query) {
  let obj = {}
  let reg = /([^?&=]+)=([^?&=]+)/g
  //先把query字符串 正则切割为 ['key=value','key=value']
  let result = query.match(reg)
  //['key=value','key=value'] map方法正则match替换为 [[key,value],[key,value]]
  result = result.map(item => item.match(/([^?=&]+)/g));
  //Object.fromEntries 方法把二维数组 整理为 对象{key:value,key:value}
  return Object.fromEntries(result)
}
//根据请求方式 和请求内容类型 获取请求参数 返回对应json对象
/*
  "key=value&key=value" queryString
  "{key:value,key:value}" JSONString
  FormData => multiparty

*/
function getParam (req, callback) {
  let method = req.method.toUpperCase();
  if (method === 'GET') {
    callback(url.parse(req.url, true).query)
    return
  }
  if (method === 'POST') {
    req.on('data', (chunk) => {
      let reqStr = chunk.toString('utf8')
      if (isQueryStr(reqStr)) {
        callback(queryFormat(reqStr))
        return
      }
      if (isJSON(reqStr)) {
        callback(JSON.parse(reqStr))
        return
      }
    })
    req.on('end', function () {
      console.log(`${url.parse(req.url).pahtname} 请求数据加载完成`)
    })
  }

  let contentType
}
function isJSON (str) {
  if (!str) {
    return false
  }
  try {
    JSON.parse(str)
    return true
  } catch (err) {
    return false
  }
}
function isQueryStr (str) {
  return /([^&=?]*)=([^&=?]*)/.test(str)
}

module.exports = {
  isJSON, isQueryStr, getParam, queryFormat
}

