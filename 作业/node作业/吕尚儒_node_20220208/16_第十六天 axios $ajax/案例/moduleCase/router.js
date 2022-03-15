const { path } = require("./httpRequire")

function route (pathname, handle, req, res) {
  // /static/image/1.png
  if (pathname === '/') {
    pathname = '/index'
  }
  let handMethod = Object.entries(handle).filter(([key, value]) => {
    let regExp = new RegExp(`^${key}`, 'g')
    return regExp.test(pathname)
  })?.[0]?.[1]

  if (typeof handMethod === 'function') {
    handMethod(req, res)
  }


  if (pathname === '/favicon.ico') {
    res.statusCode = 200
    res.end()
    return
  }



  console.log(`路由 地址为${pathname}`)


}

module.exports = {
  route
}