const { encrypt, decrypt } = require('../util/util');
const { addUser } = require('../core/userControl')
const path = require('path')
const fs = require('fs').promises
const express = require('express');
const router = express.Router();

const cerPath = path.join(process.cwd(), '/auth/userData')
const userPath = path.join(cerPath, 'user.json')


router.post('/', async function (req, res, next) {
  let { username, pwd } = req.body
  if (username.length === 0 || pwd.length === 0) {
    res.json(403, { errMsg: "账号或密码不能为空" })
  }
  let result = await addUser(username, pwd)

  res.json(200, { ...result })
});



module.exports = router;