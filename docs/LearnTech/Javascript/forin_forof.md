---
title: JS | for in 和 for of的异同
---
写下这篇主要是在当时需要遍历一个对象，竟然想了一秒该用什么来遍历。当时用的是`Object.keys()`中转了以下拿到对象所有的key再遍历。虽然也想到了`for in`和`for of`，但是对于他们具体的用法和区别不是很了解。因此翻看文档结合自己在使用中的体会写下这篇。

### for in 
for in 循环只遍历可枚举属性（包括其原型链上可枚举的属性）。
for...in语句以任意顺序遍历一个对象的除Symbol以外的可枚举属性。
for ... in是为遍历对象属性而构建的
for...in会迭代其原型链上的属性。
```
let arr = ['刘', '一', '笔']
arr.__proto__ = {name: 'sam'}
for (let item in arr){
    console.log(arr[item])
    // 刘 一 笔 name
}
```
ES1的时代就有了。

想要了解关于for in 的更多，可以点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)。

---

### for of 
for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。

对于这些可迭代对象，超出我已有知识以外的是Map跟String，刚开始看的好几遍我都把Map误以为是Object了，但到控制台里实验又不行。后面才发现， Map也是JavaScript的一个内置对象，就像Date一样，只不过我们用得很少。

对于for...of的循环，可以由break, throw  continue    或return终止。在这些情况下，迭代器关闭。

在ES6中成为规范。

想要了解关于for in 的更多，可以点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)。

---

### 两者的区别
先看一个实例。
```
let arr = ['刘', '一', '笔']

for(item in arr) {
    console.log(item)
}
// 0 1 2

for(item of arr) {
    console.log(item)
}
// 刘 一 笔
```
由此我们可以看出：
for in 遍历的是每一个迭代对象的属性；
for of 遍历的是每一个迭代对象的属性值。


---

如果你只要获取到可枚举属性，查看Object.keys或用for...in循环（还会获取到原型链上的可枚举属性，不过可以使用hasOwnProperty()方法过滤掉）。

Object.getOwnPropertyNames()不会获取到原型链上的属性

https://segmentfault.com/a/1190000007908692

遍历对象的属性时，自带的属性不会被遍历。为什么呢
手动添加的会被遍历。
hasOwnProperty： 是用来判断一个对象是否有你给出名称的属性或对象。不过需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。
isPrototypeOf : 是用来判断要检查其原型链的对象是否存在于指定对象实例中，是则返回true，否则返回false。