define(function (require, exports, module) {
  //....
  //....
  //....
  //需要用到jquery的时候 require()方法导入jquery
  var $ = require('jquery');
  console.log($);
  // return {
  //   x: 10
  // }
  // exports.x = 10;
  module.exports = {
    add: function (a, b) {
      return a + b;
    }
  }
})