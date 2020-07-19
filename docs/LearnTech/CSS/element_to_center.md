---
title: 被写烂了的元素居中
---

元素如何居中是前端工程师在日常开发中避不开的问题，但又因名目众多而在记忆上显得略微复杂。而面试官却希望你可以把元素居中说出来花来。
写此文以作梳理。

## 水平居中
### 行内元素
对于行内元素，这里的定义是`display`属性值为`inline` 和 `inline-block`的元素。

1. text-align
`text-align`定义行内内容(比如文字)，如何相对他的块父元素对齐。`text-align`并不控制块元素自己的对齐，只控制它的行内内容(子元素)的对齐。
而相对的，子元素也没有直接控制自己相对于父元素的属性(出去margin和padding)；HTML结构内的元素都会有一个父元素来包裹自身，即便`body`之下只有一个子元素，
也可以通过在`body`上设置相关样式让子元素居中。

```html
    <body style='text-align: center'>
      <span>行内元素</span>
    </body>
    
    <div style="text-align:center">
        <span>行内元素</span>
    </div>
    <div style="text-align:center">
        <div style="display: inline-block">
            行内元素
        </div>
    </div>
```

## 垂直居中


