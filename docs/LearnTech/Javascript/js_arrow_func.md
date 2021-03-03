---
title: JS | 箭头函数
---
不写花括号的同时也不能写return，但可以有花括号没有return，会自动加上undefined。
this是call的第一个参数。

Object(p1, p2)
Object.hi(1,2) //小白写法
Object.hi.call(object, 1, 2)//高级写法

P1的值是由object.hi(这个玩意决定的)
P2的值是由object.hi(不是这个，这个玩意决定的)
This的值是由 这个玩意.决定的hi()
This.的值是由 object.hi.call(这个玩意决定的, 1, 2)

四行代码简单理解箭头函数与普通函数的this不同。
Function f1() {
  console.log(this)
}
F1.call({name:'frank'}) // {name:frank}
Let f2 = () => {console.log(this)}
F2.call({name:frank}) // window
map还可以链式操作吗

vue methods 第一层不要使用箭头函数，会影响this的获取


