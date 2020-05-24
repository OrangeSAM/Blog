---
title: 新版字符串
---
## 函数默认参数
在ES5的时候，对于函数参数的默认处理一般如下
function fn(a,b){
	b = b || 0
	当b不为falsy 值，省略了使用if判断的步骤 
	return a+b
}

ES6的写法，直接在参数的位置赋值默认参数
function fn(a=0, b=0)
如果参数是数组，每次的数组不是同一个
	
## 剩余参数
在ES5的时候，如果不知道参数的数量，只能利用arguments伪数组（原型指向Object）进行判断获取。
function sum(message) {
	let result = 0
	for (let I = 0; i< arguments.length;i++) {
		result += arguments[i]
	}
	return message + result
}
sum('结果是', 1,2,3,4,5,6,7,8,9)
ES5中把伪数组变成真数组的的1个方法
Let args = Array.prototype.slice.call(arguments)
ES6中的两个方法
Let  args = Array.from(arguments)
Let args =[…arguments]
ES6的解决方法，因为arguments只是伪数组，并没有数组类型丰富的方法
function sum(message, …numbers) {
	let result = 0
	result = numbers.reduce((p,v)=> p+v,0)
	return message + result
}
Sum('结果是',1,2,3,4,5,6)

## 展开操作
Var arr1=[1,2,3,4,5]
Var [a, b, c,…arr2] = arr1 // arr2=[4,5]
更简单的形式[,,,…arr2] // arr2=[4,5]
还可以这样操作
Var arr3= [0, …arr1, 7]
	
## 解构赋值
```
Let a=1, b=2
[a,b]=[b,a]//完成交换

Var sam ={name: 'frank', age: 18,gender: 'male'}
// ES5时代的写法
// var name = frank.name
// var age = frank.age
// var gender = frank.gender
// ES6的写法
Var {name, age, gender} = frank

// 默认参数和解构赋值的结合使用
Var [a=5, b=7] =[1, 2]

// 函数返回值
Var f = function () {
	Return [1,2,3]
}
Var [a,  ,b] = f()
//嵌套的对象
Var frank = {
	Name: 'jack', age: 18, gender: 'male',
	Child: {
		Name: 'tom',
		Age: 1,
		Gender: 'male'
	}
}
Var {child:{name}} = frank // tom
//综合运用
var frank = {
	name: 'jack',
	age: 18,
	gender: 'male',
	child: {
			name: 'jerry',
			age: 1,
			gender: 'male'
			}
	}
var {child: {name:xingming='tom',age,gender}} = frank
console.log(xingming) // jerry
// 浅拷贝
Let objA = {
	Name: { x:a
	}
}
Let objB = {…objA}
//对象合并
Let objA = {
	P1:1,
	P2:2
}
Let objC = {
	P1:111,
	P3:3
}
Let objB = Object.assign({},objA, objC)//不那么方便的写法
Let objB = {…objA, …objC}
Console.log(objB)
// 对象属性增强
Var x =1
Var y=2
Var obj = {x,y}

Var obj ={x:1, y:2}
Var {x,y} = obj


//给对象赋值
Var key = 'x'
Var value = 'y'

Var obj = {
	"key":value //错的,这样key只是字符串，读不到x
}
Var obj = {}
Obj[key] = value
ES6
Var obj = {
	[ley] :value //用中括号
}
```