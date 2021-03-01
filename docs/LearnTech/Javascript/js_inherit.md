---
title: 继承
---
## 什么是继承
继承是什么，我的一点粗浅的理解就是汉语中的“同上”。目的在于代码的复用。继承这个概念，按照其字面意思直接理解即接收前人的东西。在计算机科学中，则是指支持面向对象编程语言中的专用术语。
                                    
> 如果一个类别B“继承自”另一个类别A，就把这个B称为“A的子类”，而把A称为“B的父类别”也可以称“A是B的超类”。继承可以使得子类具有父类别的各种属性和方法，而不需要再次编写相同的代码。在令子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能。另外，为子类追加新的属性和方法也是常见的做法。 ---维基百科

但并不是所有的编程语言都有继承机制，前面有说到，继承是面向对象中的术语，C语言就没有。为什么JavaScript需要继承机制的存在，这里贴一小段阮一峰老师对历史的探究。原文点击[这里](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)。
> 如果真的是一种简易的脚本语言，其实不需要有"继承"机制。但是，Javascript里面都是对象，必须有一种机制，将所有对象联系起来。所以，Brendan Eich最后还是设计了"继承"。
>
> 但是，他不打算引入"类"（class）的概念，因为一旦有了"类"，Javascript就是一种完整的面向对象编程语言了，这好像有点太正式了，而且增加了初学者的入门难度。

俗话说就是，继承机制的存在使得代码中各个对象能够产生联系，而不是独立的，产生的联系的意义在于可以少写代码。说到底，还是为了“偷点懒”(提高效率)。

如何实现继承，**其实，当一个对象的`__proto__`属性指向一个有效的对象时，继承就发生了，但实现继承的方式远不止这一种。**

在 JavaScript 中，构造函数其实就是一个普通的函数。当使用 new 操作符来作用这个函数时，它就可以被称为构造方法（构造函数）。

如果用Object.create创建对象，就可以使用现有的对象来提供新创建的对象的__proto__。之前有个方法是`Object.setPrototypeOf()`，手动设置某个对象的原型。
而现在的`create`是直接将新创建对象的原型指向create方法的参数。
```javascript
let a = {a: 1}; 

let b = Object.create(a);

console.log(b.a); 
// 1 (继承而来)
```

其实就相当于如下代码，只不过使用create会让整个逻辑连贯一些。
```javascript
let b = {}
Object.setPrototypeOf(b, a)
```

## 做个题
> 有如下题目
1. 写出一个构造函数 Animal
    - 输入为空
    - 输出为一个新对象，该对象的共有属性为 {行动: function(){}}，没有自有属性
2. 再写出一个构造函数 Human
    - Human 继承 Animal
    - 输入为一个对象，如 {name: 'Frank', birthday: '2000-10-10'}
    - 输出为一个新对象，该对象自有的属性有 name 和 birthday，共有的属性有物种(人类)、行动和使用工具
3. 再写出一个构造函数 Asian
    - Asian 继承 Human
    - 输入为一个对象，如 {city: '北京', name: 'Frank', birthday: '2000-10-10' }
    - 输出为一个新对象，该对象自有的属性有 name city 和 birthday，共有的属性有物种(人类)、行动和使用工具和肤色
   
## ES5里的继承
原型链实现
```javascript
function Animal () {	
}

Animal.prototype.action = function () {
  console.log('行动的共有属性')
};

function Human (obj = {}) {
	this.name = obj.name;
	this.birthday = obj.birthday
}

Human.prototype = Object.create(Animal.prototype) // 这个写法只会拿到其原型上的属性
// Human.prototype = new Animal() // 这个写法会导致私有属性重复
// 2021.1.26 但是发现使用create会导致constructor属性的丢失

Human.prototype.species = '人类';
Human.prototype.toolUse = function() {
  console.log('使用工具的共有属性')
};

function Asian (obj = {}) {
	this.city = obj.city;
	this.name = obj.name;
	this.birthday = obj.birthday
}

Asian.prototype = Object.create(Human.prototype);
Asian.prototype.color = 'yellow';

let sam = new Asian({city: 'shenzhen', name: 'sam', birthday: '828'})
```
结果如下，如果使用上面注释一行的代码实现继承，就会导致name和birthday重复
```Javascript
  sam = {
      birthday: "828",
      city: "shenzhen",
      name: "sam",
      __proto__: Asian,
        color: "yellow",
        __proto__: Human,
          species: "人类",
          toolUse: f(),
          __proto__: Animal,
            action: f()
  }
```

## ES6里的继承
extends实现

类可以通过extends关键字实现继承。类是面向对象里面的一个概念，虽然JS也是面向对象，但在ES6之前并没有类这个概念，在这之前JavaScript的面向对象都是不完备的面向对象。

类的返回值是对象，构造函数的返回值也是对象，所以在ES6之前，类这个概念是通过构造函数来实现。

ECMAScript2015中引入的JavaScript类实质上是JavaScript现有的基于原型的继承的语法糖。类语法并没有为JavaScript引入新的面向对象的继承模型。

定义一个类的方法是使用一个类声明。要声明一个类，需要使用带有class关键字的类名。
```javascript
// 类声明
class rectangle{
	constructor(height,width){
		this.width = width
		this.height = height
	}
}
// 类表达式，类名非必须
let rectangle = class (className) {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
```
函数声明和类的声明之间的一个重要区别是函数声明会提升，类声明不会，所以需要先声明再访问。

构造函数、静态方法、原型方法、getter、setter、父类、子类，这些名词是类这一概念中术语。

据此来实现前面提到的继承题目如下：

```javascript
class Animal {
	action () {console.log('行动的共有属性')}
}

class Human extends Animal {
	constructor (params) {
        super()
		this.name = params.name
		this.birth = params.birth
	}
	species () {return '人类'}
	toolUse () {return '使用工具的共有属性'}
}

class Asian extends Human {
	constructor (params) {
		super(params)
		this.city = params.city
	}
	color () {return '肤色'}
}
```

## 构造函数

constructor 方法是一个特殊的方法，其用于创建和初始化使用class创建的一个对象。一个类只能拥有一个名为“constructor”的特殊方法。
如果多个，则报语法错误。一个构造函数可以使用super关键字来调用一个父类的构造函数。


1. 每一个函数数据类型（普通函数，类）都有一个天生自带的属性 :prototype (原型)，并且这个属性是一个对象数据类型的值。
2. 并且在prototype上浏览器天生给他加了一个属性constructor(构造函数)，属性值是当前函数(类)本身。
3. 每一个对象数据类型(普通的对象、实例、prototype等)也天生自带一个属性：__proto__，属性值是当前实例所属类的原型。

---

四种用于拓展原型链的方法
- new 和 构造函数的配合
- Object.create
- Object.setPrototypeOf
- __proto__


实例化和继承是两个不同的概念
其中的称呼是  类和实例 & 父类和子类

```javascript
function dialog(target) {
    this.dialog = target
    // 默认return this
    // 如果手动return 值类型，会被忽略
    // 如果手动return 引用类型，会覆盖默认的
}
``` 

什么是原型对象，和对象区别在于？


在JavaScript中，每个函数都是一个Function对象。




相关文章：
> 
https://juejin.im/post/5d615b7f6fb9a06b0202ccb5

https://zhuanlan.zhihu.com/p/57336944

https://www.zcfy.cc/article/master-the-javascript-interview-what-s-the-difference-between-class-amp-prototypal-inheritance-2185.html

https://2ality.com/2015/09/proto-es6.html