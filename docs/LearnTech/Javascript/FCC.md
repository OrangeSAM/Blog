---
title: fcc学习记录
---

如果在代码块、语句或表达式中使用关键字let 声明变量，这个变量的作用就被限制在当前的代码块，语句或者表达式中。

var printNumTwo;
for (var i = 0; i < 3; i++) {
  if(i === 2){
    printNumTwo = function() {
      return i;
    };
  }
}
console.log(printNumTwo());
// 返回 3

因为在等于2的时候只是给了printNumTwo赋值了一个函数，并没有运行，
到运行的时候，全局变量i的值已经变成了3。
 
在let的基础上，const声明的变量都是只读的，这意味着使用const声明变量并只能赋值一次。

箭头函数在类似 map()  filter() reduce() 等需要其他函数作为参数来处理数据的高阶函数里会很好用。

查找数组中的整数并且计算他们平方。
const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34];
const squareList = (arr) => {
"use strict";
// 在这行以下修改代码
const squaredIntegers =(arr.filter(item=>item%1===0)).map(item=>item*item);
// 在这行以上修改代码
return squaredIntegers;
};
// 测试你的代码
const squaredIntegers = squareList(realNumberArray);
console.log(squaredIntegers);
判断是否为整数还可以使用ES6的新语法 Number.isInteger(数值)


默认参数会在参数没有被指定，也即值为undefined的时候起作用

rest操作符可以避免查看args数组的需求，并且允许我们在参数数组是能够使用map() filter() deduce()


