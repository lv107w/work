/* let:
    1. 不会进行变量提升 无法在声明之前使用let声明的变量
    2. let声明的变量不容许重复声明 预解析阶段会对let声明的变量锁定 所有其他在同一个域下的声明都会报错
    3. let会开启块级作用域 
*/


//不会进行变量提升
// console.log(x); //报错：Cannot access 'x' before initialization
// let x = 10;


//let声明的变量不容许重复声明
// let a;
// let a = 20; // 报错：Identifier 'a' has already been declared

//如果在某一个作用域中有let声明某一个变量 那在这个作用域中就不能再let声明之前使用这个变量

 /*  let num = 10; //全局作用域
  function fn() {//
    console.log(num); //Uncaught ReferenceError: Cannot access 'num' before initialization
    let num = 20; //局部作用域
  }
  fn(); */


  function fn() {
    console.log(num); //报错：Cannot access 'num' before initialization
    num = 20; //局部作用域
  }

  fn();
  let num = 10; //全局作用域




//let会开启块级作用域 
// {
//   let b = 20;
// }
// console.log(b); //报错： b is not defined

var arr = [];
for(let i = 0; i < 5; i++) {
  arr.push(function() {
    console.log(i);
  })
}
console.log(arr[2]()); //2

// 左查询(赋值) 右查询(调用) 作为实参传递的时候是右查询
/* var w = 10;
   function fn(w) {
     console.log(w); //30
     // var w;
     //函数的形参会作为函数的局部变量隐式声明
     w = 20;
     // console.log(w); //20
   }
   fn(w); //变量作为实参传递的时候 是将当前时刻变量的值传入
   
   fn(调用w);//右查询 w  左查询
   
   x = 300; //x为左查询 (赋值)
   
   y = x; //x为右查询 y为左查询 
*/