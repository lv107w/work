let NUMBER = 100;
const name = 'lv'

const add = function () {
  NUMBER += 1
}
const get = function() {
  return NUMBER
}

module.exports = {
  name, add, NUMBER, get
}
