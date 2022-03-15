const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey, getPublicKey, getPublicKeySync } = require('../core/rsaControl')
const jwt = require('jsonwebtoken') //token生成包  JWT
const expressJwt = require('express-jwt') //token验证中间件 JWT
const createError = require('http-errors');

router.post('/', expressJwt({
  secret: getPublicKeySync(), //解密秘钥 
  algorithms: ["RS256"], //6.0.0以上版本必须设置解密算法 
  isRevoked: function (req, payload, next) {
    //获取token payload内容
    // console.log(payload)
    let { user_name, user_id } = payload
    console.log(payload)
    req.username = user_name
    req.userID = user_id

    userControl.verifyToken(user_name, user_id).then(result => {
      if (result.statusCode === getUserStatusMsg('USER_FOND')['statusCode']) {
        next()
      } else {
        next(createError(401))
      }
    })

  }
}), async function (req, res, next) {
  res.send(200, {
    ...getUserStatusMsg('USER_LOGIN'),
  })
});

module.exports = router;
