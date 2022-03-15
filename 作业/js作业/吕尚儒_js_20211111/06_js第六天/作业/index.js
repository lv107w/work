/* 打印9 9 乘法表
求1-100之间所有数的乘积
求1-100之间所有奇数的和
计算1-100之间能3整除的数的和
计算1-100之间不能被7整除的数的和
//选做
// 讲解思路。如果不会写程序，可以先把数学公式准备好
本金10000元存入银行，年利率是千分之三，每过1年，将本金和利息相加作为新的本金。
计算5年后，获得的本金是多少？
大马驮2石粮食，中马驮1石粮食，两头小马驮一石粮食，要用100匹马，驮100石粮食，
该如何调配
五个小朋友排成一队。问第一个多大了，第一个说比第二个大两岁，问第二个，
第二个说比第 三个大两岁，以此类推。问第五个小朋友几岁了，第五个小朋友说3岁了。
问第一个小朋友几岁 ？ */

//打印9 9 乘法表
function multiplicationTable() {
  var str = '';
  for(var i = 1; i <= 9; i++) {
    for(var j = 1; j < i + 1; j++) {
      str += i + '*' + j + '=' + i*j + ' ';
    }
    str+='\n';
  }
  console.log(str)
}
multiplicationTable();

//求1-100之间所有数的乘积
function foo() {
  var counter = 1;
  for(var i = 1; i < 100; i++) {
    counter *= i
  }
  console.log('1-100之间所有数的乘积为：' + counter)
}

foo();


//求1-100之间所有奇数的和
function foo1() {
  var counter = 0;
  for(var i = 1; i < 100; i++) {
    if(i % 2 === 1) {
      counter += i
    }
  }
  console.log('1-100之间所有奇数的和为：' + counter)
}

foo1();

//计算1-100之间能3整除的数的和
function foo2() {
  var counter = 0;
  for(var i = 1; i < 100; i++) {
    if(i % 3 === 0) {
      counter += i
    }
  }
  console.log('1-100之间能3整除的数的和为：' + counter)
}

foo2();


//计算1-100之间不能被7整除的数的和
function foo3() {
  var counter = 0;
  for(var i = 1; i < 100; i++) {
    if(i % 7 !== 0) {
      counter += i
    }
  }
  console.log('1-100之间不能被7整除的数的为：' + counter)
}

foo3();


/* 本金10000元存入银行，年利率是千分之三，每过1年，将本金和利息相加作为新的本金。
计算5年后，获得的本金是多少？ 
*/

function total() {
  var total = 10000;
  var rate = 1.003;
  for(var i = 1; i <= 5; i++) {
    total *= rate;
  }
  console.log('5年后，获得的本金是:' + total);
}

total();


/* 大马驮2石粮食，中马驮1石粮食，两头小马驮一石粮食，要用100匹马，驮100石粮食，
该如何调配 */

function chooseHorse() {
  for(var a = 0; a <= 100; a++) {
    for(var b = 0; b <= 100; b++) {
      for(var c = 0; c <= 100; c++) {
        if(2 * a + b + 0.5 * c === 100 && a + b + c === 100) {
          console.log('大马' + a, '中马' + b, '小马' + c)
        }
      }
    }
  }
}

chooseHorse();



/* 五个小朋友排成一队。问第一个多大了，第一个说比第二个大两岁，问第二个，
第二个说比第 三个大两岁，以此类推。问第五个小朋友几岁了，第五个小朋友说3岁了。
问第一个小朋友几岁 ？ */

function howOld() {
  var old = 3;
  for(var i = 0; i < 4; i++){
    old += 2;
  }
  console.log(old);
}
howOld();


