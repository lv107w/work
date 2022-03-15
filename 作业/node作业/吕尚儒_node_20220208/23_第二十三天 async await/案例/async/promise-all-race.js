const fs = require('fs').promises
const fsAsync = require('fs')



function getTxt (...filePaths) {
  let result = []
  let length = filePaths.length
  let promiseReadFiles = filePaths.map((item, idx) => {
    //return 一个promise对象
    return fs.readFile(item, 'utf8')
  })
  console.log(promiseReadFiles)



  // Promise.all(promiseReadFiles).then(result => {
  //   console.log(result) //[ './data/b.txt', './data/c.txt', 'hello promise' ]
  //   console.log(result.join('====='))
  // }).catch(err => {
  //   console.log(err)
  // })

  //只要有一个 promise 完成就 结束 剩下的promise被丢弃
  // Promise.race(promiseReadFiles).then(result => {
  //   console.log(result) //第一个成功的promise的结果
  //   // console.log(result.join('====='))
  // }).catch(err => {
  //   console.log(err)
  // })

}
// getTxt('./data/a.txt', './data/b.txt', './data/c.txt')

async function getTxt (...filePaths) {
  let result = []
  let length = filePaths.length
  let promiseReadFiles = filePaths.map((item, idx) => {
    //return 一个promise对象
    return fs.readFile(item, 'utf8')
  })
  console.log(promiseReadFiles)
  try {
    let resultData = await Promise.all(promiseReadFiles)
    console.log(resultData)
    return 'ok'
  } catch (err) {
    console.log(err)
  }
}
getTxt('./data/a.txt', './data/b.txt', './data/c.txt')


/*
  多接口并行请求
  多个异步需要并行处理的情况

  三个异步处理 获得的结果进行组合

  Array.prototype.every() 数组每一项都符合回调条件 返回true 有任何一项不符合 返回false

  Promise.all 参数中所有的promise都resolve 执行then 有任何一个 走了reject 整体走 catch

  Promise.all([promise1,promise2,promise3,....promiseN]).then( results => {
    results 是参数promise对象数组中所有promise的resolve结果组合成的数组

  }).catch(err=>{
    如果all 的promise对象中 有一个是reject 就会全部走 catch
  })

  all 使用场景
   需要多个请求的结果合并
    三个接口的结果拼接为秘钥进行数据请求





  Promise.race() 参数数组promise中有任何一个完成就then 回调第一个完成的promise 结果 其他的忽略

  有任何一个promise参数catch 就走catch

  race使用场景

    非A即B
    竞速调用
      3个接口 (主服务器接口 , CND服务器接口, API专用服务器接口)
        有任何一个返回 其他两个都 abort 终止


  注意:
    Promise.all Promise.race 都是Promise构造函数的静态方法


*/