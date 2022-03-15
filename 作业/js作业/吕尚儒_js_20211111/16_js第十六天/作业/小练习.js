var str = '张三|男|李四|男|王五|女|小红|女';
function extract(str) {
  var arr = str.split('|');

  return arr.filter(function(item, index, arr){
    return index % 2 === 0;
  })
}
console.log(extract(str));


var arr =  
[11,12,13,14,15,16,17,18,19,
21,22,23,24,25,26,27,28,29,
31,32,33,34,35,36,37,38,39,
41,42,43,44,45,46,47,48,49];

function raise(arr) {
  return arr.reduce(function(acc) {
    acc.push(arr.splice(0,9));
    return acc
  }, [])
}
console.log(raise(arr));

