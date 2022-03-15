const { http, url, path, fs, multiparty, querystring } = require('./modules/httpRequire')
const { start } = require('./modules/server')
const { route } = require('./modules/router')
const { getDbMovie, into, staticFile } = require('./modules/requestHandlers')

const viewPath = path.normalize(__dirname + '/views')

const handle = {
  '/index': into,
  '/dbmovie': getDbMovie,
  '/static': staticFile
}

start(route, handle)