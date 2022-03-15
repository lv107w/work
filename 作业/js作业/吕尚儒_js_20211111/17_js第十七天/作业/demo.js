 /*
      数组降维度展平 flat
      [1, 2, 3, 4, [5, 6], [7, [8], 9], 10] = >  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
*/
var arr = [1, 2, 3, 4, [5, 6], [7, [8], 9], 10];
console.log(arr.flat(2));

/*
     数组去重 (基础类型数组集合)
     [1,2,3,4,5,'haha',23,4,5,'haha',false,1]

*/
var arr = [1,2,3,4,5,'haha',23,4,5,'haha',false,1];
function unique(arr) {
  return arr.filter(function(curr, idx, arr) {
    return arr.indexOf(curr, 0) === idx;
  })
}

function unique1(arr) {
  var newArr = [];
  arr.forEach(function(curr) {
    if(newArr.indexOf(curr) === -1) {
      newArr.push(curr)
    }
  })
  return newArr;
}

console.log(unique(arr));
console.log(unique1(arr));

/*
   数组去重 (包含引用类型)
    [1,2,3,4,[1,2,3],[1,2,3],23,4,5,{a:1,b:2},false,{a:1,b:2},{a:1,b:2}]
    [1, 2, 3, 4, Array(3), 23, 5, {…}, false] 
*/
var arr = [1,2,3,4,[1,2,3],[1,2,3],23,4,5,{a:1,b:2},false,{a:1,b:2},{a:1,b:2}];
function uniqueObj(arr) {
  var newArr = [];
  var tempArr = [];
  arr.forEach(function(curr) {
    if(newArr.indexOf(curr) === -1) { //两层过滤，这层无法过滤引用类型,需要下层转成字符串过滤
      if(tempArr.indexOf(JSON.stringify(curr)) === -1) {
        tempArr.push(JSON.stringify(curr));
        newArr.push(curr)
      }
    }
  });
  return newArr;
}
console.log(uniqueObj(arr));

/*
    找出数组 arr 中重复出现过的元素 输出为新数组
    [1,2,3,4,5,6,4,5,3,2,7]
    [2, 3, 4, 5]
*/
var arr = [1,2,3,4,5,6,4,5,3,2,7];
function duplicates(arr) {
  var newArr = [];
  arr.forEach(function(curr) {
    if(arr.indexOf(curr) != arr.lastIndexOf(curr) && newArr.indexOf(curr) == -1) {
      newArr.push(curr);
    }
  })
  return newArr;
}

console.log(duplicates(arr));


/*
  移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
   [1,2,3,4,5,2,3,2,5,2] , 2=> [1, 3, 4, 5, 3, 5]
*/

function removeWithoutCopy(arr, target) {
  for(var i = 0, len = arr.length; i < len; i++) {
    if(arr[i] == target) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
}
console.log(removeWithoutCopy([1, 2, 3, 4, 5, 2, 3, 2, 5, 2], 3));

/*
 从某数据库接口得到如下值：
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
 }
   
   
 rows是数据，metaData是对数据的说明。现写一个函数parseData，将上面的对象转化为期望的数组：
   
   [
     { name: "Lisa", age: 16, gender: "Female", birthday: "2000-12-01" },
     { name: "Bob", age: 22, gender: "Male", birthday: "1996-01-21" },
   ]
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
  if(!Array.isArray(rows) || !Array.isArray(metaData) || rows.length === 0 || metaData.length === 0) {
    return [];
  }
  return rows.map(function(curr, idx, arr) {
    return curr.reduce(function(acc, curr, idx, arr) {
      acc[metaData[idx]['name']] = curr;
      return acc;
    }, {})
  })
}

console.log(formatting(data));