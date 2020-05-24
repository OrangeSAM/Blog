---
title: 属性修饰符
---
undefined 是只读的变量
是 window 的只读属性

get 实现只读

```
o = {
    get name () {
        return 'frank
    }
}
```

defineProPerty 实现只读
Object.defineProperty(o, 'name2', {value: 'frank', writable: false})

configurable 为 false 后, 对象不可再更改, 该属性本身也无法再更改

Object.defineProperty 单个操作
Object.defindProperties 批量操作
