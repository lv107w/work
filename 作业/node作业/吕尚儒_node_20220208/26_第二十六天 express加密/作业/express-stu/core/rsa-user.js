const {encrypt, decrypt} = require('../util/util')
const path = require('path')
const { vertifyPwd, getPubKey } = require('../../../案例/express-stu/core/rsa-user')
const fs = require('fs').promises
const cerPath = path.join(process.cwd(), '/auth')
const pubKeyPath = path.join(cerPath, '/public.cer')

module.exports = {
  async vertifyPwd(pwd) {
    return await decrypt(pwd) //用私钥 解密
  },
  async getPubKey() {
    let key = await fs.readFile(pubKeyPath, 'utf-8') //获取公钥
    return key
  }
}


