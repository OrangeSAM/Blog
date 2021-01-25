---
title: 原型和原型链
---

## 原型
对于一个JavaScript对象来说，什么是原型。一个非常直接的理解，对象的`__proto__`属性所指向的即为该对象的原型。有如下代码，灰色框中的部分即为对象`person`的原型。

![对象的原型](https://i.loli.net/2020/03/29/YcJrDqMF9HQeuSd.png)

而除了通过`__proto__`获得对象的原型之外，在ES6之后，对象的原型还可以通过`Object.getPrototypeOf()`获得，该方法要传入的参数为要返回其原型的对象。
```
let a = {}
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

如图，这句话的意思就是说，被构造函数创建的实例对象的`__proto__`属性指向其构造函数的`prototype`属性，也因此，截图中的`a.__proto__ === func.protype`。

而对象的`__proto__`属性一般是直接指向Object的原型对象，即`a.__proto__ === Object.prototype`。

那么，`prototype`又是什么意思呢，通过上面提到的等式，我们可以发现都是这样一个等式的，即`对象.__proto__ === 函数.prototype`。
```
let n = new Number(1)
// 我们使用以上代码声明了Number类型的变量n，
// 可得出 n.__proto__ === Number.prototype
```
n 不是一个数值类型吗，为什么是对象。其实，他是一个包装对象。在这其中起作用的就是`new`操作符，该操作符一般和构造函数搭配使用。所以上面提到的Number是个函数没毛病，等式也是正确的。简单理解一下就是，`__proto__`是对象的属性，`prototype`是函数的属性。
> 对象是 JavaScript 语言最主要的数据类型，三种原始类型的值——数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象”。
> 
> 所谓“包装对象”，就是分别与数值、字符串、布尔值相对应的Number、String、Boolean三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。
> 
> 这三个对象作为构造函数使用（带有new）时，可以将原始类型的值转为对象；作为普通函数使用时（不带有new），可以将任意类型的值，转为原始类型的值。

## 原型链

前面说到对象的原型即是`__proto__`属性所指向的地方。但对象的原型是否还有原型呢，在部分情况下是有的。如果说原型是本地的，那么原型链可以理解为云端的。

![](https://i.loli.net/2020/03/29/T27onmgsPkE6iMC.png)

和原型一部分的图片比较，可以发现`a`的`__proto__`属性中还有一个`__proto__`，而第二个`__proto__`属性和原型一部分中的是一样的。所以有这样的等式`person.__proto__ === a.__proto__.__proto__`。此外，二者也都还相等于`Object.prototype`。

这就是**原型链**，即一个对象的中所有`__proto__`属性串联的链。`Object.prototype.__proto__ === null`，这就是原型链的终点，为null。

**原型链存在的意义就在于将一类对象中共有的属性/方法串联起来，而不必每个对象都自己持有一份中。**

当读取一个对象的属性的时候，JavaScript 会先从对象中查找，如果没有查找到，才会到原型对象中查找该属性（或方法）。
所以，尤其是对于方法，最好保存到原型对象中以便于共享，并且达到节省内存的目的，而且原型对象还有一个强大的功能，
那就是如果通过构造函数实例化一些对象后，再给构造函数的原型对象增加属性和方法，那么它原来实例化的对象实例将会继承这些增加的属性和方法。

这里结合上一节原型中说到`prototype`是什么，说为什么`Object.prototype.__proto__`是原型链的终点。因为Object可以说是其他一切对象的构造函数，见下代码。
```
Function instanceOf Object // true
Array instanceOf = Object  // true
let person = {name: 'sam'}
person instanceOf Object   // true
```
> instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

万物由他而来，也终归于他。

另外，今天看今日简史的一点想法就是，你并不是从出生开始就被定义的，而是从有人类开始就被定义了，一代又一代自然选择和遗传造就了你，从这个角度讲，父母起一个基因传递的作用。
对象的创建亦是如此，一个空对象依然有一些自带的属性和方法。

--- 
补充，由声明一个对象举例，为什么会有toString方法，多个不同对象的toString()又是如何管理的。
如何证明公用，判断所指向的原型对象是否相等，因为对象需要相等(===)的话，需要值和地址都相同。

---
```javascript
Object.__proto__.__proto__ === Object.prototype
fn.__proto__ === Function.prototype // (此处假定fn是某构造函数的实例)
fn.__proto__.__proto__ === Object.prototype
array.__proto__ === Array.prototype
array.__proto__.__proto__ === Object.prototype
Function.__proto__ === Object.__proto__ || Function.__proto__===Funtion.prototype
// 因为他自己可以构造自己，前者对的原因是因为 Function.__proto__ 指向 Object.prototype，
// 而Object.__proto__也指向Object.prototype，所以？ 但好像原因本身就错掉了。
Array.__proto__ === Object.__proto__ || Function.prototype
Object.__proto__ === Function.prototype
true.__proto__ === Boolean.prototype // 对象字面量的背后也是构造函数
Function.prototype.__proto__ === Object.prototype
```

---

2021.1.24 补充
prototype是原型对象，__proto__是对象原型

设置和获取原型对象，
Object.setPrototypeOf
Object.getPrototypeOf

instanceOf运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
isPrototypeOf()方法用于测试一个对象是否存在另一个对象的原型链上。

in 操作符还会检测原型链上是否存在指定属性
```javascript
let a = {}
Object.prototype.heihei = 33
"heihei" in a // true
```

Object.create