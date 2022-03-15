let x = Buffer.from('hello')
console.log(x)

//用0填充 4位值的 Buffer 
let b1 = Buffer.alloc(4)
// 用0x1填充 4位值的 Buffer 
let b2 = Buffer.alloc(4,1)
console.log(b1, b2);

let buf = Buffer.alloc(7, 64)
let len = buf.write("hello world", 3, 5)
for(let i = 0; i < buf.length; i++) {
  console.log(buf[i]);
}

console.log(buf);
let jsonBuf = buf.toJSON();
console.log(jsonBuf);

let nBuf = Buffer.from('pop3');
let resultC = Buffer.concat([buf, nBuf], 13)
console.log(resultC);
console.log(buf.toString(), nBuf.toString());

let toggle = buf.compare(nBuf)
console.log(toggle);
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}


let bf = Buffer.from('hello')
let lf = Buffer.from('world')
bf.copy(lf, 2) //wo + bf前三位 
console.log(bf.toString(), lf.toString());

let res = bf.slice(2, 4);
console.log(res.toString('utf-8'));