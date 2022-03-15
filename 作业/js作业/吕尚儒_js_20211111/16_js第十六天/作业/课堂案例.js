function Brray(arr) {
  this.arr = arr;
  this.forEach = function (callback) {
    for(var i = 0, len = this.arr.length; i < len; i++) {
      callback(this.arr[i], i, arr);
    }
  },
  this.sort = function (callback) {
    for(var i = 0, len = this.arr.length; i < len; i++) {
      var result = callback(arr[i], arr[i +1 ]);
      if(result > 0) {
        //升序
      } else if (result < 0) {
        //降序
      } else {
        //不变
      }
    }
  },
  this.map = function(callback) {
    var newArr = [];
    for(var i = 0, len = this.arr.length; i < len; i++) {
      newArr[i] = callback(this.arr[i], i, arr);
    }
    return newArr;
  },
  this.filter = function(callback) {
    var newArr = [];
    for(var i = 0, len = this.arr.length; i < len; i++) {
      if(callback(this.arr[i], i, arr)) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },
  this.reduce = function(callback, acc) {
    for(var i = 0, len = this.arr.length; i < len; i++) {
      acc = callback(acc, this.arr[i], i, arr);
    }
    return acc;
  }
}
var arr = [1, 2, 3, 4, 5];
var brr = new Brray(arr);
brr.forEach(function(curr, idx, arr) {
  console.log(curr);
})

console.log(brr.map(function(curr, idx, arr) {
  return curr * 2
}));

console.log(brr.filter(function(curr, idx, arr) {
  return curr < 4;
}));

console.log(brr.reduce(function(acc, curr, idx, arr) {
  return acc + curr;
}, 10));

