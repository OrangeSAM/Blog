---
title: 牛客上的错题
---

```javascript
var  obj={}
obj.hasOwnProperty('val')
```

上述代码中，hasOwnProperty的作用是：

> 判断obj对象是否具有val属性。

**hasOwnProerty && isPrototypeOf** 前者是用来判断一个对象是否具有你给出名称的属性或对象，但无法检查该对象的原型链中是否具有该属性，判断的属性必须是该对象本身的一个成员。后者是用来判断要检查其原型链的对象是否存在于指定对象实例中，是则返回true,否则返回false。



Window并不是JavaScript内置对象，他是浏览器对象？JavaScript中，可以将对象分为“内部对象”，“宿主对象”，“自定义对象”。内部对象包括Array Boolean Date Function Global  Math Number Object RegExp String以及各种错误类对象Error EvalError RangeError ReferenceError SyntaxError和TypeError，其中Global和Math这两个对象又被称为“内置对象”，使用中不必实例化对象。宿主对象就是执行JavaScript脚本的环境提供的对象。比如浏览器对象，node.js对象？Window就属于宿主对象。自定义对象由开发人员自行添加