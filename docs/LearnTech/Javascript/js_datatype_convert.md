---
title: 数据类型转换
---
|值| 转换为字符串  | 转换为数字  | 转换为布尔值 | 转换为对象 |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| undefined<br />null                                                                | "undefined"<br />null                                             | NaN<br />`0`                                 | false<br />false                                                | throws TypeError<br />throws TypeError                                                                                           |
| true<br />false                                                                    | "true"<br />false                                                 | `1`<br />`0`                                 |                                                                 | new Boolean(true)<br />new Boolean(false)                                                                                        |
| ""(空字符串)<br />"1.2"(非空，数字)<br />"sam"(非空，非数字)                       |                                                                   | `0`<br />1.2<br />NaN                        | `false`<br />true<br />true                                     | new String("")<br />new String("1.2")<br />new String("one")                                                                     |
| 0<br />-0<br />NaN<br />Infinity<br />-Infinity<br />1                             | "0"<br />"0"<br />"NaN"<br />"Infinity"<br />"-Infinity"<br />"1" |                                              | `false`<br />`false`<br />`false`<br />true<br />true<br />true | new Number(0)<br />new Number(-0)<br />new Number(NaN)<br />new Number(Infinity)<br />new Number("-Infinity")<br />new Number(1) |
| {}<br />[]<br />`[9](1个数字元素)`<br />`['a'](其他数组)`<br />function(){} (任意函数) | 下文详解<br />""<br />"9"<br />"使用 join()方法"<br />下文详解    | 下文详解<br />`0`<br />`9`<br />NaN<br />NaN | true<br />true<br />true<br />true<br />true<br />              |                                                                                                                                  |

---

表格很清晰，不过有个问题需要注意。null 本身不是对象，它本身就属于 null 类型，null 类型是一种原始值类型。很多人认为 null 是一种特殊的对象是因为 typeof null 返回的是 "object"，这实际上是 JS 的一个十几年没有修复的 bug。变量都是以二进制保存的，在 JS 中，typeof 会把二进制前三位都为 0 的变量认为是 "object"，而 null 的二进制表示中所有位都为 0，自然也会被 typeof 认为是 "object"，这个 bug 没有修复的原因是：如果修复了，它会影响大量的已有 JS 应用。但作为程序员，我们有责任意识到事物的本质，无论是在自己使用过程中，还是在给他人讲解过程中。以上个人愚见，如有冒犯，望见谅！
