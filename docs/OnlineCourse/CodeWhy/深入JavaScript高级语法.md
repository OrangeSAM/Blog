---
title: 1. 浏览器工作原理和V8引擎
---

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
      1. webcore
      2. JavaScriptCore
4. 有关V8
   1. parse模块将JavaScript代码转换ast
   2. ignition是一个解释器，会将ast转换成byteCode
   3. turbofan是一个编译器，可以将字节码编译成cpu可以直接执行的机器码
   
## 内存管理和内存泄露
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

2.11 时间

## 4. 函数执行作用链和深入闭包
1.39.44
