const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const {getUserStatusMsg} = require('../core/statusControl')
const {getPublicKeySync} = require('../core/rsaControl')
const expressJwt = require('express-jwt')
const createError = require('http-errors')

//expressJwt中间件: 通过拿到的token解析出username， userID 以此来验证数据库中是否存在该用户
router.post('/', expressJwt({
  secret: getPublicKeySync(),  //同步获取公钥解密
  algorithms: ["RS256"],  //设置解密算法
  isRevoked: (req, payload, next) => {
    //获取payload内容
    let {user_name, user_id} = payload
    req.username = user_name
    req.userID = user_id

    userControl.verifyToken(user_name, user_id).then(result => {
      if(result.statusCode === getUserStatusMsg('USER_FOND')['statusCode']) {
        next()
      } else {
        next(createError(401))
      }
    })
  }
}) , async (req, res, next) => {
  res.send(200, {
    ...getUserStatusMsg('USER_LOGIN')
  })
});

module.exports = router;
