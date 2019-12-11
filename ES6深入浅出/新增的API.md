### Obj.assign

对于大部分语言来说, 深拷贝是不可能的.

浅拷贝 即 = 赋值符号
var a = {
a1: 'a',
a2: 2
}
var b = {
obj: {
name: 'b'
}
}
Object.assign(a, b)
a.obj.name=292929
这要 b.obj.name === 29292 true

### from

在 ES5 时代, 把一个伪数组变成数组的方式是

```
var a = {
    0: '111',
    1: '222',
    length: 3
}
a = Array.prototype.slice.call(a, 0)
// slice 的返回值是一个新的数组对象

创建一个长度的为N的数组
new Array(5) // [] length为5 但里面没有内容, 所以这样不行
// es6
Array.from({length: 5})// [undefined, ..., undefined]
// es5
a = Array.apply(null, {length: 5})
```

// 创建一个函数能够返回 N 个 N 的数组

```
// es6
function x(n, fill) {
    var array = Array.from({length: n}).fill(fill)
    // 或者如下
    // return array.map(v => fill)
}
// es5
function x(n, fill) {
    console.log(new Array(n + 1))
	console.log(new Array(n + 1).join(fill))
	console.log(new Array(n + 1).join(fill).split(''))
	return new Array(n + 1).join(fill).split('')
}
非常取巧地用了join
// join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。
// 指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果缺省该值，数组元素用逗号（,）分隔。如果separator是空字符串("")，则所有元素之间都没有任何字符。
```

find filter
find 返回值只有一个, filter 可以有多个
