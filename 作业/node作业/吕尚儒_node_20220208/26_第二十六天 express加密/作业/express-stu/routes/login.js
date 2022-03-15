const express = require('express')
let router = express.Router()
const {vertifyPwd} = require('../core/rsa-user')

router.post('/', async (req, res, next) => {
  console.log(req.body);
  let {username = '', pwd = ''} = req.body
  if(!username || username.length === 0 || !pwd || pwd.length === 0) {
    res.json(200, {
      statusCode: '4012',
      errMsg: '账号密码错误'
    })
    return
  }
  console.log(username);
  console.log(pwd);
  let password = await vertifyPwd(pwd)  //解密

  res.json(200, {
    statusCode: "200",
    errMsg: 'ok',
    data: {
      pwd: password
    }
  })
})

module.exports = router