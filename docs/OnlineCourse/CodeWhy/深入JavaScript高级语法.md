---
title: 深入JavaScript高级语法
---

https://ke.qq.com/course/3619571

## 1. 浏览器工作原理和V8引擎

1. 事实上，常说的浏览器内核就是浏览器的排版引擎
   1. 有很多叫法
   2. gecko
   3. trident
   4. webkit
   5. blink
   6. 排版引擎、浏览器引擎、页面渲染引擎、样板引擎
2. JavaScript引擎
   1. 将JavaScript代码转成CPU指令
   2. spidermonkey 第一款JavaScript引擎，brenden eich写的
   3. chakra 微软开发，用于IE浏览器
   4. JavaScriptCore webkit中的JavaScript引擎，apple开发
   5. V8
3. 浏览器内核和JavaScript引擎的关系
   1. webkit
      1. WebCore
      2. JavaScriptCore
4. 有关V8
   1. parse模块将JavaScript代码转换ast
   2. ignition是一个解释器，会将ast转换成byteCode
   3. turbofan是一个编译器，可以将字节码编译成cpu可以直接执行的机器码

## 2. 内存管理和内存泄露

1. 为什么函数可以放在声明之前使用，而其他变量不行
   1. 函数会单独生成一个go
   2. 编译的时候就已经放到存储空间里面了
   3. js-ast的阶段就确定了
2. 函数的作用域在声明时就确认了，而不是调用时？
3. 
```javascript
var n =100
function foo() {
   n =200
}
foo() 
console.log(n)
```

```javascript
function foo() {
  console.log(n)
   var n = 200
   console.log(n)
}
var n = 100
foo()
```
```javascript
var n = 100
function foo1() {
  console.log(n)
}
function foo2() {
  var n =200
   console.log(n)
   foo1()
}
foo2()
console.log(n)
```
```javascript
var a = 100
function foo() {
  console.log(a)
   return
   var a =100
}
foo()
```
```javascript
function foo() {
  var a =b =100
}
foo()
console.log(a)
console.log(b)
```

## 3. 作用域、作用域提升、执行上下文内存管理和内存泄露

1. 函数是一等公民就意味着
   1. 函数的使用是非常灵活的
   2. 函数可以作为另外一个函数的参数，也可以作为另外一个函数的返回值来试用

## 4. 函数执行作用链和深入闭包

1. 函数在调用时，JavaScript会默认给this绑定一个值
2. this的绑定和定义的位置（编写的位置）没有关系
3. this的绑定和调用方式以及调用的位置有关系
4. this是在运行时绑定的

## 5. this的绑定规则、优先级和面试

绑定规则
1. 默认绑定
```javascript
 function foo() {
  console.log(this)
}
foo()
```
```javascript
function foo1() {
  console.log(this)
}
function foo2() {
  console.log(this)
   foo1()
}
function foo3() {
  console.log(this)
   foo2()
}
foo3()
```
```javascript
var obj = {
  name: 'why',
   foo(){
    console.log(this)
   }
}
var bar = obj.foo
var() 
```
```javascript
function foo() {
  console.log(this)
}
var obj = {
  name: 'why',
  foo:foo
}
var bar = obj.foo
var() 
```
```javascript
function foo() {
  function bar() {
    console.log(this)
  }
  return bar()
}
var fn=foo()
fn()//

var obj = {
  name: 'sam',
   eating: fn
}
obj.eating()//
```

2. 隐式绑定 
通过某个对象进行调用的。也就是他的调用位置中，是通过某个对象发起的函数调用。
```javascript
function foo() {
  console.log(this)
}
var obj = {
  name:'why',
   foo: foo
}
obj.foo()
```
```javascript
function foo() {
  console.log(this)
}
var obj1 = {
  name: 'obj1',
   foo: foo
}
var obj2 = {
  name: 'obj2',
   obj1: obj1
}
obj2.obj1.foo()
```
```javascript
function foo() {
  console.log(this)
}
var obj1= {
  name: 'obj1',
   foo: foo
}
var bar = obj1.foo
bar()
```
```javascript
var obj1 = {
  name: 'obj1',
   foo: function () {
    console.log(this)
   }
}
var obj2 = {
  name: 'obj2',
   bar: obj1.foo
}
obj2.bar()
```

4. 显式绑定
   1. call、apply、bind
   2. 隐式绑定有一个前提条件
      1. 必须在调用的对象内部有一个对函数的应用，比如一个属性
      2. 如果没有这样的引用，在进行调用是，会报找不到该函数的错误
      3. 正是通过这个应用，间接的将this绑定到了这个对象上
   3. 如果我们不希望对象内部包含这个函数的应用，同时又希望在这个对象上进行强制调用，该怎么做呢
      1. JavaScript的所有函数都可以使用call 和apply方法
      2. call 传单个值（就像打电话一样，一段一段的）
      3. apply 传数组（一次性涂抹）

5. new绑定
   1. 会发生什么
      1. 创建一个全新的对象
      2. 这个新对象会被执行prototype链接
      3. 这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成
      4. 如果函数没有返回其他对象，表达式会返回这个新对象

new绑定 > 显示绑定（call/apply/bind）> 隐式绑定（obj.foo()） > 默认绑定（独立函数调用）

## 6. 函数的柯里化

整理一篇apply call bind的原生实现

## 7. 对象字面量和对象的封装

2'07


这集的柯里化没理解

---
function sam() {}
console.dir(sam)
VM382:1
ƒ sam()
arguments: null
caller: null
length: 0
name: "sam"
prototype: {constructor: ƒ} 
[[FunctionLocation]]: VM286:1
[[Prototype]]: ƒ ()
[[Scopes]]: Scopes[2]

2451行和249行？ 迷惑

---
```javascript
```
let a = []
a.__proto__ === Array.prototype //能理解
a.__proto__.__proto__ === Object.prototype // 能理解

```

## 8. 基于对象的封装、原型链
1.42

## 9. 继承的实现方案、ES6面向对象

