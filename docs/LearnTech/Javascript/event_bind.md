---
title: JS | 事件绑定
---
https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener

onclick 添加事件不能绑定多个事件，后面绑定的会覆盖前面的
普通方式绑定事件，只能通过删除代码取消，
object.onclick=null?
addeventlistener绑定后，可以用removeeventlistener取消

三种方式 
```javascript
	1. onclick="click()"
	2. object.onclick=function();
	3. object.addeventlistener("click",click,false);
```
	
第三种方式的好处，可以绑定多次同一个事件，且都会执行；
但在DOM中不会，脚本中通过匿名函数的方式也只会执行最后一个事件。

```javascript
1. <div id="btn" onclick="clickone()" onclick="clicktwo()"></div> 
<script>
function clickone(){ alert("hello"); } //执行这个
function clicktwo(){ alert("world!"); }
</script>
2. <div id="btn"></div>
<script>
document.getElementById("btn").onclick = function（）{ alert("hello"); }
document.getElementById("btn").onclick = function（）{ alert("world"); } //执行这个
</script>
3. <div id="btn"></div>
<script>
document.getElementById("btn").addeventlistener("click",clickone,false);
function clickone(){ alert("hello"); } //先执行
document.getElementById("btn").addeventlistener("click",clicktwo,false);
function clicktwo(){ alert("world"); } //后执行
</script>
```

来自 <https://www.cnblogs.com/mylove103104/p/4667211.html> 

什么是事件委托？
事件冒泡？
使用事件委托和不使用的性能影响

分为两种事件 浏览器对象BOM上的时间，文档对象DOM上的事件。


事件冒泡，由子向父
ie8及以上浏览器冒泡顶级对象为document，而其他浏览器冒泡顶级对象为window

事件捕获，由顶向下
所有浏览器都支持事件冒泡，但ie8及以上浏览器不支持时间捕获。


事件流包括三个阶段，事件捕获阶段，处于目标阶段，时间冒泡阶段。
JS事件详解(一) —— 事件流 - bingo_wangbingxin的博客 - CSDN博客
关于三个阶段具体的代码https://blog.csdn.net/bingo_wangbingxin/article/details/79122410


addeventlistener可以给DOM对象绑定多个事件处理程序，按顺序执行
//给出响应代码
若是绑定同一事件处理函数并且第三个参数一直，只会执行一次
//给出相应代码
绑定同一事件处理函数但第三个参数不一致，会执行两次


阻止默认事件 
1.阻止通过on方法绑定事件的默认事件

demo.onclick=function(){
    console.log(123)
    return false
}
1
2
3
4
2.阻止通过addEventListener方法添加事件的默认事件

demo.addEventListener("click",function(e){
    var event=e||window.event
    console.log(123)
    event.preventDefault()
},false)
1
2
3
4
5
3.阻止通过attachEvent方法添加事件的默认事件

demo.attachEvent("onclick",function(e){
    var event=e||window.event
    console.log(123)
    event.returnValue=false
})


on 和bind是啥玩意


eventtarget可以是文档上的元素 element document  window 或则任何其他支持的对象，比如XMLHttpRequest

addEventListener()通过将实现EventListener 的函数或对象添加到调用他的EventTarget上的指定事件类型的事件侦听器列表中。


addeventlistener()是W3C规范中提供能的注册时间监听器的方法。
优点有
它允许给一个事件注册多个监听器。特别是在使用ajax库，JavaScript模块，或其他需要第三方库、插件的代码
他提供了一种更精细的手段控制listener 的触发阶段（即是可以选择捕获或者冒泡）
他对任何DOM元素都是有效的，而不仅仅只对HTML元素有效。
DOM元素和HTML元素的关系。


如果同一个Eventtarget注册了多个相同的EventListener，那么重复的实例会被抛弃。


当使用addeventlistener()为一个元素注册时间的时候，句柄里的this值是该元素的引用。其与传递给句柄的event参数的currentTarget属性的值一样。
this‘的出现代表了元素的引用，注意到在一个函数里this调用的效果和标准规则里面是一样的。


