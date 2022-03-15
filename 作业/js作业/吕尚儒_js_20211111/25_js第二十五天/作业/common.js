
/**
 * @description: 获取元素对应下标
 * @param {Object} item 需要获取下标的元素对象
 * @return {Number} 返回获取的下标
 */
function getElementIdx(item) {
  var elements = item.parentNode.children;
  for(var i = 0, len = elements.length; i < len; i++) {
    if(item === elements[i]) {
      return i;
    }
  }
}




/**
 * @description: 兼容浏览器是否支持这个属性textContent
 * @param {Object} element 需要写入内容的DOM对象
 * @param {String} text 需要写入DOM对象的内容
 */
function setInnerText(element, text) {
  var key = element.textContent == 'undefined' ? 'innerText' : 'textContent';
  element[key] = text;
}


/**
 * @description: 获取元素实际样式, 兼容函数写法
 * @param {Object} obj 元素对象
 * @param {String} attr 元素对象属性
 * @return {String} 返回元素对象style样式
 */
function getStyle(obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}



/**
 * @description: 封装获取元素对象
 * @param {String} ele 需要获取的元素
 * @return {Object} 返回获取到的元素对象
 */
function $(ele) {
  return document.querySelector(ele);
}

function $$(ele) {
  return document.querySelectorAll(ele);
}




/**
 * @description: 添加事件监听兼容写法
 * @param {Object} element 需要监听的DOM对象
 * @param {String} type 事件类型 click mouseenter
 * @param {Function} fn 监听绑定的回调函数
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
 * @description: 解绑事件监听兼容写法
 * @param {Object} element 需要监听的DOM对象
 * @param {String} type 事件类型 click mouseenter
 * @param {Function} fn 监听绑定的回调函数
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
 * @description: 匿名函数解绑写法
 * @param {Object} element 需要监听的DOM对象
 * @param {String} type 事件类型 click mouseenter
 * @param {Function} fn 监听绑定的回调函数
 * @param {Boolean} capture true 捕获阶段监听 false 冒泡阶段监听 
 * @return {JSON} "remove":Function 返回一个用于解除监听的函数
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