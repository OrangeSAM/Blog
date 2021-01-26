---
title: 各种手写
---

<!--
 * @Author: Sam Liu
 * @LastEditors: Sam Liu
 * @Description: 各种手写
 * @Date: 2021-01-14 20:01:17
 * @LastEditTime: 2021-01-14 20:25:08
-->

1. 手写`instanceof`

```javascript
function myInstanceof(left, right) {

  // 这里先用typeof来判断基础数据类型，如果是，直接返回false

  if(typeof left !== 'object' || left === null) return false;

  // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象

  let proto = Object.getPrototypeOf(left);

  while(true) {                  //循环往下寻找，直到找到相同的原型对象

    if(proto === null) return false;

    if(proto === right.prototype) return true;//找到相同原型对象，返回true

    proto = Object.getPrototypeof(proto);

    }

}

// 验证一下自己实现的myInstanceof是否OK

console.log(myInstanceof(new Number(123), Number));    // true

console.log(myInstanceof(123, Number));                // false

```

2. 通用的数据类型判断方法
```javascript
function getType(obj){
  let type  = typeof obj;
  if (type !== "object") {    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');  // 注意正则中间有个空格
}
```

3. new的实现
```javascript
function _new(func, ...args) {
    if(typeof func !== 'function') {
      throw 'func must be a function';
    }

    let obj = new Object();

    obj.__proto__ = Object.create(func.prototype);

    let res = func.apply(obj,  [...args]);

    let isObject = typeof res === 'object' && typeof res !== null;

    let isFunction = typeof res === 'function';

    return isObject || isFunction ? res : obj;
};
```

4. call的实现
```javascript
Function.prototype.call = function (context, ...args) {
  var context = context || window;
  context.fn = this;
  var result = eval('context.fn(...args)');
  delete context.fn
  return result;
}
```

5. apply的实现
```javascript
Function.prototype.apply = function (context, args) {
  let context = context || window;
  context.fn = this;
  let result = eval('context.fn(...args)');
  delete context.fn
  return result;
}
```

6. bind的实现
```javascript
Function.prototype.bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("this must be a function");
  }

  var self = this;

  var fbound = function () {
    self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
  }

  if(this.prototype) {
    fbound.prototype = Object.create(this.prototype);
  }

  return fbound;
}

```