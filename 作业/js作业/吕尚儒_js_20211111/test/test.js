
function myNew(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  fn.apply(obj, args);
  return obj;
}


function Pig(name, age) {
  this.name = name;
  this.age = age;
}

function instanceOf(father, chlid) {
  let fp = father.prototype;
  let cp = chlid.__proto__;
  while(cp) {
    if(cp === fp) {
      return true;
    }
    cp = cp.__proto__;
  }
  return false;
}

let pig1 = new Pig('xiao', 2)

console.log(instanceOf(Pig, pig1));
