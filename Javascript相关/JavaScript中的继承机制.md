对于继承，我的一些问题
1. 什么是继承，
2. 为什么需要继承的存在
3. 所有语言都有继承机制吗
4. 其他语言的继承机制又是怎样的
5. JS中现在的继承机制是怎样的，过去呢，
   有没有演变的过程。
6. 继承机制在实际开发中的应用是怎样的。
   
说到继承，自然就离不开原型链，二者可以说是相辅相成的。

有如下代码
```
let person = {name: '刘一笔'}
```
在白银时代，（对应winter提到的前端四个时代）我们获取一个对象原型的方式是通过访问`a.__proto__`
![](https://i.loli.net/2020/03/24/MVk1TJLgl8Xd6Nx.png)

而现在ES6(黄金时代)，对象的原型可以通过`Object.getPrototypeOf()`获得，该方法要传入的参数即要返回其原型的对象。
```
Object.getPrototypeOf(a)
```
![](https://i.loli.net/2020/03/24/9W5dC3fUN1sumSh.png)

由此，我们可以得出`a.__proto === Object.getPrototypeOf(a)`这一结论。

另外，相应地，设置某个对象的原型可以通过`Object.setPrototypeOf()`，该方法要传入的参数为要设置原型的对象，以及该对象的新原型。在这之前，如果我们需要设置对象的原型，需要`a.__proto__ === 某个对象`这样编写。

需要说明的是，`__proto__`并不是EcmaScript标准中的一部分，只是浏览器中的实现。而刚刚说到的get和set是ES2015标准中的。

需要注意的是：
> 但它不应该与构造函数 func 的 prototype 属性相混淆。被构造函数创建的实例对象的 [[prototype]] 指向 func 的 prototype 属性。Object.prototype 属性表示 Object 的原型对象。

![](https://i.loli.net/2020/03/25/Ld6MeUJ4tDbG1uc.png)

这句话的意思就是说，被构造函数创建的实例对象的`__prototype__`属性指向其构造函数的`prototype`属性，也因此，截图中的`a.__prototype__ === func.protype`。

而对象的`__prototype__`属性是直接指向Object的原型对象，即`a.__prototype === Object.prototype`。

Object.prototype.__proto__ === null，这就是原型链的终点，为null。

---

这点不是很明白
![](https://i.loli.net/2020/03/25/3BI29AgftkubDGN.png)
为啥返回undefined

一个数组类型如何拥有indexOf等方法

在 JavaScript 中，构造器其实就是一个普通的函数。当使用 new 操作符 来作用这个函数时，它就可以被称为构造方法（构造函数）。

使用Object.create创建对象，之前有个方法是`Object.setPrototypeOf()`，手动设置某个对象的原型。而现在的`create`是直接将新创建对象的原型指向create方法的参数。
```
let a = {a: 1}; 
// a ---> Object.prototype ---> null

let b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

其实就相当于
let b
Object.setPrototypeOf(a)
只不过使用create会让整个逻辑连贯一些。
```


继续看用ES6实现继承的方法。

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

