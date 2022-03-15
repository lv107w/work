function getDigit (num = 0) {
  return {
    units: (num % 10),
    tens: ~~(num / 10),
  }
}
function padLeft (num = 0) {
  return String(num)[1] && String(num) || '0' + num;
}
function randomColor () {
  const COLORS = ['#fa5a5a', '#f0d264', '#82c8a0', '#7fccde', '#6698cb', '#cb99c5']
  return COLORS[~~(Math.random() * COLORS.length)];
}
function defineReactive (obj, key, val, setBack, getBack) {
  Object.defineProperty(obj, key, {
    get: function () {
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      val = newVal;
      setBack && setBack(newVal);
    }
  });
}
function animate ({ ele, styleJson = {}, time = 300, speed = 'linear', callback } = {}) {
  ele.style.transition = `${time}ms ${speed}`;
  setStyle(ele, styleJson);
  ele.addEventListener('transitionend', end, false);
  function end () {
    callback && callback();
    ele.removeEventListener('transitionend', end);
    ele.style.transition = '';
  }
}