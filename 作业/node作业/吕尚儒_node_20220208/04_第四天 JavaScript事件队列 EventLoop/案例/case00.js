const fs = require('fs')

let responseText = '';
function readFile ({ url, charset = 'utf-8' }) {
  return new Promise(function (resolve, reject) {
    fs.readFile(url, charset, function (err, data) {
      if (err) {
        console.log('读取失败')
        reject(err)
        return
      }
      console.log('读取成功')
      resolve(data)
    })
  })
}

readFile({
  url: './1.text'
}).then(data => {
  responseText += data
  return readFile({ url: './2.text' })
}).then(data => {
  responseText += data
  return readFile({ url: './3.text' })
}).then(data => {
  responseText += data
  console.log(responseText)
}).catch(err => {
  console.log(err, '报错')
})



// readFile({
//   url: './1.text',
//   success (data) {
//     responseText += data.toString();
//     readFile({
//       url: './2.text',
//       success (data) {
//         responseText += data.toString();
//         readFile({
//           url: './3.text',
//           success (data) {
//             responseText += data.toString();
//             console.log(responseText);
//           },
//           error (err) {
//             console.log(err, '报错')
//           }
//         })
//       },
//       error (err) {
//         console.log(err, '报错')
//       }
//     })
//   },
//   error (err) {
//     console.log(err, '报错')
//   }
// })