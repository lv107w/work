const { encrypt, decrypt } = require('../util/util');
const path = require('path');
const fs = require('fs')
const jwt = require('jsonwebtoken');
const jwtScrect = fs.readFileSync('../auth/jwtSCrect.cer', 'utf8');  //签名
const fs = require('fs').promises



module.exports = {
  async setToken (user_name, user_id) {
    const token = jwt.sign({ user_name, user_id }, jwtScrect, { expiresIn: '24h' });
    return token
  },
  //各个接口需要验证token的方法
  async getToken (token) {
    if (!token) {
      console.log('token是空的')
      return {
        statusCode: 4090,
        errMsg: 'token 不存在'
      }
    }
    var info = jwt.verify(token.split(' ')[1], jwtScrect);
    return info;  //解析返回的值（sign 传入的值）
  }
}