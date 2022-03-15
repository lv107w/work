const{path} = require('./modules/httpRequire')
const {start} = require('./modules/server')
const {route} = require('./modules/router')
const {into, getDbMovie, staticFile} = require('./modules/requestHandlers')

const handle = {
  '/index': into,
  '/dbmovie': getDbMovie,
  '/static': staticFile
}

start(route, handle)