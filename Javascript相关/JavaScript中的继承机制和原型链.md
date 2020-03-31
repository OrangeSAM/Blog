### 原型
对于一个JavaScript对象来说，什么是原型。一个非常直接的理解，对象的`__proto__`属性所指向的即为该对象的原型。有如下代码，灰色框中的部分即为对象`person`的原型。

![对象的原型](https://i.loli.net/2020/03/29/YcJrDqMF9HQeuSd.png)

而除了通过`__proto__`获得对象的原型之外，在ES6之后，对象的原型还可以通过`Object.getPrototypeOf()`获得，该方法要传入的参数为要返回其原型的对象。
```
Object.getPrototypeOf(a)
```
![](https://i.loli.net/2020/03/24/9W5dC3fUN1sumSh.png)

由此，我们可以得出`a.__proto__ === Object.getPrototypeOf(a)`这一结论。

另外，相应地，设置某个对象的原型可以通过`Object.setPrototypeOf()`，该方法要传入的参数为要设置原型的对象，以及该对象的新原型。在这之前，如果我们需要设置对象的原型，需要`a.__proto__ = 某个对象`这样编写。

原型是JavaScript对象中被创建时就带有的一个对象，虽然如此，原型并不是一个固定的值，根据具体对象而动态变化。

需要说明的是，`__proto__`并不是EcmaScript标准中的一部分，只是浏览器中的实现。而刚刚说到的`get`和`set`是方法ES2015标准中的。

另外
> __proto__不应该与构造函数 func 的 prototype 属性相混淆。被构造函数创建的实例对象的 [[prototype]] 指向 func 的 prototype 属性。Object.prototype 属性表示 Object 的原型对象。

![](https://i.loli.net/2020/03/25/Ld6MeUJ4tDbG1uc.png)

这句话的意思就是说，被构造函数创建的实例对象的`__proto__`属性指向其构造函数的`prototype`属性，也因此，截图中的`a.__proto__ === func.protype`。

而对象的`__proto__`属性一般是直接指向Object的原型对象，即`a.__prototype === Object.prototype`。

原型存在的意义，需要结合下面原型链和继承一块来理解。这里暂不细述。

### 原型链

前面说到对象的原型即是`__proto__`属性所指向的地方。但对象的原型是否还有原型呢，在部分情况下是有的。如果说原型是本地的，那么原型链可以理解为云端的。

![](https://i.loli.net/2020/03/29/T27onmgsPkE6iMC.png)

和原型一部分的图片比较，可以发现`a`的`__proto__`属性中还有一个`__proto__`，而第二个`__proto__`属性和原型一部分中的是一样的。所以有这样的等式`person.__proto__ === a.__proto__.__proto__`。此外，二者也都还相等于`Object.prototype`。

这就是**原型链**，即一个对象的中所有`__proto__`属性串联的链。`Object.prototype.__proto__ === null`，这就是原型链的终点，为null。

Object.prototype又是什么，如下图，几乎所有的JavaScript对象都是Object的实例。
在上面的代码中，`a`是`func`的一个实例，`func`是`Object`的一个实例。



![](https://i.loli.net/2020/03/29/r6wxAuc4bhJd7oM.png)

### 继承
为什么JavaScript需要继承机制的存在，这里贴一小段阮一峰老师对历史的探究。原文点击[这里](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)。
> 如果真的是一种简易的脚本语言，其实不需要有"继承"机制。但是，Javascript里面都是对象，必须有一种机制，将所有对象联系起来。所以，Brendan Eich最后还是设计了"继承"。
>
> 但是，他不打算引入"类"（class）的概念，因为一旦有了"类"，Javascript就是一种完整的面向对象编程语言了，这好像有点太正式了，而且增加了初学者的入门难度。

如何实现原型链，由以上所说的原型和原型链可知，当对象的`__proto__`属性所指向的原型上仍然有`__proto__`属性时，原型链就产生了。

如何实现继承，其实，当一个对象的`__proto__`属性指向一个有效的对象时，继承就发生了，但实现继承的方式远不止这一种。

继承这个概念，按照其字面意思直接理解即接受前人留下来的东西。在计算机科学中，则是指支持面向对象编程语言中的专用术语。

> 如果一个类别B“继承自”另一个类别A，就把这个B称为“A的子类”，而把A称为“B的父类别”也可以称“A是B的超类”。继承可以使得子类具有父类别的各种属性和方法，而不需要再次编写相同的代码。在令子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能。另外，为子类追加新的属性和方法也是常见的做法。 ---维基百科

在 JavaScript 中，构造器其实就是一个普通的函数。当使用 new 操作符来作用这个函数时，它就可以被称为构造方法（构造函数）。

使用Object.create创建对象，之前有个方法是`Object.setPrototypeOf()`，手动设置某个对象的原型。而现在的`create`是直接将新创建对象的原型指向create方法的参数。
```
let a = {a: 1}; 
// a ---> Object.prototype ---> null

let b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)
```

其实就相当于
let b
Object.setPrototypeOf(a)
只不过使用create会让整个逻辑连贯一些。




一个数组类型如何拥有indexOf等方法

但并不是所有的编程语言都有继承机制，前面有说到，继承是面向对象中的术语，C语言就没有。


JS中现在的继承机制是怎样的，过去呢，有没有演变的过程。   

---

实现继承的方法

---

如果你只要获取到可枚举属性，查看Object.keys或用for...in循环（还会获取到原型链上的可枚举属性，不过可以使用hasOwnProperty()方法过滤掉）。

Object.getOwnProprtyNames()不会获取到原型链上的属性

https://segmentfault.com/a/1190000007908692

遍历对象的属性时，自带的属性不会被遍历。为什么呢
手动添加的会被遍历。

四种用于拓展原型链的方法
- new 和 构造函数的配合
- Object.create
- Object.setPrototypeOf
- __proto__
