/* 求一组数中的所有数的和和平均值
求一组数中的最大值和最小值，以及所在位置
将字符串数组用|或其他符号分割
要求将数组中的0项去掉，将不为0的值存入一个新的数组，生成新的数组
查找数组[1,2,3,4,1,2,3,4,2,3,1,1,0]中所有值为1的项的下标 输出为新数组
翻转数组 [1,2,3,4,5] => [5,4,3,2,1]
  */
 
 
 /*
      一、看数组 观察变化找规律
      初始 ['a','b','c','d','e']
      第一次 ['d','e','a','b','c']
      第二次 ['b','c','d','e','a']
      第三次 ['e','a','b','c','d']
      ...

      规律:
        每一次变幻相比上一次都是每位值进行了+2位移 超出范围的从0开始 0 1 2 3 4 5 => 4 5 0 1 2 3
    */

function foo(arr, n) {
  
  for(var j = 0; j < n; j++) {
    var newArr = [];
    for(var i = 0, len = arr.length; i < len; i++) {
      newArr[(i+2)%len] = arr[i];
    }
    arr = newArr;
  }
  console.log(newArr)
}
var arr = ['a','b','c','d','e'];
foo(arr, 5);
foo(arr, 15);


//求一组数中的所有数的和和平均值
function foo1(arr) {
  var sum = 0, average = 0;
  for(var i = 0, len = arr.length; i < len; i++) {
    sum += arr[i];
  }
  average = sum / len;
  console.log('所有数的和和平均值分别为：' + sum + ', ' + average);
}
arr = [1, 2, 3, 4, 5, 6]
foo1(arr);


//求一组数中的最大值和最小值，以及所在位置
function foo2(arr) {
  var max = arr[0], min = arr[0], maxIndex = 0, minIndex = 0;
  for(var i = 0, len = arr.length; i < len; i++) {
    if(arr[i] >= max) {
      max = arr[i];
      maxIndex = i;
    }
    if(arr[i] <= min) {
      min = arr[i];
      minIndex = i;
    }
  }
  console.log('一组数中的最大值为：' + max + '和最小值为：' + min + '，以及所在位置分别为：' + maxIndex + ',  ' + minIndex);
}

foo2(arr);


//将字符串数组用|或其他符号分割
function foo3(str) {
  var newStr;
  newStr = str.join('|');
  console.log(newStr)
}
var str = ['你', '好', '啊'];
foo3(str);


//要求将数组中的0项去掉，将不为0的值存入一个新的数组，生成新的数组
function foo4(arr) {
  var newArr = [];
  for(var i = 0, len = arr.length; i < len; i++) {
    if(arr[i] !== 0) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

arr = [0, 1, 2, 0, 3];
console.log(foo4(arr));


//查找数组[1,2,3,4,1,2,3,4,2,3,1,1,0]中所有值为1的项的下标 输出为新数组
function foo5() {
  var newArr = [];
  for(var i = 0, len = arr.length; i < len; i++) {
    if(arr[i] === 1) {
      newArr.push(i);
    }
  }
  return newArr;
}

arr = [0, 1, 2, 0, 3, 1];
console.log(foo5(arr));


//翻转数组 [1,2,3,4,5] => [5,4,3,2,1]
function foo6(arr) {
  var newArr = [];
  for(var i = 0, len = arr.length; i < len; i++) {
    newArr.unshift(arr[i]);
  }
  return newArr;
}
arr = [1,2,3,4,5];
console.log(foo6(arr));