---
title: 阮一峰typescript教程
---

1. TypeScript 将typeof运算符移植到了类型运算，它的操作数依然是一个值，但是返回的不是字符串，而是该值的 TypeScript 类型。
```typescript
let a = 1;
let b:typeof a;

if (typeof a === 'number') {
  b = a;
}
```
   
2. 数组的类型有两种写法。第一种写法是在数组成员的类型后面，加上一对方括号。

`let arr:number[] = [1, 2, 3];`
上面示例中，数组arr的类型是`number[]`，其中number表示数组成员类型是`number`。

如果数组成员的类型比较复杂，可以写在圆括号里面。

`let arr:(number|string)[];`
上面示例中，数组arr的成员类型是`number|string`。

这个例子里面的圆括号是必须的，否则因为竖杠|的优先级低于`[]`，TypeScript 会把`number|string[]` 理解成`number`和`string[]`的联合类型。
3. 数组类型的第二种写法是使用 TypeScript 内置的 Array 接口。

`let arr:Array<number> = [1, 2, 3];`