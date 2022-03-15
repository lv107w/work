const fs = require("fs");

const eventList = {}

//封装eventOn  eventList中如果没有对应事件名称，添加新数组
const $eventOn = function(type, cb) {
  if(!(type in eventList)) {
    eventList[type] = []
  }
  eventList[type].push(cb);
}

const $eventOff = function(type, cb) {
  //如果没有该事件，或者该事件对应的回调函数不是数组或数组为空
  if(!(type in eventList) || !(Array.isArray(eventList[type]) || eventList[type].length === 0)) {
    return false
  }
  //如果有指定要解绑的回调函数，遍历删除
  if(cb) {
    for(let i = 0, len = eventList[type].length; i < len; i++) {
      let handl = eventList[type][i]
      if(handl.toString() === cb.toString()) {
        let index = eventList[type].indexOf(handl);
        eventList[type].splice(index, 1)
        return handl
      }
    }
  }
}

const $eventEmit = function(type, ...param) {
  if(type in eventList) {
    let arr = eventList[type]
    arr.forEach(cb => cb(...param))
  }
}


$eventOn('readed', function(...param) {
  console.log(2);
  console.log(...param);
})

fs.readFile('./path.js', 'utf-8', (err, data) => {
  $eventEmit('readed', 1, 2, 3)
})