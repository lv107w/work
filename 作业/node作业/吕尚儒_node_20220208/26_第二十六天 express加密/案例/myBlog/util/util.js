const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');
const cerPath = path.join(process.cwd(), './auth')



function generateKeys () {
  const newkey = new NodeRSA({ b: 1024 });
  newkey.setOptions({ encryptionScheme: 'pkcs1' })	//因为jsencrypt自身使用的是pkcs1加密方案,只有从后台改咯
  let public_key = newkey.exportKey('pkcs8-public')//公钥,
  let private_key = newkey.exportKey('pkcs8-private') //私钥

  fs.writeFileSync(path.join(cerPath, 'private.cer'), private_key);
  fs.writeFileSync(path.join(cerPath, 'public.cer'), public_key);


}

function encrypt (plain) {
  let public_key = fs.readFileSync(path.join(cerPath, 'public.cer'), 'utf8');
  private_key = fs.readFileSync(path.join(cerPath, 'private.cer'), 'utf8'); //私钥
  const nodersa = new NodeRSA(public_key);
  nodersa.setOptions({ encryptionScheme: 'pkcs1' });
  const encrypted = nodersa.encrypt(plain, 'base64');
  return encrypted;
}

function decrypt (cipher) {
  let public_key = fs.readFileSync(path.join(cerPath, 'public.cer'), 'utf8');
  private_key = fs.readFileSync(path.join(cerPath, 'private.cer'), 'utf8'); //私钥
  let pubkey = new NodeRSA(public_key),
    prikey = new NodeRSA(private_key);
  pubkey.setOptions({ encryptionScheme: 'pkcs1' });
  prikey.setOptions({ encryptionScheme: 'pkcs1' });
  return prikey.decrypt(cipher, 'utf8')
}


module.exports = {
  generateKeys,
  encrypt,
  decrypt
};