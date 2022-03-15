const fs = require('fs')
const { EventEmitter } = require('stream')


let eventEmit  = new EventEmitter();


eventEmit.on('readed', function(...args) {
  console.log('2');
  console.log(args);
})

// eventEmit.removeAllListeners('readed')

fs.readFile('path.js', 'utf-8', (err, data) => {
  if(err) {
    console.log(err);
  }
  console.log(data);
  eventEmit.emit('readed', 1, 2, 3)
})