function ysz () {
  return new Promise((resolve, reject) => {
    let sino = parseInt(Math.random() * 6 + 1)
    setTimeout(() => {
      resolve(sino)
    }, 3000)
  })
}
async function test () {
  let n = await ysz()
  console.log(n)
}
test()
console.log(112)