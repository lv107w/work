process.nextTick(function A () {
  console.log(1);
  process.nextTick(function B () { console.log(2); });
});

Promise.resolve().then(() => {
  console.log('p1')
  return Promise.resolve()
}).then(() => {
  console.log('p2')
})

setTimeout(function timeout () {
  console.log('TIMEOUT FIRED');
}, 0)