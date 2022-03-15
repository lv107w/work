//冒泡排序
function sort(arr) {
  for(var i = 0, len = arr.length; i < len; i++) {
    for(var j = 0; j < len - i - 1; j++) {
      if(arr[j] > arr[j+1]) {
        var temp = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = temp; 
      }
    }
  }
}


//选择排序
function sort1(arr) {
  for(var i = 0, len = arr.length; i < len; i++) {
    var min = i;
    for(var j = i+1; j < len; j++) {
      if(arr[j] < arr[min]) {
        min = j;
      }
    }
    var temp = arr[min];
        arr[min] = arr[i]; 
        arr[i] = temp;     
  }
}


//插入排序
function sort2(arr) {
  for(var i = 0, len = arr.length; i < len; i++) {
    for(var j = i+1; j >= 0; j--) {
      if(arr[j] < arr[j -1]) {
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}


var arr = [9, 5, 8, 2, 1];

sort(arr);
console.log('冒泡排序：', arr);

sort1(arr);
console.log('选择排序：', arr);

sort2(arr);
console.log('插入排序：', arr);

var arr2 = [1, 2, 3];
var arr3 = arr2;
console.log(arr3);

arr2[0] = 7;
console.log(arr3);