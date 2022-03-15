const querystring = require('querystring')
const url = require('url')
const path = require('path')
const fs = require('fs')
const { multiparty } = require('../../moduleCase/httpRequire')

function shuntContentType (type) {
  type = mime(type).trim()
  const contentType = {
    'application/x-www-form-urlencoded': 'url',
    'multipart/form-data': 'form',
    'text/plain': 'text',
    'application/json': 'json'
  }
  return contentType[type]
}

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


function getParam (req, callback) {
  let method = req.method.toUpperCase();
  //form 请求
  let requestConType = req?.headers?.['content-type']
  if (shuntContentType(requestConType) === 'form') {
    let form = new multiparty.Form({
      uploadDir: path.join(process.cwd(), '/upload')
    })
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err)
      }
      if (fields) {
        callback(fields)
      }
    })
    return
  }
  //get + queryString
  if (method === 'GET') {
    callback(url.parse(req.url, true).query)
    return
  }
  //post + queryString || JSONString
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
  isJSON, isQueryStr, getParam, queryFormat, shuntContentType
}

