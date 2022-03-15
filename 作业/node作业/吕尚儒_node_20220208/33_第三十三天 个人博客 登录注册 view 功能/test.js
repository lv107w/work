function add({name="lc", age = 12, sub = () => {console.log('daw')}}) {
  console.log(name, age);
  sub()
}

add({})