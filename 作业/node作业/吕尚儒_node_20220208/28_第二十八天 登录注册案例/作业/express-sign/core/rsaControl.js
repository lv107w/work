const {decrypt, encrypt, generateKeys} = require('../util/util')
const fs = require('fs').promises
const fsSync = require('fs')
const {pubKeyPath, priKeyPath} = require('../config')


module.exports = {
  //同步获取公钥
  getPublicKeySync() {
    return fsSync.readFileSync(pubKeyPath, 'utf8')
  },
  //异步获取公钥
  async getPublicKey() {
    let key
    try {
      key = await fs.readFile(pubKeyPath, 'utf8')
    } catch(err) {
      generateKeys()
      key = await fs.readFile(pubKeyPath, 'utf-8')
    }
    return key
  },
  //异步获取私钥
  async getPrivateKey() {
    let key 
    try {
      key = await fs.readFile(priKeyPath, 'utf-8')
    } catch (err) {
      generateKeys()
      key = await fs.readFile(priKeyPath, 'utf-8')
    }
    return key
  }
}