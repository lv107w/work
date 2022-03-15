const { encrypt, decrypt } = require('../util/util');
const path = require('path');
const { setupMaster } = require('cluster');
const fs = require('fs').promises

const cerPath = path.join(process.cwd(), '/auth/userData')
const userPath = path.join(cerPath, 'user.json')

module.exports = {
  async addUser (username, password) {
    let users = await fs.readFile(userPath, 'utf8')
    users = JSON.parse(users)
    let length = users.length

    let idx = users.findIndex(item => item['user_name'] === username)

    if (idx !== -1) {
      return { status: "4003", msg: "用户已存在" }
    }

    users.push({
      'user_id': `0000${length}`,
      'user_name': username,
      'password': encrypt(password)
    })
    await fs.writeFile(userPath, JSON.stringify(users))
    return { status: 200, msg: "注册成功" }

  },
  async getUserInfo (username) {
    let users = await fs.readFile(userPath, 'utf8')
    users = JSON.parse(users)
    let userInfo = users.find(item => item['user_name'] === username)
    if (!userInfo) {
      return false
    }
    return {
      uid: userInfo['user_id'],
      username: userInfo['user_name'],
      pwd: userInfo['password'],
    }
  },
  async verifyPwd (username, password) {

    let userInfo = await this.getUserInfo(username)
    if (!userInfo) {
      return {
        status: "4104",
        errMsg: "用户不存在"
      }
    }
    let { uid, pwd } = userInfo
    let loginPwd = decrypt(password)
    pwd = decrypt(decrypt(pwd))
    if (loginPwd === pwd) {
      return {
        status: 200,
        errMsg: `welcome`
      }
    }
    return {
      status: "4106",
      errMsg: "账号或密码错误"
    }
  }
}