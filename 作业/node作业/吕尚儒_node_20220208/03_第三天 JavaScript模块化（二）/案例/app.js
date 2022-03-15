const http = require('http')
const fs = require('fs')
const url = require('url')
const { rejects } = require('assert')

http.createServer((req, res) => {
  let hostname = req.headers.host;
  let pathname = url.parse(req.url).pathname;
  if (pathname === '/') {
    pathname = '/index.html'
  }
  readFile(pathname).then(data => {
    resSuccess(data, res)
  }).catch(err => {
    resError(err, res)
  })
}).listen('80')

function readFile (pathname) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathname.substr(1), 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data)
    })
  })
}
function resSuccess (data, res) {
  res.end(data)
}

function resError (err, res) {
  console.log(err)
  res.writeHeader(404)
  res.end('page is not found')
}