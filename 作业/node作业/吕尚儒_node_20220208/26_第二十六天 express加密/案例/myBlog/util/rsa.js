const express = require('express');
const path = require('path')
const fs = require('fs');
const http = require('http')
const app = express();
const NodeRSA = require('node-rsa');
const cerPath = path.join(__dirname, '../auth')
const newkey = new NodeRSA({ b: 1024 });
newkey.setOptions({ encryptionScheme: 'pkcs1' });	//因为jsencrypt自身使用的是pkcs1加密方案,只有从后台改咯
// let public_key = newkey.exportKey('pkcs8-public'),//公钥,
//   private_key = newkey.exportKey('pkcs8-private'); //私钥

// fs.writeFileSync(path.join(cerPath, 'private.cer'), private_key);
// fs.writeFileSync(path.join(cerPath, 'public.cer'), public_key);

let public_key = fs.readFileSync(path.join(cerPath, 'public.cer'), 'utf8');
private_key = fs.readFileSync(path.join(cerPath, 'private.cer'), 'utf8'); //私钥

let pubkey = new NodeRSA(public_key),
  prikey = new NodeRSA(private_key);
pubkey.setOptions({ encryptionScheme: 'pkcs1' });//因为jsencrypt自身使用的是pkcs1加密方案,只有从后台改咯
prikey.setOptions({ encryptionScheme: 'pkcs1' });//因为jsencrypt自身使用的是pkcs1加密方案,只有从后台改咯
console.log(prikey.decrypt(`l/C1IbzSfX7DA3t8zz+II4WK4OhiDtHc7wt0UNLp0dxVwfK6M8ZpKusqwcs7ERT5plUhiEznwonVW14FETfYo55TDwg7H1Ya/qxUKHp147h7Hsu5frEp2/akLxjrOPRDASTB5MBFpTSLbkUy6yT5X9AtUkWjPMq8//nbs9TBMcw=`, 'utf8'))



// 	   	加密 	&&	  解密方法 
//		let encrypted = pubkey.encrypt(yourstring,'base64'); 
//		var decrypted = prikey.decrypt(encrypted, 'utf8'); 
let body_parse = function (req) {
  return JSON.parse(Object.keys(req.body)[0] + req.body[Object.keys(req.body)[0]])
}
let decrypted = function (req, eve, _attr) {
  var _user = body_parse(req)[_attr],//_attr是传输回来的对象中装有密文的属性
    str = Buffer.from(_user, 'base64').toString().replace(/%$#%/g, "+");//转回符号'+'
  var data = JSON.parse(prikey.decrypt(str, 'utf8')); //后端解密
  if (eve) {
    eve(data);
  }
}
