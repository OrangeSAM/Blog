---
title: JS | 各种手写
---
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
  let contexts; 
  contexts=context || window;
  contexts.fn = this;
  let result = eval('contexts.fn(...args)');
  delete contexts.fn
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

7. 深拷贝的实现
```javascript
// 判断是不是复杂类型，其实就是判断数据类型是不是object，但有两个例外要考虑，一个例外是null要排除，一个例外是function要包含。
const isComplexDataType = (obj) => (typeof obj === "object" || typeof obj === "function") && obj !== null;

// 深拷贝的核心方法
const deepClone = function (obj, hash = new WeakMap()) {
  // 日期对象直接返回一个新的日期对象
  if (obj.constructor === Date) return new Date(obj);
  // 正则对象直接返回一个新的正则对象
  if (obj.constructor === RegExp) return new RegExp(obj); 

  // 如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) return hash.get(obj);

  // getOwnPropertyDescriptors方法返回指定对象上一个自有属性对应的属性描述符
  let allDesc = Object.getOwnPropertyDescriptors(obj);

  //遍历传入参数所有键的特性，Object.create方法创建一个新对象，使用现有的对象来提供新创建对的__proto__
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

  //继承原型链
  hash.set(obj, cloneObj);

  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== "function"
        ? deepClone(obj[key], hash)
        : obj[key];
  }

  return cloneObj;
};

// 下面是验证代码

let obj = {
  num: 0,

  str: "",

  boolean: true,

  unf: undefined,

  nul: null,

  obj: { name: "我是一个对象", id: 1 },

  arr: [0, 1, 2],

  func: function () {
    console.log("我是一个函数");
  },

  date: new Date(0),

  reg: new RegExp("/我是一个正则/ig"),

  [Symbol("1")]: 1,
};

Object.defineProperty(obj, "innumerable", {
  enumerable: false,
  value: "不可枚举属性",
});

obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj));

obj.loop = obj; // 设置loop成循环引用的属性

let cloneObj = deepClone(obj);

cloneObj.arr.push(4);

console.log("obj", obj);

console.log("cloneObj", cloneObj);

```