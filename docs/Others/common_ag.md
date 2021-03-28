---
title: 常用算法
---
1. 获取字符串的所有子串
```javascript
getAllSubString(arr) {
  for (let i=0; i<arr.length; i++) {
      for (let m = i+1; m< arr.length; m++){
          console.log(i, ':', arr.charAt(i), m, ':', arr.charAt(m))
          console.log(arr.substring(i,m))
      }
  }
}
```

2. 数组拍平 flatten
```javascript
let arr = [1, [2, [3,[4, [5,[6]]]]]]

flatten(arr) {
  //方法1，递归concat实现
  let final = []
  arr.forEach((e,i) => {
    if (e instanceof Array) {
      final = final.concat(...flatten(e))
    } else {
      final.push(e)
    }
  })
  return final
  // 才发现下面这种情况
  // [5].concat(6)
  // (2) [5, 6]
  // [5].concat([6])
  // (2) [5, 6]

  //方法2，reduce concat实现
  return arr.reduce(function (prev, next) {
          return prev.concat(Array.isArray(next) ? flatten(next) : next)
      }, []
  )
  
  // 方法3，while循环实现
  while (arr.some(v => Array.isArray(v))) {
    arr = [].concat(...arr);
  }
  return arr;
  
  // 方法3，正则去除
  let str = JSON.stringify(arr).replace(/\[|\]/g, '');
  return JSON.parse(Array.of('[' + str + ']')[0]);
  
  // 方法4，toString返回

}
```