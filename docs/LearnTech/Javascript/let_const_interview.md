---
title: JS | let & const
---
## 有JavaScript以来声明变量的四种方式

- a=1

- var a=1

*上面两种是ES3的写法，下面两种是ES6*

- let  a=1
- const a=1;

------

## 但a=1会含义不明，在顶层作用域作为全局变量，但是在函数中又是局部变量。

```javascript
var a;
function fn(){
    var a;
    function fn2(){
        a=1;
        //此时的a就是局部变量的a,在函数fn的第一句中声明
    	//去掉第二个var a，那么a就是全局变量
    	//两个var a 都没有的情况下，a=1即会隐式声明为全局变量a
    }
}
```

---

## 一种不建议的写法

```JavaScript
function fn(){
    if(true){
        console.log(a)
    }else{
        var a;
        console.log(2)
    }
}
fn()
//由于var的变量提升，fn函数执行后并不会报错。	
//因此建议在函数fn开始时声明需要用到的变量。		
```

---

## let

```javascript
(function (){
	var a=1;
	window.sam=function(){
    console.log(a)
	}
}())
//目的，只暴露sam一个全局变量
//如果不使用函数包裹对a的声明，那么就会不小心暴露window.a全局变量
//而如果是使用具名函数的话，仍然会暴露window.fn全局变量
//因此在没有let声明的时候，需要麻烦的立即理解执行函数来形成无暴露的局部变量

let
//let存在的意义就是为了解决这个问题，为了方便的声明和使用全局变量
//1.let的作用域只看花括号，只在最近的两个花括号之间
//2.在用let声明变量之前使用变量会报错;这也是临时性死区的概念来源
//3.let不能重复赋值，重复赋值也会报错
```

---

### const

```javascript
//1.const的作用域也是局部，只在最近的两个花括号之间
//2.在用const声明的变量之前使用该变量会报错
//3.const不能重复赋值，重复赋值会报错，且const只能赋值一次
```

---

#### 面试题

##### 开胃小菜

```JavaScript
var a=1 
function fn(){
    console.log(a)//1
}
//在下方有一行代码隐藏的代码，问在这个情况下log的值是否是确定的？
//隐藏的代码在这里
fn()
//不能确定，因为a是全局声明的变量，且可以重复赋值为其他值
```

##### 一个经典的题目

```JavaScript
var i
for(i=0;i<6;i++){
    function fn(){
    	//do something to i,
    	//like log..
    	console.log(i)
    }
    fn()
	btn.onclick=fn
}
//请问现在btn按钮的一个click事件会打印出什么？
//毫无疑问是6，因为i是全局声明的变量，在for循环执行完毕后，i的已经变为6了
//js并不会在for循环执行时替你保管每一个i的值到fn中
//另外，i为6的原因是
```

当然，我们见的更多的应该是长下面的样子

```javascript
var liTags=document.querySelectorAll('li')

var i
for(i=0;i<liTags.length;i++){
    liTags[i].onclick=function(){
        console.log(i);
    }
}		
//每个li标签的点击事件都是输出当前循环的i
//但其实本质上和上面没差，由于var的存在，这都是刻舟求剑的行为
//因为点击事件必然后于for循环，那再点击li的时候，因为i是全局变量，早已变成length+1

//解决的两种方法
//同上使用立即执行函数得到局部变量

for(i=0;i<liTags.length;i++){
    (function(){
        var j=argumengs[0]
        liTags[j].onclick=function(){
            console.log(j)
        }
    })(i)
}
//利用执行函数创建局部变量j,这里也还涉及到js的另一个概念-闭包

```


---



a=1
var a=1
//上面两种是ES3，下面两种是ES 6

let a=1;
const a=1;

a=1 含义不明，在顶层作用域是作为全局变量，
但是在函数中又是局部变量
var a
function fn(){}
var a ;
function fn2(){}
a=1 ;//此时的a就是局部变量的a
//去掉第二个var a才是全局变量
//两个var 都没有的情况下，a=1即会隐式声明全局变量a}}

```javascript
function fn() {
    if (true) {
        console.log(a)
    } else {
        var a
        console.log(2)
    }
}
```

// 既然会这样，那建议var 放在函数最开始的地方
---
```javascript
(function (){
    var a = 1
    window.frank = function() {
        console.log(a)
    }    
}())
// 目的，只暴露frank一个全局变量
// var a = 1 就会不小心暴露了window.a全局变量
```


为什么立即执行函数不加括号会报错
let 的存在就是为了解决这个问题 为了方便的使用局部变量
let作用域只看花括号，只在最近的两个花括号之间
在let a之前使用a，报错
let不能重复赋值，重复也报错

{
//这就是临时性死区console.log(a);
let a=1;
}


let作用域只看花括号，只在最近的两个花括号之间
在let a之前使用a，报错
let不能重复赋值，重复也报错
对于以上，const也是
const 只能赋值一次而且必须在声明的时候立马赋值

既然会这样，那建议var 放在函数最开始的地方



---
阮一峰


Es6新增了let命令，用来声明变量，用法类似于var，但是所声明的变量，只在let命令所在的代码快内有效
Var 是全局变量

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();//10

来自 <http://es6.ruanyifeng.com/#docs/let> 
变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10

来自 <http://es6.ruanyifeng.com/#docs/let> 


如图示，a[6]传的6只是数组中的位置，而数组中的所有成员都是函数，函数跟数组的位置是分离的，函数执行完之后i=10




变量提升，意为，函数及变量的声明总是会被解释器提升到方法体的最顶部，
函数提升的优先级大于变量提升的优先级
需要注意的是，初始化并不会被提升。
JavaScrip严格模式中不允许使用未声明的变量
function f(a){
    console.log(a);//?
    var a = 2;
    console.log(a);//?
    function a(){};
    console.log(a);//?
}
f(1);


 function f(a){
      var a = function(){};
    console.log(a);// function
    var a = 2;
    console.log(a);//2
    console.log(a);//2
}
f(1);

来自 <https://zhuanlan.zhihu.com/p/23873265> 



暂时性死区
只要块级作用域内存在let 命令，它所声明的变量就"绑定"这个区域，不再受到外部的影响。
ES6 明确规定，如果区块中存在let命令和const命令，这个区块对这些命令声明的变量，从
一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。错误是reference error。
Let x=x; //会报错，x is not defined
而undefined是一个数据类型

暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

let不允许在相同作用域内，重复声明同一个变量，因此不能在函数内部重新声明参数。

块级作用域
ES5只有全局作用域和函数作用域，没有块级作用域。

Var s='hello;
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);//可以对字符串类型这样操作
}

来自 <http://es6.ruanyifeng.com/#docs/let> 


ES6的块级作用域
let实际上为JavaScript新增了块级作用域，
所以内层作用域就可以定义外层作用域的同名变量。

块级作用域与函数声明
ES6引入了块级作用域，明确允许在块级作用域之中声明函数。
ES6规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

ES6附录b又规定
	允许在块级作用域内声明函数
	函数声明类似于var，即会提升到全局作用域或函数作用域的头部
	同时，函数声明还会提升到所在的块级作用域的头部

ES6的块级作用域允许声明函数的规则，只在使用大括号的的情况下成立，如果没有使用大括号，就会报错



const命令
	Const 声明一个只读的常量。一旦声明，常量的值就不能改变，这也意味着，const一旦声明
	变量，就必须立即初始化，不能留到以后赋值。 
	
	Const 的作用域与let命令相同：只在声明所在的块级作用域内有效。

	const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
	也不可重复声明。
	
	const命令的本质
	const实际上保证的是变量指向的那个内存地址不得改动，而不是变量的值不得改动。
	
	对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量；
	但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的知识一个指针，const只能保证这个指针是固定的，并不能控制其所指向的数据结构是不是可变的。
	

ES6声明变量的六种方法
ES5只有两种声明变量的方法，var命令和function命令，ES6除了添加let和const命令
还有两种两种，import和class命令


顶层对象的属性
	顶层对象，在浏览器环境指的是window对象，在node指的是global对象。
	Es5中，顶层对象的属性与全局变量是等价的。
	ES6的新规定，var命令和function命令声明的全局变量，依旧是顶层对象的属性
			let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性
			即从ES6开始，全局对象将逐步与顶层对象的属性脱钩
			
	global对象//没看怎么明白
		-浏览器里面，顶层对象是window，但是node和web worker没有window
		-浏览器和web worker里面，self也指向顶层对象，但是node没有self
		-node里面，顶层对象是global，但其他环节都不支持
		
		同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this
		变量，但是有其局限性。
	
var 只会提前声明  function即声明又定义
let 重复声明会报错

let 没有变量提升
	不可一次重复声明
	不会给window增加属性
	
const 一旦声明必须赋值
	定义的是一个常量，不可以重新赋值
	
在块级作用域中  var和function声明的变量依然是全局的
在块级作用域下 let 和const 声明的变量是私有的

 函数的变量提升是提升整体吗
是的 
变量的声明被提前到作用域顶部，赋值保留在原地
函数声明会整个被提前
但是只有函数声明式会被提前

{} 一个{}就是一个块级作用域
在块级作用域下 var 和function声明的变量依然是全局的
在块级作用域下 let 和const 声明的变量是私有的
{}如果想表示一个对象不可以放在行首
