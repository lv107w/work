const fs = require('fs')
const path = require('path')
const debug = require('debug');
module.exports = function mkdir (filePath) {
  fs.existsSync(filePath) || fs.mkdirSync(filePath);
}
