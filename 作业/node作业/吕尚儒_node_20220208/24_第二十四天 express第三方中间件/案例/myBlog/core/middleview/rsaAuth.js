const { encrypt, decrypt } = require('../../util/util');
const path = require('path')
const fs = require('fs').promises
const cerPath = path.join(process.cwd(), '/auth')
const publicKeyPath = path.join(cerPath, 'public.cer')
module.exports = {
  async sendPublicKey (req, res, next) {

    let publicKey = await fs.readFile(publicKeyPath, 'utf8')
    console.log(publicKey)
    res.json(200, { publicKey })
  }
}