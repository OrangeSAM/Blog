#### 课堂笔记

##### 有JavaScript以来声明变量的四种方式

- a=1

- var a=1

*上面两种是ES3的写法，下面两种是ES6*

- let  a=1
- const a=1;

------

##### 但a=1会含义不明，在顶层作用域作为全局变量，但是在函数中又是局部变量。

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

##### 一种不建议的写法

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

##### let

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

##### const

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







