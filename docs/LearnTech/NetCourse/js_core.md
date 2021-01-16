---
title: JavaScript核心原理精讲
---
## 开篇词

## 基本功测试之数据类型

```javascript
[] == ![] // true, 史诗级迷惑
// 解析
// 首先可以推断出右边一定是false，
// 对于左边，我的看法是直接Boolean([])等于true，但true == false 肯定为false，
// 坤哥前端群张哥的解释是，左边得这样算，Boolean([].valueOf().toString())，这样算下来确实左边就是false，满足最终答案true，
// 但不解的点在于为什么要这样算
// 深圳前端群发胖的菜鸡给的官方链接(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)里
// 写到，如果一边是Boolean，另一边是对象，就得ToPrimitive(A) == ToNumber(B)，这就和张哥说的对上了。
// 因为ToPrimitive通过尝试调用A.toString()和A.valueOf()方法，将A转换为原始值。
// 即，a = []，a.valueOf().toString() => "", "" == false => true


null == undefined // true
// 解析
// 对于'=='，如果其中一个操作值是null或者undefined，那么另一个操作符必须为null或者undefined，才会返回true，否则都返回false

Number(null) // 0
// 规定，记着就好了

parseInt('') // NaN
// 解析
// 如果第一个字符不能转换为数字，parseInt会返回NaN，但Number('')是0，所以这里计算为NaN是因为没有字符？

{} + 10 // 10
// 解析： 对象在作为操作数时，解释器总是优先调用valueOf()， 而其他情况，解释器总是认为我们想要的是字符串，所以会优先调用toString() 因此对象在前面返回结果就是Number;其他情况对象默认用toString
10 + {} // 10[object Object]
```

*强制类型转换的方法*

`Number(), String(), Boolean, ParseInt, ParseFloat, toString()`