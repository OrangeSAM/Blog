---
title: JS | call apply bind
---

## call

apply方法调用一个函数，其具有一个指定的this值，以及作为一个数组提供参数。

和apply的区别： Call()方法接受的是若干个参数的列表 apply方法接受的是一个包含多个参数的数组

Func.apply(thisArg, [argsArray])

thisArg是可选的，在func函数运行时使用的this值。使用的this值并不一定是该函数执行时真正的this值。

如果这个函数处于非严格模式下，则指定为null或undefined时会自动替换为指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的包装对象。

argsArray是可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给func函数。如果该参数的值为null或undefined，则表示不需要传入任何参数。从ES5开始可以使用类数组对象。

返回值：调用有指定this值和参数的函数的结果。

每个函数都包含两个非继承而来的方法:call方法和apply方法。 这两个方法的作用是一样的：都是在特定的作用域中 调用函数，等于设置函数体内this对象的值，以扩充函数赖以运行的作用域。

## apply

## bind
222

## call的实现

call函数的特点：

1. 绑定传入的this
2. 没传this，默认绑定window
3. 参数逐个传入

```javascript
// 测试函数
function logName (name) {
  console.log(name)
}
```

```javascript
// 能够很自然地想到的实现 v0.0.1
Function.prototype.myCall = function (arg) {
  let fn = this // 隐式绑定了this，也就是前面调用的函数
  fn(arg)
}
logName.myCall(123, 'sam')

// 问题在于，没能区分this和后续参数，
```

```javascript
//传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
Function.prototype.myCall = function (cxt, ...args) {
  //这里默认不传就是给window,也可以用es6给参数设置默认参数
  //考虑到第一个参数仍然可以传基本类型，所以用Object包装下
  //但是在处理''这样的边界值时会有问题，理应为包装对象，但如下代码会为window
  cxt = cxt ? Object(cxt) : window

  // 这里解决第二个参数没传的情况，使用...args仍然传入空数组的问题
  // 但是这会导致第二个参数为空的情况下，过不了没传第二个参数的测试用例
  args = args.length > 0 ? args : undefined
  
  //给cxt新增一个唯一的属性以免覆盖原有属性
  const key = Symbol()
  cxt[key] = this

  //通过隐式绑定的方式调用函数
  const result = cxt[key](...args)

  //删除添加的属性
  delete cxt[key]

  //返回函数调用的返回值
  return result
}
```

测试用例
```javascript
logName.myCall(1, 22, 39)
logName.call(1, 22, 39)

logName.myCall('string', 22, 39)
logName.call('string', 22, 39)

logName.myCall({name: 'sam'}, 22, 39)
logName.call({name: 'sam'}, 22, 39)

logName.myCall(['22'], 22,30)
logName.call(['22'], 22, 30)

logName.myCall('', 22)
logName.call('', 22)

logName.myCall({})
logName.call({})

logName.myCall()
logName.call()
```

## apply的实现

```javascript
Function.prototype.myApply = function (cxt, args) {
  //这里默认不传就是给window,也可以用es6给参数设置默认参数
  //考虑到第一个参数仍然可以传基本类型，所以用Object包装下
  //但是在处理''这样的边界值时会有问题，理应为包装对象，但如下代码会为window
  cxt = cxt ? Object(cxt) : window

  // 这里解决第二个参数没传的情况，使用...args仍然传入空数组的问题
  // 但是这会导致第二个参数为空的情况下，过不了没传第二个参数的测试用例
  args = args.length > 0 ? args : undefined

  //给cxt新增一个唯一的属性以免覆盖原有属性
  const key = Symbol()
  cxt[key] = this

  //通过隐式绑定的方式调用函数
  const result = cxt[key](...args)

  //删除添加的属性
  delete cxt[key]

  //返回函数调用的返回值
  return result
}
```

```javascript
Function.prototype.hyCall = function (thisBinds, ...args) {
  thisBinds = thisBinds ? Object(thisBinds) : window
  thisBinds.fn = this

  let result = thisBinds.fn(...args)
  delete thisBinds.fn
  return result
}

```

```javascript
logName.myApply(1, [22, 39])
logName.apply(1, [22, 39])

logName.myApply('string', [22, 39])
logName.apply('string', [22, 39])

logName.myApply({name: 'sam'}, [22, 39])
logName.apply({name: 'sam'}, [22, 39])

logName.myApply(['22'], [22,30])
logName.apply(['22'], [22, 30])

logName.myApply('', [22])
logName.apply('', [22])

logName.myApply({})
logName.apply({})

logName.myApply()
logName.apply()
```

## bind的实现

```javascript
Function.prototype.myBind = function (cxt, ...bindArgs) {
  cxt = cxt ? Object(cxt) : window

  const key = Symbol()
  cxt[key] = this

  return function (...newArgs) {
    const args = [...bindArgs, ...newArgs]
    return cxt[key](...args)
  }
}
```

```javascript
// 偏函数case
function sam(v1, v2) {
  console.log('函数打印', v1, v2)
  return v1 + v2
}
let a = sam.bind({name: 'sam'}, 11)
let b = sam.myBind({name: 'sam'}, 11)

console.log('标准的', a(2))
console.log('-----------')
console.log('手写的', b(2))

// this绑定case
function logNameAndElse(val) {
  console.log(this.name + val)
}

let aa = logNameAndElse.bind({name: 'sam'}, 'heihei')

let bb = logNameAndElse.myBind({name: 'sam'}, 'hehe')

console.log('***************')
console.log(aa())
console.log(bb())
```
