const path = require('path')
const url = require('url')
const MIME_TYPE = {
  css: "text/css",
  gif: "image/gif",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  pdf: "application/pdf",
  png: "image/png",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tiff: "image/tiff",
  txt: "text/plain",
  wav: "audio/x-wav",
  wma: "audio/x-ms-wma",
  wmv: "video/x-ms-wmv",
  xml: "text/xml"
}
let pathname = 'static/image/1.png'


//输入ext后缀名 返回对应的 MIME类型 参数是pathname 或者 ext后缀都可以
function mime (pathname) {
  ext = path.parse(pathname).ext.replace('.', '')
  return MIME_TYPE[ext] || MIME_TYPE[pathname] || MIME_TYPE['txt']
}
module.exports = {
  mime
}