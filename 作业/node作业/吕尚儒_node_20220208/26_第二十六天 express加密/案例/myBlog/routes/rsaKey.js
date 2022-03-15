const { encrypt, decrypt } = require('../util/util');
const path = require('path')
const fs = require('fs').promises
const express = require('express');
const router = express.Router();

const cerPath = path.join(process.cwd(), '/auth')
const publicKeyPath = path.join(cerPath, 'public.cer')


router.post('/', async function (req, res, next) {
  let publicKey = await fs.readFile(publicKeyPath, 'utf8')

  res.json(200, { publicKey })
});

module.exports = router;

