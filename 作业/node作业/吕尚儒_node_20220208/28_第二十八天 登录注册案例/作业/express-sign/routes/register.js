const express = require('express')
const router = express.Router()
const userControl = require('../core/userControl')
const {getUserStatusMsg} = require('../core/statusControl')
const {getPrivateKey} = require('../core/rsaControl')


router.post('/', async (req, res, next) => {
  let {username, pwd} = req.body
  
  //简单验证账号，密码格式
  if(!username || username.length === 0 || !pwd || pwd.length === 0) {
    res.send(200, {
      ...getUserStatusMsg('USER_TRIM')
    })
  }
  let result = await userControl.addUser(username, pwd)
  res.send(200, {
    ...result
  })
})

module.exports = router
