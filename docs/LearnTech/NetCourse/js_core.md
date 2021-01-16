---
title: JavaScript核心原理精讲
---
## 开篇词

## 基本功测试之数据类型

```javascript
[] == ![] // true, 史诗级迷惑
// 解析
// 首先可以推断出右边一定是false，
// 对于左边，我的看法是直接Boolean([])等于true，但true == false 肯定为false，
// 坤哥前端群张哥的解释是，左边得这样算，Boolean([].valueOf().toString())，这样算下来确实左边就是false，满足最终答案true，
// 但不解的点在于为什么要这样算
// 深圳前端群发胖的菜鸡给的官方链接(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)里
// 写到，如果一边是Boolean，另一边是对象，就得ToPrimitive(A) == ToNumber(B)，这就和张哥说的对上了。
// 因为ToPrimitive通过尝试调用A.toString()和A.valueOf()方法，将A转换为原始值。
// 即，a = []，a.valueOf().toString() => "", "" == false => true


null == undefined // true
// 解析
// 对于'=='，如果其中一个操作值是null或者undefined，那么另一个操作符必须为null或者undefined，才会返回true，否则都返回false

Number(null) // 0
// 规定，记着就好了

parseInt('') // NaN
// 解析
// 如果第一个字符不能转换为数字，parseInt会返回NaN，但Number('')是0，所以这里计算为NaN是因为没有字符？

{} + 10 // 10
// 解析： 对象在作为操作数时，解释器总是优先调用valueOf()， 而其他情况，解释器总是认为我们想要的是字符串，所以会优先调用toString() 因此对象在前面返回结果就是Number;其他情况对象默认用toString
10 + {} // 10[object Object]
```

*强制类型转换的方法*

`Number(), String(), Boolean, ParseInt, ParseFloat, toString()`

## 基本功测试之深浅拷贝

### 浅拷贝的方法
- Object.assign()
- ...
- Array.concat()
- Array.slice()


### 浅拷贝实现的逻辑
- 对基础类型做一个最基本的拷贝
- 对引用类型开辟一个新的存储，并且拷贝一层对象属性

### 手写浅拷贝
```javascript
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? []: {};
    for (let prop in target) {
      // 这一步是为了排除target原型链上其他属性
      if (target.hasOwnProperty(prop)) {
          cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

### 深拷贝
深拷贝实现了内存上的分离

各种版本的深拷贝

- 乞丐版
    JSON.parse(JSON.stringfy())
    缺陷: 
    1. 拷贝的对象的值中如果有函数、undefined、symbol 这几种类型，经过 JSON.stringify 序列化之后的字符串中这个键值对会消失；
    
    2. 拷贝 Date 引用类型会变成字符串；
    
    3. 无法拷贝不可枚举的属性；
    
    4. 无法拷贝对象的原型链；
    
    5. 拷贝 RegExp 引用类型会变成空对象；
    
    6. 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
    
    7. 无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)。
    
- 基础版，手写递归实现
只能处理对象形式的，跟乞丐版没差。
```javascript
function deepClone(obj) { 
  let cloneObj = {}
  for(let key in obj) {                 //遍历
    if(typeof obj[key] ==='object') { 
      cloneObj[key] = deepClone(obj[key])  //是对象就再次调用该函数递归
    } else {
      cloneObj[key] = obj[key]  //基本类型的话直接复制值
    }
  }
  return cloneObj
}
```
