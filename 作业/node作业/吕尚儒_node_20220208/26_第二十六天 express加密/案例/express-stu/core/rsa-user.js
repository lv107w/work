const { encrypt, decrypt } = require('../util/util')
const path = require('path')
const fs = require('fs').promises
const cerPath = path.join(process.cwd(), './auth')
const pubKeyPath = path.join(cerPath, '/public.cer')
module.exports = {
  async vertifyPwd (pwd) {
    return await decrypt(pwd)
  },
  async getPubKey () {
    let key = await fs.readFile(pubKeyPath, 'utf8')
    return key
  }
}