var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')



router.post('/', (req, res, next) => {
  console.log(req.body)
  res.send({ msg: '注册成功' })
})

module.exports = router