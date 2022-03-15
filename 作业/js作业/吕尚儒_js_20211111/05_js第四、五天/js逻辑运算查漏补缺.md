#### 短路运算

- 短路与 &&
  -  如果左边为真 返回右边
  - 如果左边为假 返回左边本身
- 短路或 ||
  - 如果左边为假 返回右边
  - 如果左边为真 返回左边本身



#### 关系比较运算

- == 值相等就可以 === 值和类型完全相等
- !=只判断值是否不等，！==需要判断值和类型是否有任意不等

~~~js
 2 == '2'; //true
 2 === '2'; //false 类型不等  true  false
 
 2 != '2';//false 只判断值是否不等于 
 2 !== '2'; //只要类型或者值 有一个不相等 就成立
~~~



#### 运算符的优先级

	优先级从高到底
		1. ()  优先级最高
		2. 一元运算符  ++   --   !
		3. 算数运算符  先*  /  %   后 +   -
		4. 关系运算符  >   >=   <   <=
		5. 相等运算符   ==   !=    ===    !==
		6. 逻辑运算符 先&&   后||
		7. 赋值运算符
		8. 默认从左至右 除了 赋值运算 = 三目运算 ?: 指数运算 **



#### 转换成字符串类型

- toString()

  ```
  var num = 5;
  console.log(num.toString());
  ```

- String()

  ```
  String()函数存在的意义：有些值没有toString()，这个时候可以使用String()。比如：undefined和null
  ```

- 拼接字符串方式

  num  +  ""，当 + 两边一个操作符是字符串类型，一个操作符是其它类型的时候，会先把其它类型转换成字符串再进行字符串拼接，返回字符串（如果是减号，则会转换成数值类型）

  

#### 转换成数值类型

- Number(Obj)

  ```
  Number()可以把任意值转换成数值，如果要转换的字符串中有一个不是数值的字符，返回NaN
  ```

- parseInt(string,radix)

  ```javascript
  var num1 = parseInt("12.3abc");  // 返回12，如果第一个字符是数字会解析知道遇到非数字结束
  var num2 = parseInt("abc123");   // 返回NaN，如果第一个字符不是数字或者符号就返回NaN
  ```

- parseFloat(string)

  ```js
  parseFloat()把字符串转换成浮点数
  parseFloat()和parseInt非常相似，不同之处在与
  	parseFloat会解析第一个. 遇到第二个.或者非数字结束
  	如果解析的内容里只有整数，解析成整数
  ```

- +，-0等运算

  ```javascript
  var str = '500';
  console.log(+str);		// 取正
  console.log(-str);		// 取负
  console.log(str - 0);
  ```



#### 转换成布尔类型

- Boolean()

- !!  

  ``` ''(空字符串) null undefined NaN 会转换成false  其它都会转换成true```



#### 隐式转换

- 递增递减运算符(前置、后置)
  - 如果包含的是有效数字字符串或者是有效浮点数字符串，则会将字符串转换(Number())为数值，再进行加减操作，返回值的类型是：number类型。
  - 如果不包含有效数字字符串，则会将字符串的值转换为NaN,返回值的类型是：number类型。
  - 如果是boolean类型，则先会把true或者false转换为1或者0，再进行加减操作，返回值的类型是：number类型。
  - 如果是null类型，则先会把null转换为0，在进行加减操作，返回值的类型是：number类型。
  - **如果是undefined，则先会把undefined转换为NaN，再进行加减操作，返回值的类型是：number类型。**
  - 如果是对象，则先会通过对象的valueOf()方法，进行转换，如果返回的是NaN，调用toString()方法，在进行前面的操作，返回值的类型是：number类型。（注：空数组[]会返回0，在进行加减操作，空对象则会返回NaN）。
- 逻辑操作符中的隐式转换规律
  - **null undefined NaN 0 会转换成false  其它都会转换成true**
  - 如果左边为真 返回右边 如果左边为假 返回(左边本身)
- 关系操作符的隐式转换规律
  - 如果两个操作值都是数值，则直接比较大小。
  - 如果两个操作值都是字符串，则字符串进行其Unicode编码进行比较。
  - **如果一个操作值是数值，则另一个值转换为数值进行比较。(优先)**
  - 如果一个操作值是对象，则调用对象的valueOf()和toString()方法，然后再进行上述比较。
  - 如果一个操作值是布尔值，则将布尔值转换为数值再进行比较。
    **(注：NaN和任何值都不相等，包括自己，同时它与任何类型比较都会返回false。)**
- 相等操作符==和===的隐式转换规律
  - 布尔值、字符串和数值进行比较，会先将其转换为数值再进行比较。
  - null和undefined比较是相等的，但不是全等的。
  - NaN与任何值都不相等，都会返回false。

~~~js
//注意undefined可以隐式转换成为false，但是与false比较是不等的
console.log(!!undefined); //false
console.log(undefined == false); //false

//特殊（思维陷阱）
console.log(undefined == null) //true
console.log(undefined <= null) //false
comsole.log(null>=NaN) //false

//undefined NaN在数值运算中是不能转成0
console.log(undefined < 1) //false
console.log(NaN < 1) //false
console.log(null < 1) //true
~~~

