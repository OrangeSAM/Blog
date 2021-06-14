---
title: JavaScript 和 Node.js 中的模块化
---

这几天在研究webpack打包机制的时候，发现其中出现了不少关于模块化的知识，有感模块化作为打包前置知识的重要性，特写一篇以作梳理。

什么资料都不看的前提下，简单回想了一下，脑里大概仅存一下几点（要是面试必挂...
1. 模块化有很多种：AMD、UMD、ES modules
2. 在还没有 ES6 的模块化机制前，见得比较多的还是立即执行函数实现的模块化
3. Node 端的模块化和 Web 端的又不一样

## 模块化要解决的问题
1. 全局变量污染
2. 依赖管理混乱

## 模块化的历史
### 早起模块化产生的原因
 - 那个时候没有let，声明的变量很容易变为全局变量，即便有语言的闭包特性可以减少全局变量。但项目一大，也不可避免的容易造成全局变量污染。
 - 此外，还得通过人来维护script 脚本的引入顺序

### 历史以来的解决方案

#### 闭包模块化
利用JavaScript的IIFE（立即执行函数）和闭包的特性，将所依赖的外部变量传给一个包装了自身代码的匿名函数，在函数内部就可以使用这些依赖，最后在函数结尾把自身暴露给window。
```javascript
(function(root) {
  root.jQuery = root.$ = jQuery
})(window)
```
**优点**
- 一定程度上减少了全局变量

**缺点**
- 跨文件使用，依然得挂载变量到全局变量上
- 截止到目前，都还只是语言层面取巧的实现，没有一个规范
- 当需要在模块内部使用全局变量时，必须显式注入全局变量，比如jQuery

#### AMD、CMD、UMD等等
此处略去不做展开，大部分都已成为早期开发者的记忆。后文主要分享 CommonJs 和 ES Modules 。

## 正当时的模块化方案

### CommonJS

CommonJS是一系列标准规范的统称，ServerJS(Modules/0.1) => CommonJS(Modules/1.0) => Modules/1.1，Node.JS体系下的模块化即采用Modules/1.0方案实现。


在CommonJS中，模块的加载机制是，
输入的是被输出的值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

在CommonJS中，module代表整个模块，exports代表对外暴露的属性。

CommonJS中导出引入的基本语法：

对于导出，有两种写法
```javascript
// 一
module.exports = {
  name: 'sam',
  age: 29
}

// 二
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

Node.js实现模块化的关键在于，在一个模块的代码被执行之前，Node.js都会为其包裹上一层如下的函数
```javascript
(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
});
```
这样，能够将模块内的变量，无论let const，还是var 声明的，隔绝在模块内部而不是暴露全局作用域中。

此外，这样还为模块内部提供了类全局的变量，比如module、require以及exports，以便进行模块化相关的操作；

最后，还提供了两个常用的__filename和__dirname变量，这也是我们在Node.js中不用声明就可以使用它们的原因。

在Node.js中，模块系统为js文件默认添加了导出引入相关的代码
```javascript
let module = {
  exports: {
    // 导出的内容
  }
}

// 默认声明exports 并且赋值给module.exports
let exports = module.exports

// 最终导出的是module.exports
return module.exports
```
这一点可以通过在模块中打印module得到印证，如下图，在打印的module对象中，有一个key为exports值为空对象的字段。

![](https://i.loli.net/2021/06/06/XnmWPNqzRp9sgjQ.png)

common.js的特点是
- 所有代码都运行在模块作用域，不会污染全局作用域，模块可以多次加载，但只会在加载的时候运行一次，然后运行结果就被缓存了，以后再加载的，直接读取缓存结果
- 模块的加载顺序，是按照代码出现的顺序同步加载的
- 模块输入的值是复制（基础类型为复制，引用类型为值引用），也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。


**exports 与 module.exports 的关系**

在如下代码中，导入test.js 只会得到`getSome`函数，即便在test.js 内部的打印中可以看到`exports`属性的值是`getNum`函数

```javascript
// test.js
let a  = 123
const getSome = () => {
  console.log('this is get Some')
}
const getNum = () => {
  console.log(a)
}
exports.getNum = getNum
module.exports = getSome
console.log(55, 'module', module)
console.log(55, 'exports', exports)
console.log('-------------------------------')
```

其实也很好理解，在common.js中 exports 和 module.exports 是指向同一块内存的，即`exports => {} <=module.exports.`，exports 只是 module.exports 的快捷方式罢了。
module.exports直接等于一个函数的话，即主动将其与`exports`的关系解除绑定。

这一点，在早期的[官方文档](https://nodejs.org/docs/latest-v0.12.x/api/modules.html)中亦有过解释。如下图所示

![](https://i.loli.net/2021/06/06/Mhaf41dBODsQNKI.png)

简单翻译文档大意：
> 在模块中可用的`exports`变量是以作为`module.exports`的引用开始的，和其他任何变量一样，如果你为其赋值一个新值，那么该变量则不再绑定到之前的值。
> 作为指导，如果您仍然对`exports`与`module.exports`的关系感到迷惑，可以忽视`exports`而只使用`module.exports`。

不过要深究的话，其实也不难，即涉及到JavaScript中的基础：值的引用。

如下代码所示，在步骤一中，`a`与`b`指向同一个引用，所以都打印`sam`;

在步骤二中，在变量`b`中把同一引用中的`name`值修改为`pepper`，所以都打印`pepper`;

在步骤三中，为变量`b`赋值了一个新的对象，这样现在的`b`和之前的`b`所指向的引用就没有关系了，现在任何对b的改动都不会影响到之前的`a`。

`exports` 与 `module.exports` 亦是同理，模块中最终导出的东西都是module.exports里的，这也就解释了上面代码为什么只能拿到`getSome`的原因。

```javascript
// 步骤一
var a = {name: 'sam'};
var b = a;

console.log(a);
console.log(b);

// 步骤二
b.name = 'pepper';
console.log(a);
console.log(b);

// 步骤三
var b = {name: 'ee'};
console.log(a);
console.log(b);

// 运行 test.js 结果为：
{ name: 'sam' }
{ name: 'sam' }

{ name: 'perper' }
{ name: 'perper' }

{ name: 'pepper' }
{ name: 'ee' }
```

从我的demo实验中，还可以得出一个结论，用module.export导出的内容，无法通过在模块内打印exports获得；而用exports导出的内容，可以通过在模块内打印module.exports获得。

总结以上内容就是：
- **module.exports 初始值为一个空对象 {}**
- **exports 是指向的 module.exports 的引用**
- **require() 返回的是 module.exports 而不是 exports**


    
require node 和 es6 都支持的引入语法
export/import 只有es6支持的导出导入
module.exports/exports 只有node支持的导出 

3. Common.js的原理是什么 ES Modules的原理是什么

4. 他们的demo分别写个

5. ES Modules 在Node.js的问题

### ES Modules
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系（node.js有编译的过程吗），以及输入输出的变量。
commonJS和AMD模块都只能在运行时确定这些东西，比如，CommonJS 模块就是对象，输入时必须查找对象属性。
```javascript
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。
这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

而ES module的模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

// ES6模块
import { stat, exists, readFile } from 'fs';
上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。
当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

ES6的模块自动采用严格模式，那如何确定这就是一个ES6模块呢。
```javascript
foo();

import { foo } from 'my_module';
```

上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。

## 参考文章
https://huangxuan.me/2015/07/09/js-module-7day/
[module.exports和exports的区别](https://segmentfault.com/a/1190000021438613)
https://segmentfault.com/a/1190000010426778
https://juejin.cn/post/6844903744518389768#heading-8
https://juejin.cn/post/6844903744518389768#heading-8
