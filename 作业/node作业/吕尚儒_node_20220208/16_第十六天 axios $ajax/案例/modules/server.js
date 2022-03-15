const { http, url, path, fs, multiparty, querystring } = require('./httpRequire')
const { root, host, port } = require('../config')
const { setCORSHeader } = require('./responseMethod')


const viewPath = path.normalize(__dirname + '/views')


function start (route, handle) {
  function onRequest (request, response) {
    console.log("Request received.");
    const pathname = url.parse(request.url).pathname
    setCORSHeader(request, response)
    route(handle, pathname, request, response)

  }

  http.createServer(onRequest).listen(port, function () {
    console.info(`Server has started at http://${host}:${port}`)
  });
}


exports.start = start;