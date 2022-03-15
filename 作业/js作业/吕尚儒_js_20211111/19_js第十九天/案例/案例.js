//case00  Math 方法
console.log(Math.abs(-1));    //1
console.log(Math.abs('-1'));  //1
console.log(Math.abs(null));  //0
console.log(Math.abs('-123'));//123
console.log(Math.abs('str')); //NaN
console.log(Math.abs());      //NaN

console.log(Math.max(1, 2, 3, 4, 5)); //5
console.log(Math.min(1, 2, 3, 4, 5)); //1

var num = Math.random() * 100;
console.log(num);

console.log(Math.pow(2, 3));

console.log(Math.random() * 100); //0 - 100
console.log(Math.random() * 200 -100); //-100 - 100

console.log(Math.round(1.3));



//case01  Date对象
var date = new Date();
console.log(date);
console.log(date.valueOf());
console.log(+date);
console.log(date.toString());
console.log(date.getDate());
console.log(date.getFullYear());
console.log(date.getMonth());
console.log(date.getDay());
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());

//// 22021年11月23日 17:39:26 星期二
function formatDate(d) {
  //如果date不是日期对象，返回
  if (!d instanceof Date) {
    return;
  }
  var year = d.getFullYear(),
    month = d.getMonth() + 1,
    date = d.getDate(),
    hour = d.getHours(),
    minute = d.getMinutes(),
    second = d.getSeconds(),
    week = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]; // 1234560 => 一 二 三 四 五 六 七
  return year + '年' + padLeft(month) + '月' + padLeft(date) + '日 ' + padLeft(hour) + ':' + padLeft(minute) + ':' + padLeft(second) + ' 星期' + week;
}

function padLeft(num) {
  return String(num)[1] && String(num) || '0' + num;
}
console.log(formatDate(date));

//计算时间差
function getInterval(start, end) {
  var day, hour, minute, second, interval;
  interval = end - start;
  interval /= 1000; //毫秒=>秒
  day = ~~(interval / 60 / 60 / 24); // 24 60 60  300000/60/60/24 1.4
  hour = ~~(interval / 60 / 60 % 24); // interval / 60 => 分钟 interval / 60 / 60 小时
  minute = ~~(interval / 60 % 60);// interval / 60 => 分钟 interval / 60 / 60 小时
  second = ~~(interval % 60);
  return {
    day: day,
    hour: hour,
    minute: minute,
    second: second
  }
}