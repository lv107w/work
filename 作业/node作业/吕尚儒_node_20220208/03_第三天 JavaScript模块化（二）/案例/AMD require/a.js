define(function () {
  let aIndex = 10;
  return {
    get (x) {
      return aIndex + x;
    },
    set (val) {
      aIndex = val
    }
  }
})