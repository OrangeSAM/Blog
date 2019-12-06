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
