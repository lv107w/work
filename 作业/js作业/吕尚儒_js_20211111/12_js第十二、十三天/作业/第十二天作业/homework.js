/* 复习作用域 函数
复习数组 字符串基础方法
 */

/*
  有两个数组 数组A 数组B
  数组A为固定初始数组 ['jojo','okko','张三','秃头','帅小伙']
  数组B为用户动态选择添加的值 [] ... 不确定
  需要 将数组B中前N 位添加到 数组A中 N = 7 - 数组A.length
  数组A 有限制长度 7

  例如 A:  ['jojo','okko','张三','秃头','帅小伙']
      B: ['你好','小脑斧','大西瓜','长得帅']
     输出: ['jojo','okko','张三','秃头','帅小伙','你好','小脑斧'];
*/ 

var jointArray = (arrA, arrB, limit) => arrA.concat(arrB).slice(0, limit)
var arrA = ['jojo','okko','张三','秃头','帅小伙'];
var arrB = ['你好','小脑斧','大西瓜','长得帅'];

console.log(jointArray(arrA, arrB, 7));
    
/*
  函数 作用域
    
*/
console.log(x); // undefined
f1();
var x = 0;
function f1() {
  f2();
  var x = 10;
  function f2() {
    x = 20;
    console.log(x); // 20
  }
}
console.log(x); //0




    
console.log(a); //函数
function a() {
  a = 20;
}
a();
console.log(a); //20
var a = 30;
console.log(a); // 30
    


      
function f1() {
  var arr = [];
     
  for (var i = 0; i < 10; i++) { 
    arr.push(function () {
      return i; 
    });
    console.log(arr[i]());
  }
  // console.log(i); //10
  return arr;
}
    
console.log(f1()[0]()); //10
