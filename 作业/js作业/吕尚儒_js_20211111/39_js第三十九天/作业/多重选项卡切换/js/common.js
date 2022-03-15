/*
 * @Author: your name
 * @Date: 2020-08-11 19:33:50
 * @LastEditTime: 2020-08-22 18:21:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Web前端作业\大名_js_20200810\js\common.js
 */

/**
 * @description: 获取元素对象下标
 * @param {Object} item 需要获取的元素对象
 * @param {Object} elements 在该对象中查找item
 * @return {Number} i 返回获取元素对象下标
 * @Date: 2020-08-11 19:41:21
 */
function getElementIdx (item) {
  var elements = item.parentNode.children;
  for (var i = 0, len = elements.length; i < len; i++) {
    if (item === elements[i]) {
      return i;
    }
  }
}

/**
 * @description: 获取对象文本内容之兼容处理
 * @param {Object} element 需要获取文本内容的对象
 * @return {String} text 返回获取的文本
 * @Date: 2020-08-11 19:50:17
 */
function setInnerText (element, text) {
  if (typeof element.textContent == "undefined") {
    return element.innerText = text;
  } else {
    return element.textContent = text;
  }
}

function $ (ele) {
  return document.querySelector(ele);
}

function $$ (ele) {
  return document.querySelectorAll(ele);
}

//获取元素实际样式
function getStyle (obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

//设置元素样式
function setStyle (dom, css) {
  for (var key in css) {
    dom['style'][key] = css[key];
  }
}


/**
 * @description: 事件监听之兼容性
 * @param {Object} element 需要事件监听的DOM对象
 * @param {String} type 事件类型
 * @param {Function} fn 监听绑定的回调函数
 * @return {type} 
 * @Date: 2020-08-11 19:58:21
 */
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

/**
 * @description: 事件解除监听之兼容性
 * @param {Object} element 需要解除监听的DOM对象
 * @param {String} type 事件类型
 * @param {Function} fn 需要解除监听的回调函数
 * @return {type} 
 * @Date: 2020-08-11 20:03:47
 */
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
 * @description: 函数监听与解除
 * @param {Object} element 需要监听的DOM对象
 * @param {String} type 事件类型
 * @param {Function} fn 监听绑定的回调函数
 * @param {Boolean} capture true 捕获阶段监听 false 冒泡阶段监听 
 * @return {JSON} "remove":Function 返回一个用于解除监听的函数
 * @Date: 2020-08-11 20:05:47
 */
function eventListener (element, type, fn, capture) {
  capture = capture || false;
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

/**
 * @description: 获取一个定位元素左上角距离浏览器可视区域左上角的位置
 * @param {Object} element 需要获取的定位元素
 * @param {Number} left 获取定位元素左上角距离浏览器可视区域左上角的水平距离
 * @param {Number} top 获取定位元素左上角距离浏览器可视区域左上角的垂直距离
 * @return {Object} {left, top} 
 * @Date: 2020-08-13 18:12:12
 */
function getElementPosition (element) {
  var left = 0, top = 0;
  while (element != null) {
    left += element.offsetLeft;
    top += element.offsetTop;
    element = element.offsetParent; //获取最近的祖先定位元素
  }
  return {
    left: left,
    top: top
  }
}

/**
 * @description: 运动框架
 * @param {Object} ele 需要触发的对象
 * @param {JSON} styleJson 需要改变该对象的样式属性
 * @param {Function} styleJson 回调函数
 * @return {Number} 运动速度 
 * @Date: 2020-08-22 18:17:22
 */
function animate(ele, styleJson, callback) {
  clearInterval(ele.time);//保证每次只有一个定时器在运行
  var toggle = false;
  ele.time = setInterval(function () {
    toggle = true;
    for (var key in styleJson) {
      var target = parseInt(styleJson[key]);
      curr = parseInt(getStyle(ele, key));
      speed = (target - curr) / 10;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (curr === target) {
        ele.style[key] = target + 'px';
      }
      ele.style[key] = curr + speed + 'px';
      if (curr !== target) {
        toggle = false;
      }
    }
    if (toggle) {
      clearInterval(ele.time);
      callback && callback();
    }
  }, 1000 / 60);
}