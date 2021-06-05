---
title: JS中的模块化
---

这几天在研究webpack打包机制的时候，发现其中出现了关于模块化的知识，有感模块化作为打包前置知识的重要性，特写一篇梳理。

什么资料都不看的前提下，脑里大概仅存一下几点
1. 模块化有很多种：AMD、UMD、ES modules
2. 在还没有 ES6 的模块化机制前，Web 端前端模块化实现应该是 AMD
3. Node 端的模块化和Web端的又不一样

## 模块化要解决的问题
1. 全局变量污染
2. 依赖管理混乱

## 模块化的历史
1. 早起模块化产生的原因
    a. 那个时候没有let，声明的变量很容易变为全局变量，
    即便有语言的闭包特性可以减少全局变量。但项目一大，也不可避免的容易造成全局变量污染。
    b. 此外，还得通过人来维护script 脚本的引入顺序

2. 历史以来的解决方案
    a. 闭包模块化
        i. 一定程度上减少了全局变量
        ii. 跨文件使用，依然得挂载变量到全局变量上
        iii. 当需要在模块内部使用全局变量时，必须显式注入全局变量，比如jQuery
        iv. 截止到目前，都还只是语言层面的实现



## jQuery
利用JavaScript的IIFE（立即执行函数）和闭包的特性，将所依赖的外部变量传给一个包装了自身代码的匿名函数，在函数内部就可以使用这些依赖，最后在函数结尾把自身暴露给window。

```javascript
(function(root) {
  root.jQuery = root.$ = jQuery
})(window)
```
但这种方法没有从根本解决问题：其所需依赖还是得从外部提前提供，还是会增加全局变量

## CommonJS

Node.JS体系下的模块化方案。

Modules/1.0，即CommonJS的标准规范
1. 模块的标识应遵循一定的书写原则
2. 定义全局函数 require(dependency)，通过传入模块标识来引入其他依赖模块，执行的结果即为别的模块暴露出来的API
3. 

CommonJS是一系列标准规范的通常，ServerJS(Modules/0.1) => CommonJS(Modules/1.0) => Modules/1.1

CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

在common.js中，module代表整个模块，exports代表对外暴露的属性。通过打印可以发现，module是一个对象，而exports是其中的一个属性。

对于导出，有两种写法
```javascript

module.exports = {

}

exports.name = 'sam'
exports.age = 29
```

对于引入，反正导出的是对象，想怎么引就怎么引
```javascript

const {add} = require('./math')
const add = require('./math').add
const math = require('./math')
math.add(1, 1)
```
    
3. Common.js的原理是什么 ES Modules的原理是什么

4. 他们的demo分别写个

5. ES Modules 在Node.js的问题


