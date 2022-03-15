/*
  宏任务  宏任务队列
    setTimeout setInterval ajax DOM操作

  微任务  微任务队列
    Promise
*/

console.log('1', 1)

setTimeout(() => {
  console.log('t1', 2)
}, 0)

Promise.resolve().then(() => {
  console.log('p1', 3)
  Promise.resolve().then(() => {
    console.log('p2', 31)
  })
})

// 检测当前主栈 有任务执行任务 当主栈任务全部执行完毕 ~~检测callbackQueue执行callbackQueue任务~~ 检测微任务队列 如果存在微任务执行微任务 微任务队列里的 都执行完毕了 检测宏任务队列 把宏任务队列的任务进行执行
/*
Stack: [log1, set1, promise1]
microTaskQueue: [proCallback1]
macroTaskQueue: [setCallBack1]

Stack: [proCallback1]
microTaskQueue: []
macroTaskQueue: [setCallBack1]

Stack: [setCallBack1]
microTaskQueue: []
macroTaskQueue: []

Stack: [] 自己的作业
microTaskQueue: [] 女神小红的作业
macroTaskQueue: [] 基友小王的作业



Stack: [log1]
microTaskQueue: []
macroTaskQueue: []


Stack: [log1,set1]
microTaskQueue: []
macroTaskQueue: [setCallBack1]

Stack: [log1,set1,promise1]
microTaskQueue: [proCallback1]
macroTaskQueue: [setCallBack1]

Stack: []
microTaskQueue: [proCallback1]
macroTaskQueue: [setCallBack1]

Stack: [proCallback1]
microTaskQueue: [proCallback131]
macroTaskQueue: [setCallBack1]

Stack: [proCallback131]
microTaskQueue: []
macroTaskQueue: [setCallBack1]


Stack: [setCallBack1]
microTaskQueue: []
macroTaskQueue: []


Stack: []
microTaskQueue: []
macroTaskQueue: []



Stack: [log1, set1, promise1]
microTaskQueue: [proCallback1]
macroTaskQueue: [setCallBack1]

Stack: [proCallback1]
microTaskQueue: []
macroTaskQueue: [setCallBack1]

Stack: [setCallBack1]
microTaskQueue: []
macroTaskQueue: []

*/