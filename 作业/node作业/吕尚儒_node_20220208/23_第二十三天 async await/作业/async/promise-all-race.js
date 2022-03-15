const fs = require('fs').promises
const fsAsync = require('fs')


// async function getText(...filepath) {
//   let result = []
//   let length = filepath.length
//   let promiseReadFiles = filepath.map((item, idx) => {
//     return fs.readFile(item, 'utf-8') //如果没有结果 这个promise就不会结束 就会一直停留在 pending等待状态
//   })

//   console.log(promiseReadFiles);

//   try {
//     let resultData = await Promise.all(promiseReadFiles)
//     console.log(resultData);
//     return 'ok'
//   } catch (err) {
//     console.log(err);
//   }
// }

// getText('./data/a.txt', './data/b.txt', './data/c.txt')


async function getText(...filepath) {
  let result = []
  let length = filepath.length
  let promiseReadFiles = filepath.map((item, idx) => {
    return fs.readFile(item, 'utf-8') //如果没有结果 这个promise就不会结束 就会一直停留在 pending等待状态
  })

  console.log(promiseReadFiles);

  try {
    let resultData = await Promise.race(promiseReadFiles)
    console.log(resultData);
    return 'ok'
  } catch (err) {
    console.log(err);
  }
}

getText('./data/a.txt', './data/b.txt', './data/c.txt')




// async function getData() {
//   return bPath = await fs.readFile('./data/a.txt', 'utf8')
// }

// getData().then((data) => {console.log(data);})