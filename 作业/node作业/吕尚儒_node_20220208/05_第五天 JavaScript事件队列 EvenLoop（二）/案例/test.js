setTimeout(function () {
  console.log('t1')
  Promise.resolve().then(console.log('p1'))
}, 0)

setTimeout(function () {
  console.log('t2')
  Promise.resolve().then(console.log('p2'))
}, 0)

// t1 p1 t2 p2

// t1 t2 p1 p2

//区别 node10 以及以前版本 宏任务会队列会一次性执行完 再考虑微任务队列