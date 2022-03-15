
module.exports = {
  isFunction (o) {
    return toStringFactory(o) === 'Function'
  },
  isPromise (o) {
    return toStringFactory(o) === 'Promise'
  },
  isRegExp (o) {
    return toStringFactory(o) === 'RegExp'
  },
  isNull (o) {
    return toStringFactory(o) === 'Null'
  },
  isUnderfined (o) {
    return toStringFactory(o) === 'Undefined'
  },
  isObj (o) {
    return toStringFactory(o) === 'Object'
  },
  isDate (o) {
    return toStringFactory(o) === 'Date'
  },

  shuffle (arr) { //数组随机洗牌
    var result = [],
      random;
    while (arr.length > 0) {
      random = Math.floor(Math.random() * arr.length);
      result.push(arr[random])
      arr.splice(random, 1)
    }
    return result;
  }
}

function toStringFactory (o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}

console.log(require.main.filename, '|', __filename, module.filename, 'filename')
