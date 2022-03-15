const pig = {
  name: 'XIAOHUA',
  age: 1,
  sex: '母猪',
  showName() {
    console.log(`我叫:${this.name}`);
    return this;
  }
}

const otherPig = {
  name: 'XIAOHua',
  age: 2,
  sex: '公猪'
}

pig.showName.call(otherPig);

function sayHi() {
  console.log(this);
  console.log(this.name);
}
sayHi.call(pig);
