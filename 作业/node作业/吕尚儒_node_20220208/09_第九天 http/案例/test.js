/**
  *  from test.js
  *  reated by 海牙 on 2020年10月30日
  */

  /**
  *  from test.js
  *  reated by 海牙 on 2020年10月30日
  */

  /**
  *  from test.js
  *  reated by 海牙 on 2020年10月30日
  */

  /**
  *  from test.js
  *  reated by 海牙 on 2020年10月30日
  */

  /**
  *  from test.js
  *  reated by 海牙 on 2020年10月30日
  */

  const eventList = {

}


//封装 eventOn eventList 中如果没有对应事件名称 添加新数组
const $eventOn = function (type, cb) {
  if (!(type in eventList)) {
    eventList[type] = [];
  }
  eventList[type].push(cb);
}

const $eventOff = function (type, cb) {
  if (!(type in eventList)) {
    return false;
  }
  if (!(Array.isArray(eventList[type])) || eventList[type].length === 0) {
    return false;
  }
  if (cb) {
    for (let i = 0, len = eventList[type].length; i < len; i++) {
      let handl = eventList[type][i];
      if (handl.toString() == cb.toString()) {
        let index = eventList[type].indexOf(handl)
        eventList[type].splice(index, 1)
        return handl
      }
    }
    return type
  }
}

const $eventEmit = function (type, ...params) {
  if (type in eventList) {
    let arr = eventList[type];
    //arr 内就是 type 事件注册过的回调函数
    arr.map(cb => cb(...params))
  }
}
