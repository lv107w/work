
console.log(1)

setTimeout(function () {
  console.log('t1')
}, 1000)

console.log(2)


setTimeout(function () {
  console.log('t2')
}, 0)

console.log(3)

setTimeout(function () {
  console.log('t3')
}, 0)

console.log(4)



/*
  主任务队列
  [log1,set1,log2,set2,log3,set3,log4,while]

  callbcak队列
  [setCallback2,setCallback3,setCallback1]



*/