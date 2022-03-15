const express = require('express')
let router = express.Router()

const {vertifyPwd, getPubKey} = require('../core/rsa-user')

router.post('/', async (req, res, next) => {
  let pubKey = await getPubKey() //读取公钥文件获取公钥
  res.json(200, {
    statusCode: "200",
    errMsg: "ok",
    data: {
      pubKey
    }
  })
})

module.exports = router