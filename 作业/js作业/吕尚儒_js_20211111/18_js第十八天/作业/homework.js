 /*
     将下面这个对象转为数组 并实现 一个排序方法 一个筛选方法 
   */

    /*
     例子 :
     
      formattingSort('height');   调用 formattingSort 传参 'height' 就以height属性值为排序属性 升序排序
 
      [{
        name: 'Dan',
        age: 1,
        sex: 1,
        weight: '79kg',
        height: '110cm'
      },
      {
        name: 'meney',
        age: 4,
        sex: 1,
        weight: '69kg',
        height: '160cm'
      },
      {
        name: 'joker',
        age: 1,
        sex: 0,
        weight: '99kg',
        height: '190cm'
      },
      {
        name: 'jojo',
        age: 18,
        sex: 1,
        weight: '90kg',
        height: '195cm'
      },
      {
        name: 'stack',
        age: 99,
        sex: 1,
        weight: '199kg',
        height: '1190cm'
      }]
 
 
 
       formattingFilter('age',function(item){
         return item > 10;
       });
 
       调用 formattingFilter 传参 'age' 和回调函数 
       以age属性为过滤条件 条件为 function回调函数的return公式
 
         
      [{
        name: 'jojo',
        age: 18,
        sex: 1,
        weight: '90kg',
        height: '195cm'
      },
      {
        name: 'stack',
        age: 99,
        sex: 1,
        weight: '199kg',
        height: '1190cm'
      }]
    
    */


      var oData = {
        'joker': {
          age: 1,
          sex: 0,
          weight: '99kg',
          height: '190cm'
        },
        'meney': {
          age: 4,
          sex: 1,
          weight: '69kg',
          height: '160cm'
        },
        'Dan': {
          age: 1,
          sex: 1,
          weight: '79kg',
          height: '110cm'
        },
        'jojo': {
          age: 18,
          sex: 1,
          weight: '90kg',
          height: '195cm'
        },
        'stack': {
          age: 99,
          sex: 1,
          weight: '199kg',
          height: '1190cm'
        }
      }


      //对象转为数组
      function formatting(data) {
        var arr = [];
        for(key in data) {
          data[key]['name'] = key;
          arr.push(data[key])
        }
        return arr;
      }

      var data = formatting(oData)
      console.log(data);



    // formattingSort('height');   调用 formattingSort 传参 'height' 就以height属性值为排序属性 升序排序
     function formattingSort(data, property) {
       return data.sort(function(a, b) {
         if(property === 'age' || property === 'sex') {
          return a[property] - b[property];
         } else if (property === 'weight' || property === 'height') {
          //  console.log(Number(a[property].slice(0, -2)), Number(b[property].slice(0, -2)));
          return Number(a[property].slice(0, -2)) - Number(b[property].slice(0, -2));  //a[property].slice(0, -2)表示对象属性值去掉字符串后两位
         }
       })
     }
     console.log(formattingSort(data, 'height'));



    /* formattingFilter('age',function(item) { return item > 10; }); */
    //遍历data把符合回调函数的对象都push到新数组里
     function formattingFilter(data, property, callback) {
       var newData = []
        for(item of data) {
          // console.log(item);
          if(property === 'age' || property === 'sex') {
            if(callback(item[property])) {
              newData.push(item)
            }
          } else if (property === 'weight' || property === 'height') {
            if(callback(item[property].slice(0, -2))) {
              newData.push(item)
            }
          }
        }
        return newData;
     }

     console.log(formattingFilter(data, 'weight', function(item) {
       return item > 100;
     }));





     console.log('=================================================================');
     //================================方法改进=========================================
     //对象转为数组(map对象拼接)
     console.log(oData);
      function formatting1(data) {
       var result = Object.keys(data);
       //  console.log(result);
         return result.map(function(item, idx, arr) {
           return Object.assign({name: item}, data[item])
         })
     }
     var data = formatting1(oData);
     console.log(data);


     // formattingSort('height');   调用 formattingSort 传参 'height' 就以height属性值为排序属性 升序排序
     //截取字符串的数字可以用parseFloat，同时要对传递的参数进行过滤
     function formattingSort1(data, property) {
       if(typeof data[0][property] === 'undefined') {
         return data;
       }
       return data.sort(function(a, b) {
         return parseFloat(a[property]) - parseFloat(b[property]);
       })
     }

     console.log(formattingSort1(data, 'weight'));

    
     /* formattingFilter('age',function(item) { return item > 10; }); */
     //filter过滤符合条件的对象
     function formattingFilter1(data, property, callback) {
       return data.filter(function(item, idx) {
         return callback(parseFloat(item[property]))
       })
     }

     console.log(formattingFilter1(data, 'height', function(item) {
      return item > 190;
    }));

