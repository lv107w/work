/*
 * @Author: your name
 * @Date: 2020-08-10 18:59:12
 * @LastEditTime: 2020-08-11 20:43:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \案例\js\common.js
 */
//获取元素对象下标
function getElementIdx (item) {
  var elements = item.parentNode.children;
  for (var i = 0, len = elements.length; i < len; i++) {
    if (item === elements[i]) {
      return i;
    }
  }
}

//设置任意的标签中间的任意文本内容
function setInnerText (element, text) {
  var key = element.textContent == "undefined" ? 'innerText' : 'textContent';
  element[key] = text;
  // //判断浏览器是否支持这个属性
  // if (typeof element.textContent == "undefined") {//不支持
  //   element.innerText = text;
  // } else {//支持这个属性
  //   element.textContent = text;
  // }
}

//获取元素实际样式
function getStyle (obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

//querySelector
function $ (ele) {
  return document.querySelector(ele);
}

//querySelectorAll
function $$ (ele) {
  return document.querySelectorAll(ele);
}



function addEventListener (element, type, fn) {
  if (element.addEventListener) {
    //标准浏览器写法
    element.addEventListener(type, fn, false);
  } else if (element.attachEvent) {
    //IE兼容写法
    element.attachEvent("on" + type, fn);
  } else {
    //on绑定写法
    element["on" + type] = fn;
  }
}


function removeEventListener (element, type, fn) {
  if (element.removeEventListener) {
    element.removeEventListener(type, fn, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, fn);
  } else {
    element["on" + type] = null;
  }
}

/**
 * @description: 函数的功效
 * @param {Object} element 需要监听的DOM对象
 * @param {String} type 事件类型 click mouseenter
 * @param {Function} fn 监听绑定的回调函数
 * @param {Boolean} capture true 捕获阶段监听 false 冒泡阶段监听 
 * @return {JSON} "remove":Function 返回一个用于解除监听的函数
 * @Date: 2020-08-10 22:45:25
 */
function eventListener (element, type, fn, capture) {
  capture = capture || false; //处理capture的默认值为 false
  if (element.addEventListener) {
    //标准浏览器写法
    element.addEventListener(type, fn, capture);
  } else {
    //IE兼容写法
    element.attachEvent("on" + type, fn);
  }

  return {
    'remove': function () {
      if (element.removeEventListener) {
        element.removeEventListener(type, fn, false);
      } else {
        element.detachEvent("on" + type, fn);
      }
    }
  }
}
