const fs = require('fs').promises
const { groupEnd } = require('console')
const fsAsync = require('fs')
const { get } = require('http')

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


//常规读取文件promise封装
function getFilePromise (filepath) {
  return new Promise((resolve, reject) => {
    fsAsync.readFile(filepath, 'utf8', (err, data) => {
      if(err) {
        reject(err)
        return
      }
      resolve(data)
    })
  })
}

getFilePromise('./data/a.txt').then(data => {
  console.log(data);
  return getFilePromise(data)
}).then(data => {
  console.log(data);
  return getFilePromise(data)
}).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
})


async function getData() {
  let bPath = await fs.readFile('./data/a.txt', 'utf8')
  let cPath = await fs.readFile(bPath, 'utf-8')
  let data = await fs.readFile(cPath, 'utf8')

  console.log(`async,await组合===${data}`);
}

getData()


//async/await 错误处理
async function readFileAsync () {
  let data
  try{
    data = await new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove('123')
        reject('错误404')
      }, 1000)
    })

    console.log(data);
    return data
  } catch(err) {
    console.log('error:', err);
  }
}

console.log(readFileAsync().then(data => {
  console.log(data);
}));

