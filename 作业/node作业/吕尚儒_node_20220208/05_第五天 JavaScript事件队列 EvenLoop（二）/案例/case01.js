setImmediate(function A () {
  console.log(1);
  setImmediate(function B () { console.log(2); });
});

setTimeout(function timeout () {
  console.log('TIMEOUT FIRED');
}, 0);

//主队列 微任务队列 宏任务队列