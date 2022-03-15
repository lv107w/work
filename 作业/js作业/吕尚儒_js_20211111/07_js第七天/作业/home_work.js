/* 求1-100之间不能被7整除的整数的和（用continue）
求200-300之间所有的奇数的和（用continue）
求200-300之间第一个能被7整数的数（break）



一、看数组 观察变化找规律
初始 ['a','b','c','d','e'] 
第一次 ['d','e','a','b','c']
第二次 ['b','c','d','e','a']
第三次 ['e','a','b','c','d']
...
请问第五次 第十五次数组是如何?

二、抽茧剥丝
var arr = ['鸡腿',101,'3','奥利奥',9,false,'33a',1.333,'巧克力'];
求数组中所有类型为number的整数之和 */





//求1-100之间不能被7整除的整数的和（用continue）
function foo() {
  var num = 0;
  for(var i = 1; i <= 100; i++) {
    if(i % 7 === 0) {
      continue;
    }
    num += i;
  }
  console.log('1-100之间不能被7整除的整数的和为：' + num);
}

foo();

//求200-300之间所有的奇数的和（用continue）
function foo1() {
  var num = 0;
  for(var i = 200; i <= 300; i++) {
    if(i % 2 === 0) {
      continue;
    }
    num += i;
  }
  console.log('200-300之间所有的奇数的和为：' + num);
}

foo1();
//求200-300之间第一个能被7整数的数（break）
function foo2() {
  var num = 0;
  for(var i = 200; i < 300; i++) {
    if(i % 7 === 0) {
      num = i;
      break;
    }
  }
  console.log('200-300之间第一个能被7整数的数为：' + num)
}

foo2();


/* 一、看数组 观察变化找规律
初始 ['a','b','c','d','e'] 
第一次 ['d','e','a','b','c']
第二次 ['b','c','d','e','a']
第三次 ['e','a','b','c','d']
...
请问第五次 第十五次数组是如何? */

function foo3(n) {
  var arr = ['a','b','c','d','e'];
  var newArr = [];
  //循环n次移动
  for(var i = 0; i < n; i++) {
    //数组中的元素向前循环移动两位
    for(var j = 0; j < arr.length; j++) {
      if(j < 3) {
        newArr[j+2] = arr[j];
      } else {
        newArr[j-3] = arr[j]
      }
    }
    //把新生成的数组赋值给原数组，以便进行下一次元素移动
    for(var m = 0; m < arr.length; m++) {
      arr[m] = newArr[m]
    }
  }

  console.log('第' + n + '次数组是' + newArr)
}
foo3(5);
foo3(15);

/* 二、抽茧剥丝
var arr = ['鸡腿',101,'3','奥利奥',9,false,'33a',1.333,'巧克力'];
求数组中所有类型为number的整数之和  */
function foo4() {
  var arr = ['鸡腿',101,'3','奥利奥',9,false,'33a',1.333,'巧克力'];
  var num = 0;
  for(var i = 0; i < arr.length; i++) {
    if(!isNaN(arr[i])) {
      if( typeof arr[i] === 'number' && arr[i] % 1 === 0) {
        num += Number(arr[i]);
      } else {
        continue;
      }
    }
  }
  console.log('数组中所有类型为number的整数之和为：' + num);
}

foo4();
