/* foreach sort map filter reduce 
方法案例(课上+笔记) 案例写一遍 */

//笔记案例：
//一、foEeach  
//参数：arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
//无返回值
var obj = {
  age: 12
}
var items = ['item1', 'item2', 'item3'];
var copy = [];
items.forEach(function(item) {
  console.log(this);
  copy.push(item);
}, obj)
console.log(copy);
console.log('===============================');

//二、sort
//参数：arr.sort( [,compareFunction(firstEl,secondEl)])
//返回排序后的数组，不会产生新数组
var months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);//按首字母排序
console.log('===============================');

var array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);//按第一个数字排序
console.log('===============================');

var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
})
console.log(numbers); //正序
console.log('===============================');

numbers.sort(function(a, b) {
  return b - a;
})
console.log(numbers); //反序
console.log('===============================');


//三、map
//参数：arr.map(function callback(currentValue[, index[, array]])
//返回值：一个由原数组每个元素执行回调函数的结果组成的新数组。
var originArr =  [1,2,3,4,5];
console.log(originArr.map(function(curr, idx, arr) {
  return curr * 2;
}));
console.log('===============================');

var kvArray = 
[{key: 1, value: 10}, 
{key: 2, value: 20}, 
{key: 3, value: 30}];
console.log(kvArray.map(function(curr) {
  var obj = {};
  obj[curr.key] = curr.value;
  return obj;
}));
console.log('===============================');


//四、filter
//参数：arr.filter(callback(element[, index[, array]])[, thisArg])
//返回值：一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。
var arr = [
  { id: 15 },
  { id: -1 },
  { id: 0 },
  { id: 3 },
  { id: 12.2 },
  { },
  { id: null },
  { id: NaN },
  { id: 'undefined' }
];

function isNumber(obj) {
  return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj);
}

console.log(arr.filter(function(curr) {
  return isNumber(curr.id) && curr.id !== 0;
}));
console.log('===============================');

//五、reduce
//参数：arr.filter(callback(element[, index[, array]])[, thisArg])
//返回值：函数累计处理的结果
var originArr = [3,4,5,6,7,8];
console.log(originArr.reduce(function(acc, curr, idx, arr) {
  return acc + curr;
})); //数组中每项累加和
console.log('===============================');

var str = 'jfkldsajgklasjkhlgjefaklhjaerkl';
var arr1 = str.split('');

var result = arr1.reduce(function(acc, curr) {
  acc[curr] ? acc[curr]++ : acc[curr] = 1;
  return acc;
}, {})

console.log(result);
