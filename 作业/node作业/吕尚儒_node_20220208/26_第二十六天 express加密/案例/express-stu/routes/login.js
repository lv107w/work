var express = require('express');
var router = express.Router();
const { vertifyPwd } = require('../core/rsa-user')

router.post('/', async function (req, res, next) {
  let { username = '', pwd = '' } = req.body
  if (!username || username.length === 0 || !pwd || pwd.length === 0) {
    res.json(200, {
      statusCode: "4012",
      errMsg: "账号密码错误"
    })
  }
  console.log(username)
  console.log(pwd)
  let password = await vertifyPwd(pwd)


  res.json(200, {
    statusCode: "200",
    errMsg: "ok",
    data: {
      pwd: password
    }
  })
});

module.exports = router;
