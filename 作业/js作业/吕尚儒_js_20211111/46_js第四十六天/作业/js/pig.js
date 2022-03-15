(function(w) {

function Pig(param = {}) {
  this.init(param);
}


Pig.dragMap = {
  'mousedown': function(e, pig) {
    let ele = pig.ele.dom;
    let pos = pig.ele.pos;
    pos.x = e.clientX;
    pos.y = e.clientY;
    pos.left = ele.offsetLeft;
    pos.top = ele.offsetTop;
    pig.ele.isDown = true;
  },
  'mousemove': function (e, pig) {
    if (!pig.ele.isDown) {
      return false;
    }
    let ele = pig.ele.dom;
    let pos = pig.ele.pos;
    let _x = e.clientX - pos.x;
    let _y = e.clientY - pos.y;
    ele.style.left = _x + pos.left + 'px';
    ele.style.top = _y + pos.top + 'px';
  },
  'mouseup': function (e, pig) {
    pig.ele.isDown = false;
  }
}

Pig.prototype.init = function({ name = 'p1', age = '1', weight = 100, pic = "images/pig.jpg", container = '.container' }) {
  this.name = name;
  this.age = age;
  this.weight = weight;
  this.picUrl = pic;
  this.container = document.querySelector(container);
  this.size = this.container.offsetWidth / 10;
  this.draw();
  this.dragInit();
}

Pig.prototype.draw = function() {
  const vDom = document.createElement('img');
  vDom.src = this.picUrl;
  vDom.width = this.size;
  this.container.appendChild(vDom);
  this.ele = {
    dom: vDom,
    pos: {
      x: 0,
      y: 0,
      left: 0,
      top: 0
    },
    isDown: false
  }
}

Pig.prototype.dragInit = function() {
  let eleImg = this.ele.dom;
  //使用箭头函数，让this指向Pig实例
  let drag = (e) => {
    e.preventDefault();
    if(Pig.dragMap[e.type]) {
      Pig.dragMap[e.type](e, this);
    }
  }

  eleImg.addEventListener('mousedown', drag, false);
  w.document.addEventListener('mousemove', drag, false);
  w.document.addEventListener('mouseup', drag, false);
}
w.Pig = Pig;
})(window)