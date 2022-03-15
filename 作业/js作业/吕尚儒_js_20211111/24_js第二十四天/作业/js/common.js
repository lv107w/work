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



function $ (ele) {
  return document.querySelector(ele);
}

function $$ (ele) {
  return document.querySelectorAll(ele);
}