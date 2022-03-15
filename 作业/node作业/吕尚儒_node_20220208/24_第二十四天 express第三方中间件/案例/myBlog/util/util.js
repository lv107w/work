const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cerPath = path.join(process.cwd(), '/auth')

function generateKeys () {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: '',
    },
  });
  fs.writeFileSync(path.join(cerPath, 'private.cer'), privateKey);
  fs.writeFileSync(path.join(cerPath, 'public.cer'), publicKey);
}

function encrypt (plain, pathToPublicKey) {
  const publicKey = fs.readFileSync(path.resolve(__dirname, pathToPublicKey), 'utf8');
  const buffer = Buffer.from(plain, 'utf8');
  return crypto.publicEncrypt(publicKey, buffer).toString('base64');
}

function decrypt (cipher, pathToPrivateKey) {
  const privateKey = fs.readFileSync(path.resolve(__dirname, pathToPrivateKey), 'utf8');
  const buffer = Buffer.from(cipher, 'base64');
  const plain = crypto.privateDecrypt({
    key: privateKey.toString(),
    passphrase: ''
  }, buffer);
  return plain.toString('utf8')
}


module.exports = {
  generateKeys,
  encrypt,
  decrypt
};