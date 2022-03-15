/* 
const 只读变量(客观值 固定值)
  1. const 声明的变量值 不容许修改
  2. 拥有let所有的特性
    0. 变量不会提升
    1. 不容许先调用后声明
    2. 不容许重复声明
    3. 能够开启块作用域

  3. const声明的变量声明时必须赋值
  4. const的值如果是引用类型 值的属性可以修改

  5. 常量变量名称 建议 全大写 _链接多个单词
*/


//const 声明的变量值 不容许修改
// const PI = 3.1415926;
// PI = 333; //报错：Assignment to constant variable.



//const声明的变量声明时必须赋值
// const Y; //报错：Missing initializer in const declaration


//const的值如果是引用类型 值的属性可以修改
const X = [1, 2, 3];
X[1] = 5;
console.log(X); //[ 1, 5, 3 ]