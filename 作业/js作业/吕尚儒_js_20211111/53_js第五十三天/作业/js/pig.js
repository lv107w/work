(function (w) {
  const PI = 3.14;

  function Pig (param = {}) {
    this.init(param);
  }

  Pig.dragMap = {
    'mousedown': function (e, pig) {
      let ele = pig.ele.dom;
      let pos = pig.ele.pos
      pos.x = e.clientX;
      pos.y = e.clientY;
      pos.left = ele.offsetLeft;
      pos.top = ele.offsetTop;
      pig.ele.isDown = true;
    },
    'mousemove': function (e, pig) {
      if (pig.ele.isDown) {
        let ele = pig.ele.dom;
        let pos = pig.ele.pos;
        let _x = e.clientX - pos.x;
        let _y = e.clientY - pos.y;
        ele.style.left = _x + pos.left + 'px';
        ele.style.top = _y + pos.top + 'px';
      }
    },
    'mouseup': function (e, pig) {
      pig.ele.isDown = false;
    }
  };

  Pig.prototype.siblings = [];//Array 引用类型
  Pig.prototype.init = function ({ name = 'p1', age = 1, weight = 100, pic = "images/pig.jpg", container = '.container' }) {
    this.name = name;
    this.age = age;
    this.weight = weight;
    this.picUrl = pic;
    this.container = document.querySelector(container);
    this.size = this.container.offsetWidth / 10;
    this.siblings.push(this);
    this.draw();
    this.dragInit();
  }

  Pig.prototype.draw = function () {
    const vDom = document.createElement('img');
    vDom.src = this.picUrl;
    vDom.width = this.size;
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
    this.container.appendChild(vDom);
  }

  Pig.prototype.dragInit = function () {
    let eleImg = this.ele.dom;
    let drag = (e) => {
      e.preventDefault();
      //this 指向 监听事件的DOM对象
      if (Pig.dragMap[e.type]) {
        Pig.dragMap[e.type](e, this);
      }
      return false;
    }
    eleImg.addEventListener('mousedown', drag, false);
    w.document.addEventListener('mousemove', drag, false);
    w.document.addEventListener('mouseup', drag, false);
  }

  Pig.prototype.eat = function () {
    console.log(`我是${this.name} 我${this.age}岁了 我要吃饭了`);
  }
  Pig.prototype.bloodReturn = function (len) {
    //根据一共实例化了多少头猪来确定回多少血
    console.log(`回血 ${len * 100}`);
  }
  //料肉比 饲料/增肉量  
  Pig.prototype.feedConversionRatio = 2.4;

  w.Pig = Pig;//Pig构造函数挂载在 全局window对象上
})(window);