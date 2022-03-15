var name = '123';
function fn() {
  console.log(this.name);
}
fn()

var obj = {
  name: '1',
  speak() {
    console.log(132356);
    fn();
  }
}

obj.speak()