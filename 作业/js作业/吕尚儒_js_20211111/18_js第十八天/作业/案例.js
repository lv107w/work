//case00  引用类型值数组去重
 /*
 数组去重 (包含引用类型)
  [1,2,3,4,[1,2,3],[1,2,3],23,4,5,{a:1,b:2},false,{a:1,b:2},{a:1,b:2}]
  [1, 2, 3, 4, Array(3), 23, 5, {…}, false] 
*/
var arr = [1, 2, 3, 4, [1, 2, 3], [1, 2, 3], 23, 4, 5, { a: 1, b: 2 }, false, { a: 1, b: 2 }, null, { a: 1, b: 2 }];
function uniqueObj(arr) {
  var newArr = [];
  var tempArr = [];
  arr.forEach(function(curr, idx, arr) {
    if(newArr.indexOf(curr) === -1) {
      if(tempArr.indexOf(JSON.stringify(curr) === -1)) {
        tempArr.push(JSON.stringify(curr));
        newArr.push(curr);
      }
    }
  });
  return newArr;
}

var result = uniqueObj(arr);
// console.log(result);



//case01  数据处理
/*从某数据库接口得到如下值：
{
  rows: [
    ["Lisa", 16, "Female", "2000-12-01"],
    ["Bob", 22, "Male", "1996-01-21"]
  ],
    metaData: [
      { name: "name", note: '' },
      { name: "age", note: '' },
      { name: "gender", note: '' },
      { name: "birthday", note: '' }
    ]

rows是数据，metaData是对数据的说明。现写一个函数parseData，将上面的对象转化为期望的数组
  [
    { name: "Lisa", age: 16, gender: "Female", birthday: "2000-12-01" },
    { name: "Bob", age: 22, gender: "Male", birthday: "1996-01-21" },

  [1,2,3] = > [2,3,4] 
  filter 排除某些项
  reduce 对数组每一项进行叠加最终归并到一个值
  map  基于每一项原本值进行处理后返回到一个新数组 长度一样
*/


var data = {
  rows: [
    ["Lisa", 16, "Female", "2000-12-01"],
    ["Bob", 22, "Male", "1996-01-21"]
  ],
  metaData: [
    { name: "name", note: '' },
    { name: "age", note: '' },
    { name: "gender", note: '' },
    { name: "birthday", note: '' }
  ]
}

function formatting(data) {
  var rows = data.rows;
  var metaData = data.metaData;
  //首先判断rows, metaData是否有值或不是数组
  if(!Array.isArray(rows) || !Array.isArray(metaData) || rows.length === 0 || metaData.length === 0) {
    return [];
  }
  //map遍历rows,把原数组对应的值换成redcue堆积成的目标对象
  return rows.map(function(item, idx, arr) {
    // console.log(item);
    //reduce遍历item堆积成目标对象
    return item.reduce(function(acc, curr, idx, arr) {
      // console.log(curr);
      acc[metaData[idx]['name']] = curr;
      return acc;
    }, {})
  })
}

console.log(formatting(data));

