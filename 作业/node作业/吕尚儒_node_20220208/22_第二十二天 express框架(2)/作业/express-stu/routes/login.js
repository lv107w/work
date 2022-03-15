const express = require('express')
const router = express.Router()

router.get('/auth', (req, res, next) => {
  res.send(200, {statusCode: 9981, msg: '认证登录成功'})
})

router.get('/sms', (req, res, next) => {
  res.send(200, {statusCode: 9982, msg: '短信认证成功'})
})

router.get('/pwd', (req, res, next) => {
  res.send(200, {statusCode: 9983, msg: '密码认证成功'})
})

module.exports = router