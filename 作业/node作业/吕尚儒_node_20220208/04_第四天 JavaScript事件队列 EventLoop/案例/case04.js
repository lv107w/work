console.log(1); //1 log1
setTimeout(() => { //2 set1  
  console.log(2); //macro 1 log11 2
  Promise.resolve().then(() => {
    //pro2
    console.log(3)
  });
});
new Promise((resolve, reject) => { //3 pro1
  console.log(4) //注意: 直接执行 promise的 then catch
  resolve(5)
}).then((data) => {
  //mircro1
  console.log(data);
})
setTimeout(() => { //4 set2
  console.log(6);
})
console.log(7); // 5 log2

/*
 Stack: [log1,set1,pro1,log4,set2,log2]
 mircroTask: [pro1Callback]
 macroTask: [set1Callback,set2Callback]

 1 4 7

 Stack: [pro1Callback]
 mircroTask: []
 macroTask: [set1Callback,set2Callback]

 5

 Stack: [set1Callback]
 mircroTask: [pro2Callback]
 macroTask: [set2Callback]

 2

 Stack: [pro2Callback]
 mircroTask: []
 macroTask: [set2Callback]

 3

 Stack: [set2Callback]
 mircroTask: []
 macroTask: []

 6

 Stack: []
 mircroTask: []
 macroTask: []
*/
