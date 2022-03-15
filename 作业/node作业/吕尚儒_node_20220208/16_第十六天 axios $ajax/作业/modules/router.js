const {path} = require('./httpRequire')

function route (pathname, handle, req, res) {
  if(pathname === '/') {
    pathname = '/index'
  }

}

module.exports = {route}