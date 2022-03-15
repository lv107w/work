function foreach(arr, callback) {
  for(var i = 0, len = arr.length; i < len; i++) {
    callback(arr[i],i,arr)
  }
}

foreach(['a','b'], function(current, index, arr) {
  console.log(current, index ,arr);
});