const express = require('express')
const router = express.Router()


// auth 认证登录
router.get('/auth', (req, res, next) => {
  res.send(200, { statusCode: 9981, msg: "认证登录成功" })
})


// sms 短信登录
router.get('/sms', (req, res, next) => {
  res.send(200, { statusCode: 9982, msg: "短信登录成功" })
})



// pwd 密码登录
router.get('/pwd', (req, res, next) => {
  res.send(200, { statusCode: 9983, msg: "密码登录成功" })
})


module.exports = router