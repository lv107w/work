const { path, url } = require("./httpRequire");


function route (handle, pathname, req, res) {
  console.log(url.parse(req.url, true))
  console.log("About to route a request for " + pathname);

  let handleCallback = Object.entries(handle).filter(([key, value]) => {
    let reg = new RegExp(key, 'g')
    return reg.test(pathname)
  })[0][1]
  if (typeof handleCallback === 'function') {
    handleCallback(req, res)

  } else {
    res.statusCode = 404
    res.setHeader('content-type', 'text/plain;charset=utf8')
    res.end(`${pathname} 404 not found`)
    return
  }
}

module.exports.route = route;