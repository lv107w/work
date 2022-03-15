const express = require('express');
const router = express.Router();
const userControl = require('../core/userControl')
const { getUserStatusMsg } = require('../core/statusControl')
const { getPrivateKey } = require('../core/rsaControl')

/* POST register listing. */
router.post('/', async function (req, res, next) {
  let { username, pwd } = req.body
  console.log(username, pwd, '============----')
  //TODO 验证username pwd 格式内容

  if (!username || !pwd || username?.length === 0 || pwd?.length === 0) {
    res.send(200, {
      ...getUserStatusMsg('USER_TRIM')
    })
  }
  let result = await userControl.addUser(username, pwd)
  res.send(200, {
    ...result
  })
});

module.exports = router;
