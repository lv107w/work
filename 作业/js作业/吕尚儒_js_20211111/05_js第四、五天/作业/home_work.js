/* 使用 if else 实现


    求两个数的最大数
    判断一个数是偶数还是奇数
    分数转换，把百分制转换成ABCDE   <60  E  60-70 D  70-80 C  80-90 B  90 - 100 A
   判断四季 3-5 春 6-8夏  9-11 秋 12-2 冬
    判断一个年份是闰年还是平年
    判断一个人的年龄是否满18岁(是否成年)
 */

//求两个数的最大数
function maxNum(a, b) {
  if (a > b) {
    return '最大值为：' + a;
  } else {
    return '最大值为：' + b;
  }
}

console.log(maxNum(7, 9));



//判断一个数是偶数还是奇数
function foo(num) {
  if(num % 2 === 0) {
    console.log('输入的数为偶数');
  } else {
    console.log('输入的数为奇数');
  }
}

foo(12);


//分数转换，把百分制转换成ABCDE   <60  E  60-70 D  70-80 C  80-90 B  90 - 100 A
function grade(score) {
  var grade = '';
  if (score <= 100 && score >= 0) {
    if(score <= 100 && score > 90) {
      grade = 'A';
    } else if (score > 80) {
      grade = 'B';
    } else if (score > 70) {
      grade = 'C';
    } else if (score > 60) {
      grade = 'D';
    } else {
      grade = 'D';
    } 
  } else {
    grade = '输入无效';
  }
  console.log(grade);
}

grade(89);


//判断四季 3-5 春 6-8夏  9-11 秋 12-2 冬
function season(month) {
  var season = '';
  if (month <= 12 && month > 0) {
    if (month >= 9 && month <= 11) {
      season = '秋';
    } else if (month >= 6) {
      season = '夏';
    } else if (month >= 3) {
      season = '春';
    } else {
      season = '冬';
    } 
  } else {
    season = '输入无效';
  }
  console.log(season);
}

season(8);



//判断一个年份是闰年还是平年
function isLeapYear(year) {
  if (year%4 == 0 && year%100!=0 || year%400 == 0) {//是闰年
    console.log(year+'是闰年!');
    } else {
    console.log(year+'是平年!');
  }
}

isLeapYear(2008);


//判断一个人的年龄是否满18岁(是否成年)
function isAdult(age) {
  if (age > 0 && age <= 144) {
    if (age >= 18) {
      console.log('已成年');
    } else {
      console.log('未成年');
    }
  } else {
    comsole.log('输入无效');
  }
}

isAdult(18);