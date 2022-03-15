console.log('start')

setTimeout(function () {
  console.log('t1')
  //直接设置一个必然成功的promise任务
  Promise.resolve().then(() => {
    console.log('p1')
  })
}, 0)

setTimeout(function () {
  console.log('t2')
  //直接设置一个必然成功的promise任务
  Promise.resolve().then(() => {
    console.log('p2')
  })
}, 0)
console.log('end')


/*
  start
  end


  序列1
  t1
  p1
  t2
  p2

  序列2
  t1
  t2
  p1
  p2

  EventLoop 事件队列



*/
