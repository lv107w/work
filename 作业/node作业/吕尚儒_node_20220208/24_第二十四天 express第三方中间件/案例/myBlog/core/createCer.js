const { generateKeys, encrypt, decrypt } = require('../util/util');
const path = require('path')
const cerPath = path.join(process.cwd(), '/auth')
generateKeys();
const cypher = encrypt('hello', path.join(cerPath, 'public.cer'));
console.log(cypher);
const plain = decrypt(cypher, path.join(cerPath, 'private.cer'));
console.log(plain);