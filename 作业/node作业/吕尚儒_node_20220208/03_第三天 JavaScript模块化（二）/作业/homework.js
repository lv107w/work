/* 作业 
通过闭包实现模块化协作 

实现三个 模块 A数据模块  B工具模块  C主模块

A模块 内部私有变量为数组 外部只能通过特定方法修改数组 读取数组

B模块 提供数组修改方法 暴露给外部使用
  1. 原生实现reduce方法
  2. 原生实现 map 方法

C模块: 利用模块B提供的方法 操作 模块A内的私有变量数组 
*/


let module_a = (function() {
  let arr = [1, 2, 3, 4, 5, 6]
  return {
    set(callback) {
      arr = callback&&callback(arr)
    },
    get() {
      return arr
    }
  }
})()



let module_b = (function() {
  return {
    map(callback) {
      module_a.set(function(arr) {
        let newArr = []
        for(let i = 0, len = arr.length; i < len; i++) {
          newArr.push(callback(arr[i], i, arr))
        }
        return newArr
      })
    },
    reduce(callback, acc) {
      module_a.set(function(arr) {
        for(let i = 0, len = arr.length; i < len; i++) {
          acc = callback(acc, arr[i], i, arr)
        }
        return acc
      })
    }
  }
})()



let module_c = (function() {
  module_b.map(function(item, idx) {
    return item * 2;
  })
  console.log(module_a.get());
  

  module_b.reduce(function(acc, curr, idx) {
    return acc + curr
  }, 10)
  console.log(module_a.get());
})()
