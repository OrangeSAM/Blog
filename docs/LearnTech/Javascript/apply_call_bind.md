---
title: JS | call apply bind
---
## call
apply方法调用一个函数，其具有一个指定的this值，以及作为一个数组提供参数。

和apply的区别：
	Call()方法接受的是若干个参数的列表
	apply方法接受的是一个包含多个参数的数组
	
	
Func.apply(thisArg,[argsArray])

thisArg是可选的，在func函数运行时使用的this值。使用的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null或undefined时会自动替换为指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的包装对象。
argsArray是可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给func函数。如果该参数的值为null或undefined，则表示不需要传入任何参数。从ES5开始可以使用类数组对象。


返回值：调用有指定this值和参数的函数的结果。

每个函数都包含两个非继承而来的方法:call方法和apply方法。
这两个方法的作用是一样的：都是在特定的作用域中 调用函数，等于设置函数体内this对象的值，以扩充函数赖以运行的作用域。

## apply
https://www.cnblogs.com/lengyuehuahun/p/5643625.html
https://blog.csdn.net/ganyingxie123456/article/details/70855586

https://medium.com/@omergoldberg/javascript-call-apply-and-bind-e5c27301f7bb

## bind