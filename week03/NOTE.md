## week 03
### StringToNumber
```javascript
function converStringToNumber(string, scale = 10) {
  var chars = string.split('');
  var number = 0;
  var i = 0;
  while(i < chars.length && chars[i] !== '.') {
    number *= scale;
    number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }
  if(chars[i] === '.')
    i++;
  var fraction = 1;
  while(i < chars.length && chars[i] !== 'e' && chars[i] !== 'E') {
    fraction /= scale;
    number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
    i++;
  }
  if(chars[i] === 'e' || chars[i] === 'E')
    i++;
  var exponent = 0;
  while(i < chars.length) {
    exponent *= 10;
    exponent += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }
  number = number * Math.pow(10, exponent);

  return number;
}
converStringToNumber('22.345e2') // 2234.5
```

### NumberToString
```javascript
function converStringToNumber(number, scale) {
  var integer = Math.floor(number);
  // 精度问题
  var fraction = number - integer;
  var string = '';
  while(integer > 0) {
    string = String(integer % scale);
    integer = Math.floor( integer / scale);
  }
  return string;
}
```

### 总结

#### 表达式
Member
- a.b
- a[b]
- foo`string`
- super['b']
- new.target
- new Foo()


```javascript
function foo {
  console.log(new.target)
}
foo() // undefined
new foo() // foo {}

function foo() {
  console.log(this);
}

var fakeObject = {};
Object.setPrototypeOf(fakeObject, foo.prototype);
fakeObject.constructor = foo;
foo.apply(fakeObject);

class Parent {
  constructor() {
    this.a = 1;
  }
}
class Child extends Parent {
  constructor() {
    super();
    console.log(super.a)
  }
}

var name = 'Winter';
function foo() {
  console.log(arguments);
}
foo`Hello ${name}!`;


function cls1(s) {
  console.log(s);
}
function cls2(s) {
  console.log("2", 2);
  return cls1;
}
cls2() //f cls1() {}
new cls2 // 是cls2的实例 返回函数function cls1() {}
new (cls2()) // 返回cls1 {} 对象
new (new cls2) // 返回cls1 {} 对象

new new cls2("good") // 2 good

// Member expression 返回的是Reference类型

class foo {
  constructor() {
    this.b = 1;
  }
}

new foo()['b'] // 1

foo['b'] = function() {}
// 以下等价
new foo['b'] 
new (foo['b'])
```
#### Right hand expression
- a++
- a --
- ++a
- --a
``` javascript
// no Linetermiator here
var a = 1; b = 1; c = 1;
a
++
b
++
c

console.log([a, b, c]) // [1, 2, 2]
```
#### 单目运算符
- delete a.b
- void foo()
- typeof a
- +a
- -a
- ~a
- !a
- await a

``` javascript
// IIFE Immediately Invoke Function Expression
for(var i = 0; i < 10; i++) {
  var button = document.createElement("button");
  docuemnt.body.appenChild(button);
  /*
  (function(i) {
    button.onclick = function() {
      console.log(i);
    }
  })(i);
  */
  void function(i) {
    button.onclick = function() {
      console.log(i);
    }
  }(i);
}

```

#### 类型转换 Type Convertion

#### Boxing & Unboxing
- Number
- String
- Boolean
- Symbol

可以通过装箱转换为Object
Boxing
```javascript
new Number(1) // Number {1}
new String("hello").length // 5
"hello".length // 5
typeof "hello" // "string"
typeof new String("hello") // "object"

// Number String Boolean 三个对象不作为new调用的时候转换为基本类型
// 起到类型转换的作用 强制类型转换
Number(1) // 1
String(1) // "1"
Boolean(1) // true

// 使用Object强制装箱
Object(1) // Number {1}
Object("2") // String {1}
Object(true) // Boolean {true}

```
UnBoxing
```javascript
1 + {valueOf(){return 2}} // 3
1 + {toString(){return 2}} // 3
1 + {toString(){return "2"}} // "12"
1 + {valueOf(){return 2}, toString(){return "2"} // 3 valueOf()优先

// toPrimitive优先级最高
// 4
1 + {[Symbol.toPrimitive](){return 3}, valueOf(){return 2}, toString(){return "2"}} 

// toPrimitive返回一个对象
// Uncaught TypeError: Cannot convert object to primitive value
// "1undefined"
1 + {[Symbol.toPrimitive](){return {}}, valueOf(){return 2}, toString(){return "2"}} 

// valueOf()返回一个对象
1 + {valueOf(){return {}}, toString(){return "2"}} // "12"
```
