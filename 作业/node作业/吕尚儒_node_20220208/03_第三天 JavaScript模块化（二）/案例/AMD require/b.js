define(function () {
  let aIndex = 100;
  return {
    get (x) {
      return aIndex + x;
    }
  }
})