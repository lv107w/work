/**
  *  from buffer.js
  *  readed by lv on 2022年2月17日
  */
let x = Buffer.from('hello'); //ascii

console.log(x) //[104,101,108,108,111]


//用0填充 4位值的 Buffer 
let b1 = Buffer.alloc(4);
// 用0x1填充 4位值的 Buffer 
let b2 = Buffer.alloc(4, 1);


//填充的buffer就指定了位 3
/*
  Buffer.write 
    string offset length encoding('utf8')
*/
//我们填充了一个长度7的Buffer每一位都是 ascii(64)=>(@)
let buf = Buffer.alloc(7, 64);
//[@,@,@,@,@,@,@]
// 往buf中第3位开始写入"hello world!"的前5位值"hello"
//[64,64,64,104,101,108,108] => [@,@,@,h,e,l,l] write返回写入buffer的字符长度
let len = buf.write("hello world!", 3, 5)
for (let i = 0; i < buf.length; i++) {
  // console.log(buf[i])
}
//[@,@,@,h,e,l,l] 3,7 >=3 <7
// console.log(buf.toString('utf-8', 3, 7), len); //@@@hell
//把buffer转换为JSON {type:"Buffer",data:[]}
let jsonBuf = buf.toJSON();
// console.log(jsonBuf.data)


// buffer 合并 concat Buffer.concat(list[, totalLength])
//buf 7 一个汉字 占据3个字节在Buffer中
let nBuf = Buffer.from('pop3');

let result = Buffer.concat([buf, nBuf], 13);
// console.log(result.toString('utf8'))

let toggle = buf.compare(nBuf);
// 0 代表 两个buffer完全一致  *


//拷贝 buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
let bf = Buffer.from('hello')
let lf = Buffer.from('world')
bf.copy(lf, 2) //wohel  hello wo + bf前三位 
console.log(bf.toString('utf8'))

//剪裁 slice buf.slice([start[, end]]) 
//bf hello  ll
let res = bf.slice(2, 4)
console.log(res.toString('utf8'))

