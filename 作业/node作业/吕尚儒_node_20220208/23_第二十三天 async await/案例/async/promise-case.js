const fs = require('fs').promises
const fsAsync = require('fs')

function getFilePromise (filepath) {
  return new Promise(function (resolve, reject) {
    fsAsync.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })
}

// 常规同步函数
function getFileSync () {
  new Promise(function (reject, resolve) {
    setTimeout(() => {
      console.log('倒计时结束 1')
    }, 4000)
  })
  return '同步函数' //
}
// console.log(getFileSync())

//异步async函数
// async function getFileAsync () {
//   //承诺 只要开启 必须要有一个结果 (resolve or reject) 如果没有结果 这个promise就不会结束 就会一直停留在 pending等待状态
//   await new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       console.log('倒计时结束 1')
//       resolve('倒计时结束 1')
//     }, 4000)
//   })

//   console.log('哈哈哈哈 2') //2
//   return '异步函数 3'
// }

// getFileAsync()// 返回的是一个promise对象 函数内return的其实是 resolve的实参 
// .then(d => console.log(d)) //3 

// console.log(getFileAsync().then(d => { console.log(d) }))


//async/awati 处理错误
async function readFileAsync (filePath) {
  let data
  try {
    data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('错误 0000')
      }, 1000)
    })
    return data
  } catch (e) {
    console.log('error ===========', e)
  }
}

console.log(readFileAsync().then(data => {
  console.log(data)
}))







// getFilePromise('./data/a.txt').then(path => {
//   //返回新的promise对象  getFilePromise() 
//   return getFilePromise(path) // path 就是a.txt内容 文件b的路径
// }).then(path => {
//   return getFilePromise(path) // path 就是b.txt内容 文件c的路径
// }).then(data => {
//   console.log(data) // 文件c的内容
// }).catch(err => {
//   console.log('error')
//   console.log(err)
// })



// //函数表达式
// const getDataA = async function () {

// }

// //对象属性
// let o = {
//   async getData () {

//   }
// }

// //class 
// class Viltady {
//   constructor() { }

//   async getMsg () {

//   }
// }



// async function getData () {
//   let bPath = await fs.readFile('./data/a.txt', 'utf8')
//   let cPath = await fs.readFile(bPath, 'utf8')
//   let data = await fs.readFile(cPath, 'utf8')
//   console.log(data)
// }
// getData()


/*
 什么是 Async/Await

 帮助我们更好的理解异步函数
 本质上其实是promise 的进阶语法糖

 async
  声明一个异步函数

  async关键字声明的函数 会自动将函数转化为Promise
  只有async函数内部的异步操作执行完 才会执行then方法指定的回调函数
  async异步函数内可以使用await

 await
  暂停异步功能的执行

  放置在primise对象前的 关键字await强制其他代码进行等待 直到promise 返回结果
  只能和promise一起使用 不适合常规的回调写法
  只能在async 函数内部使用



*/

