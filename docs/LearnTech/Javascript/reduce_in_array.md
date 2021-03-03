---
title: JS | reduce
---
reduce 函数接受4个参数
accumulator acc 累计器
current value cur 当前值
current index idx 当前索引
source array src 源数组

返回值是函数累计处理的结果

reduce为数组中的每一个元素依次执行callback 函数。
回调函数第一次执行时，accumulator 和currentValue的取值有两种情况
如果调用reduce() 时提供了initialValue，accumulator取值为initialValue，
currentValue取数组中的第一个值；
如果没有提供initialValue,那么accumulator取数组中的第一个值，currentValue取数组中第二个值。

很好理解，如果给了我一开始的累加值，那currentIndex必须要从第一个开始

var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);
//用箭头函数
var total = [ 0, 1, 2, 3 ].reduce(
  ( acc, cur ) => acc + cur,
  0
);


应用 将二维数组转化为一维
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  function(a, b) {
    return a.concat(b);
  },
  []
);
// flattened is [0, 1, 2, 3, 4, 5]
//用箭头函数
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
 ( acc, cur ) => acc.concat(cur),
 []
);

