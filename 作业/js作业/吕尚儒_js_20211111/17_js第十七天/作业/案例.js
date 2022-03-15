// case00  Array 方法 lastIndexOf
var arr = [1, 2, 3, 4, 5, 6, 2];
console.log(arr.lastIndexOf(2));
/*
      找出数组 arr 中重复出现过的元素 输出为新数组
      [1,2,3,4,5,6,4,5,3,2,7]
      [2, 3, 4, 5]

    1. 简单的去重
    2. 思考如何判断一个值在数组中是重复的 
*/
var arr = [1, 2, 3, 4, 5, 6, 4, 5, 3, 2, 7];
function duplicates(arr) {
  var newArr = [];
  arr.forEach(function(curr, idx, arr) {
    if(arr.indexOf(curr) !== arr.lastIndexOf(curr) && newArr.indexOf(curr) === -1) {
      newArr.push(curr);
    }
  })
  return newArr;
}
console.log(duplicates(arr));


//case01  Array 方法 reverse
 /*
      reverse 倒转数组

      1. 修改原数组
      2. 返回值也是原数组
*/
var array1 = ['one', 'two', 'three'];
array1.reverse();
console.log(array1);


//case02  Array 方法 splice
var arr = [1, 2, 3, 4, 5];
console.log(arr.splice(1, 4, '3', '4', '5'));
console.log(arr);
/*
   移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
    [1,2,3,4,5,2,3,2,5,2] , 2=> [1, 3, 4, 5, 3, 5]
*/
var arr = [1, 2, 3, 4, 5, 2, 3, 3, 2, 5, 2];
function removeWithoutCopy(arr, target) {
  for(var i = 0, len = arr.length; i < len; i++) {
    if(arr[i] === target) {
      arr.splice(i, 1);
      i--; //如果不添加此步，数组中出现连续目标值有bug,删除不干净
    }
  }
}
removeWithoutCopy(arr, 3);
console.log(arr);
//此方法不是在原数组上修改
function removeWithoutCopy1(arr, target) {
  return arr.filter(function(curr, idx, arr) {
    return curr !== target;
  })
}
console.log(removeWithoutCopy1(arr, 3));


//case03  Array 方法 includes
var arr = [1, 2, 3, 4, 5, 'T', 't'];
console.log(arr.includes('T', 3));


//case04  Array 方法 flat
/*
  flat 数组扁平化处理 数组降维
  参数 降维深度 number
  返回值 降维后的数组 不改变原素组
*/
var arr = [1, 2, 3, [4, [5, 0], 6], 5, 65];
console.log(arr.flat(2));

arr = [1, 2, [3, 4]];
var flatArr = arr.reduce(function (acc, curr) {
  //acc 初始累计值 在这里是空数组 curr是迭代项
  return acc.concat(curr); //[1,2].concat([3,4])
}, []);
console.log(flatArr);


//case05  Array 方法 valueOf toString
var num = 10;
console.log(num.toString());
console.log([1, 2, 34].toString());
console.log(false.toString());

var b = new Boolean(false);
console.log(b.toString());

var obj = { a: 1 };
console.log(obj.toString());
console.log(JSON.stringify(obj));

function ax() {
  console.log('海牙老师好帅啊');
}
console.log(ax.toString());

var str = new String('你猜猜我是谁');
console.log(b.valueOf(), b);
console.log(str.valueOf(), str);
/*
  所有对象都拥有方法 toString  valueOf
  Array Number Boolean Object Function String
*/

//case06  Array 方法 some every
/*
  判断一个数组是不是纯数字数组
  some 数组中至少有一项符合return的测试 如果有 返回true 如果没有 返回false ||
  every 每一项都通过return的条件 返回true 有一项不通过就返回false  &&
*/
var arr = [1, 2, 3, '4', 5];
console.log(arr.some(function(curr, idx, arr) {
  return typeof curr === 'number';
}));

console.log(arr.every(function(curr, idx, arr) {
  return typeof curr === 'number';
}));


//case07  String charCodeAt replace
var str = '321';
console.log(str.charCodeAt(1));

var str = '好好学习';
console.log(str.replace('好', '坏'));
while(str.indexOf('好') !== -1) {
  var str = str.replace('好', '坏')
}
console.log(str);


//case08  String substr substring
console.log('123456789'.substr(1, 2));
function padLeft(num) {
  num = num || 0; //如果num没有值则赋值0
  return String(num)[1] && String(num) || '0' + num;
}

function padLeft1(num) {
  num = num || 0;
  return String(num)[1] && String(num) || ('00' + num).substr(1, 2)
}

console.log(padLeft1(9));
console.log(padLeft1(19));