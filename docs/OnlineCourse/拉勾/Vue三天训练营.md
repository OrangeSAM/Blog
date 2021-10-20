---
title: 拉勾vue.js训练营
---

## 虚拟dom
创建真实dom内存开销大，性能成本高；virtual dom 够简单，属性少，以至于成本小，本质上就是一个js对象，

- 为什么使用virtual dom
 - 手动操作dom 麻烦，还需考虑浏览器兼容性问题，即便有库简化dom操作，但随着项目复杂，dom操作也随之更复杂
 - 为了简化dom的复杂操作，出现了各种mvvm矿建，这些框架解决了视图和状态同步的问题，
 - 为了简化视图操作，可以使用模板引擎，但是模板引擎没有解决跟踪状态变化的问题，于是virtual dom出现了，这句和上句没看懂。
 - virtual dom 的好处是当状态改变的时候不需要立即更新dom，只需要创建一个虚拟树来描述dom，virtual dom 内部将弄清楚如何有效更新dom
 - 简单来说，把开发人员手动更新dom 这件事交给了virtual dom，virtual dom 能做更棒
 - 棒在，可以维护程序的状态，跟踪上一次状态；还可以通过比较前后两次状态的差异更新真是dom


虚拟dom 能够实现
- 真实dom
- ssr
- 原生应用
- 小程序

snabbdom
   - vue 2.x 改造此而来
   - 200 sloc
   - 通过模块可拓展
   - 源码使用ts开发
   - 最快的virtual dom之一
virtual-dom

源码解析
### 如何学习源码
- 先宏观了解
- 带着目标看源码
- 看源码的过程要不求甚解
- 调试
- 参考资料

### snabbdom 的 核心流程
- 使用h()函数创建JavaScript对象（vnode）描述真实dom
- inits()设置模块，创建patch()
- patch()比较新旧两个vnode
- 把变化的内容更新到真实dom树上

snabbdom的h函数用来创建vnode

patch函数
- patch(oldVnode, newVnode)
- 打补丁，把新节点中变化的内容渲染到真实dom，最后返回新节点作为下一次处理的旧节点
- 对比新旧vnode是否相同节点（节点的key和sel相同）
- 如果不是相同节点，删除之前的内容，重新渲染
- 如果是相同节点，再判断新的vnode是否有text，如果有并且和oldvnode的text不同，直接更新文本内容
- 如果新的vnode有children，判断子节点是否有变化，判断子节点的过程使用的就是diff算法
- diff过程只进行同层级比较

init 函数
