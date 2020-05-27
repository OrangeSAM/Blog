---
title: 什么是JavaScript
---
JavaScript既是一个面向过程的语言，又是一个面向对象的语言。
在JavaScript中，通过在运行时给空对象附加方法和属性来创建对象。
对象创建后，它可以用作是创建相似对象的原型。

JavaScript的动态特性包括 运行时构造对象，可变参数列表、函数变量、动态脚本执行（通过Eval）
、对象内枚举（通过for…in）和源码恢复（JavaScript程序可以将函数反编回源代码）

JavaScript实现
	spidermonkey引擎  C/C++实现
	Rhino 引擎
	
	一些流行的JavaScript引擎
	谷歌v8引擎，这也是node.js 使用的引擎
	JavaScriptcore，被用在了webkit浏览器
	
	浏览器一般通过API创建 “宿主对象”来负责将DOM反射到JavaScript中
	
	JavaScript是 oracle于美国和其他国家注册和拥有的的商标。
	
	
JavaScript不支持类，类这一概念在JavaScript中通过对象原型 object prototype 得到延续
JavaScript中的函数也是对象，JavaScript允许函数在包含可执行代码的同时，能像其他对象一样被传递


JavaScript中的类型
	Number
	String
	Boolean
	Symbol
	Object
		Function
		Array
		Date
		RegExp（正则表达式）
	Null
	Undefined
	
对于数字类型，JavaScript不区分整数值和浮点数值，所有数字在JavaScript中均采用浮点数值表示
	![](https://i.loli.net/2020/03/31/i1EnhSdalBGj7tA.png)

64位双精度浮点数，表示如上图，
在计算过程中，十进制的0.2和0.1都会被转换成二进制，但由于浮点数用二进制表达时是无穷的，
因浮点数小数位的限制而截断的二进制数字，再转换成十进制就会有误差

JavaScript内置math对象，用以处理更多的高级数学函数和常数

可以使用内置函数parseInt（）将字符串转换为整型，两个参数，一是要转的数字，二是转换的进制
以及内置函数parseFlost(),用以解析浮点数字符串，只应用于解析十进制数字

单元运算符+也可以吧数字字符转换成数值
如果给定的字符串不存在数值形式，则返回NaN

JavaScript两个特殊的值Infinity 正无穷，-Infinity 负无穷


JavaScript中的字符串是一串Unicode 字符序列，即是一串UTF-6编码单元的序列，每一个编码单元有一个16位二进制数表示，每一个Unicode字符由一个或两个编码单元来表示
	字符串的方法
		chartAt(),括号内是想要查找的字符位置
		Replace(,)，括号内的参数，先是要被替换的，后是要替换成的
		toUpperCase();


其他类型
	JavaScript中null和undefined是不同的，前者表示一个控制（none-value），必须使用null关键字才能访问
	后者是“undefined”（未定义）类型的对象，表示一个未初始化的值，也就是还没有被分配值。
	
	JavaScript允许声明但不对其赋值，一个为被赋值的变量就是Undefined类型，undefined实际上是一个不允许修改的常量
	
	JavaScript包含布尔类型，这个类型的变量有两个可能的值，分别是true和false（两者都是关键字）
	JavaScript按照如下规则将变量转换成布尔类型
	False  0  空字符串("")  NaN  null 和undefined  被转换成false
	所有其他值都被转换为true
	
变量
	在JavaScript中声明一个新变量却没对其赋值，那么这个变量的类型就是undefined
	
运算符
	+ 操作符可以用来连接字符串
	如果用一个字符串加上一个数字（或其他值，那么操作数都会被首先转换为字符串）
	3+4+“5”//75
	
控制结构
	If else
	While 
	Do-while
	
对象
	JavaScript中的对象可以简单理解为 名称-值 对，
	名称部分是一个JavaScript字符串，“值”部分可以是任何JavaScript的数据类型--包括对象。
	两种方法可以创建一个空对象
		Var obj=new object();
		Var obj={};
		
	第二种更方便的方法叫做对象字面量
	
数组
	JavaScript中的数组是一种特殊的对象，它的工作原理与普通对象类型（以数字为属性名，但只能通过[]来访问）
	数组字面量法创建创建数组
	Var a=["dog","cat","hen"];
	遍历数组的另两个方法 for  in  |  forEach()
	
函数

自定义对象
	…args 叫做剩余参数
