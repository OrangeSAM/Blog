---
title: JavaScript深入浅出笔记
---
function fn3(){return 3};
var fn= function fn4(){ return 4};
 //在这里 fn3的作用域是顶级作用域
// 而fn4的作用域只是自己内部的一小块
//console.log fn4 会报错，
而console.log fn3 不会

匿名函数 具名函数 箭头函数 
 三者都有name   //函数名.name
 箭头函数的this和其他两者的this会有不同


词法作用域
   抽象语法树  词法树

词法作用域只能确定'a'是不是那个'a',但不能确定这个'a'的值是不是那个'a'的值。

//词法作用域  三水清文章
词法作用域，变量的作用域是在定义时决定而不是执行时决定，也就是说词法作用域取决于源码，通过静态分析就能搞定，因此词法作用域也叫静态作用域。with和eval除外，所以只能说js的作用域机制非常接近词法作用域(lexical scope)。

```javascript
//全局（window）域下的一段代码
function a(i) {
    var i;
    alert(i);
};
a(10);
```
alert 应该是输出10。
局部变量i和形参i不是同一个存储空间。
![](https://i.loli.net/2020/04/04/pImyBaTKVOtGi47.png)

![](https://i.loli.net/2020/04/04/GB3j8UxFVvtYJmC.png)
那到底是不是呢
