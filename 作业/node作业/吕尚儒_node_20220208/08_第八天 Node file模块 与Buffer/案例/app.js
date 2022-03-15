const fs = require('fs');
const EventEmitter = require('events');
const casePath = require('./case-path.js')
let count = 0;




/*
  node 开发中 大部分时候 我们都在 异步回调操作

  事件 events 可以帮助我们 在一个复杂回调工程外 去监听某一个事件的发生

  events 自定义事件

  1 实例化 events
  2 events的实例化 eventEmit
    1. 监听 eventEmit.on('eventName',function(){})
    2. 触发事件 eventEmit.emit('eventName')

    emit() 主动触发事件
      参数
        1. 事件名称 {String}
        2....N arguments自定义实参

    on() 监听自定义事件回调 别名 addEventListener
        1. 事件名称 {String}
        2. 回调函数 {Function}
          1.....N 对应 emit 第一个实参之后的参数

    once() 参数  同on
      区别: 只触发一次的监听器 触发之后 自动解绑监听

    off() 解绑on监听的自定义事件
      参数:
        1. 解绑的事件名称 必传
        2. 解绑后的回调函数 必传 指定对应on的 回调函数 同 DOM 的 addEventListener 和 removeEventListener

    ps: node开发中 任何回调异步机制的方法 必须传递回调函数参数 就算你没有回调操作需求 也必须传递callback参数


    removeAllListeners 移出对应事件所有的 回调
      参数
        1. event 事件名称

    eventEmit.eventNames() 返回已on监听的事件名称列表
*/

// let eventEmit = new EventEmitter();
// // console.dir(eventEmit);

// eventEmit.on('readed', function (...args) {
//   console.log('2')
// })
// eventEmit.on('aaaa', function (...args) {
//   console.log('2')
// })
// // eventEmit.removeAllListeners('readed')
// console.log(eventEmit.eventNames());








// fs.readFile('./src/styl/b.styl', 'utf-8', (err, data) => {
//   if (err) {
//   }
//   eventEmit.emit('readed', 'b.styl')
// })


// fs.readFile('./src/styl/a.styl', 'utf-8', (err, data) => {
//   if (err) {
//     return false;
//   }
//   // eventEmit.emit('readed', 'a.styl', data)
// })
