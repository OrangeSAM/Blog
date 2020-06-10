---
title: 错题
---
## 1. 运算符优先级
```javascript
    var a = {n: 1};
    var b = a;
    a.x = a = {n: 2};
    
    console.log(a.n, b.n);
    console.log(a.x, b.x);                         
```
::: details 点击查看答案
2 1
undefined {n: 2}

主要需要理解的是`.`运算符优先级比赋值运算高。
```js
// var b = a,此时a和b指向同一个对象。

// .运算符比 = 运算符高,先计算`a.x`,此时 
b = {
    n:1,
    x:undefined
}

// 相当于给对象添加了x属性。

a.x = a = {n:2};

// 计算完a.x,再计算 = ,赋值是从右向左,此时a指向一个新对象。
a = {
    n:2
}

// a.x已经执行过了,此时对象的x属性赋值为a,此时

对象 = {
    n:1,
    x:{
        n:2
    }
}

// 即:
a = {
    n:2
}

b = {
    n:1,
    x:{
        n:2
    }
}
```
:::

## 2. 声明被覆盖
```javascript
var c = 1;
function c(c) {
    console.log(c);
    var c = 3;
}
console.log(c);
c(2);
```
::: details 点击查看解析
//  输出
1
TypeError: c is not a function
由于函数声明会提升,当函数外的console.log(c)执行时,c已经被赋值为1。因此,执行c(2)时会抛出TypeError,因为1不是函数。

因为函数声明会提升，变量的声明也会提升，但提升的只是声明，赋值不会。而由于函数的优先级高于变量，执行完声明后，变量的赋值就
覆盖了函数的声明。导致`C`不是函数。~~可不要上了鬼子的当。~~
:::

https://juejin.im/post/5ee03947e51d457889262921 刷到第六题