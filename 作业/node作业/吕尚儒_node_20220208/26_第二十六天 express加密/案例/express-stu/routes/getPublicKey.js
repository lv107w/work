var express = require('express');
var router = express.Router();

const { vertifyPwd, getPubKey } = require('../core/rsa-user')

router.post('/', async function (req, res, next) {
  let pubKey = await getPubKey()
  res.json(200, {
    statusCode: "200",
    errMsg: "ok",
    data: {
      pubKey
    }
  })
});

module.exports = router;
