/* 练习 3+1种 对象创建(生产) 方式
练习 this 3种情况指向
实践 instanceof 判断 Number String Boolean Array Function Object 的结果
练习下 课前小案例 (数组切割+拼接)的那个案例
 */



// 练习 3+1种 对象创建(生产) 方式
//一、字面量创建
var obj = {
  name: '张三',
  gender: '男',
  age: 21,
  speak() {
    console.log('好好学习');
  }
}

console.log(obj.name, obj.gender, obj.age);
obj.speak();

console.log('=====================================');
//原生对象实例化
var person = new Object();
person.name = '李四';
person.age = 22;
person.speak = function() {
  console.log('我是好人');
}

console.log(person.name, person.age);
person.speak();


console.log('=====================================');

//工厂函数创建对象
function creatDog(name, age, color) {
  var dog = new Object();
  dog.name = name;
  dog.age = age;
  dog.color = color;
  dog.speak = function() {
    console.log('汪汪汪~');
  }
  return dog;
}
 
var myDog = creatDog('小乖', 1, 'black')

console.log(myDog.name, myDog.age, myDog.color);
myDog.speak();

console.log('=====================================');

//自定义构造函数创建
function Cat(name, age) {
  this.name = name;
  this.age = age;
  this.speak = function() {
    console.log('喵喵喵~');
  } 
}

var myCat = new Cat('小花', 1);
console.log(myCat.name, myCat.age);
myCat.speak();


console.log('===================');
//练习 this 3种情况指向

//一、一般函数直接执行，内部this指向全局window
function fn() {
  console.log(this);
}
fn();

console.log('===================');

//二、函数作为一个对象的方法，被该对象所调用，那么this指向的是该对象
var obj1 = {
  name: 'obj1',
  showThis() {
    console.log(this);
  }
}

obj1.showThis()

//三、构造函数中的this其实是一个隐式对象，类似一个初始化的模型，所有方法和属性都挂载到了这个隐式对象身上，后续通过new关键字来调用，从而实现实例化
function Student(name, age) {
  this.name = name;
  this.age = age;
  this.showThis = function() {
    console.log(this);
  }
}

var stu = new Student('小明', 18);
stu.showThis();



//实践 instanceof 判断 Number String Boolean Array Function Object 的结果
var num1 = 123;
var num2 = new Number(123);
console.log(num1 instanceof Number); //false
console.log(num2 instanceof Number); //true

console.log('===================');

var str1 = 'hhhh';
var str2 = new String('hhhh');
console.log(str1 instanceof String); //false
console.log(str2 instanceof String); //true

console.log('===================');

var boolean1 = true;
var boolean2 = new Boolean(true);
console.log(boolean1 instanceof Boolean); //false
console.log(boolean2 instanceof Boolean); //true

console.log('===================');

var arr1 = [1, 2];
var arr2 = new Array([1,2]);
console.log(arr1 instanceof Array); //true
console.log(arr2 instanceof Array); //true

console.log('===================');

var foo1 = function() {}
var foo2 = new Function()

console.log(foo1 instanceof Function); //true
console.log(foo2 instanceof Function); //true

console.log('===================');
var oop1 = {}
var oop2 = new Object();
console.log(oop1 instanceof Object); //true
console.log(oop2 instanceof Object); //true



console.log('===================');
//练习下 课前小案例 (数组切割+拼接)的那个案例

var jointArray = (arrA, arrB, limit) => arrA.concat(arrB).slice(0, limit)
var arrA = ['jojo','okko','张三','秃头','帅小伙'];
var arrB = ['你好','小脑斧','大西瓜','长得帅'];

console.log(jointArray(arrA, arrB, 7));