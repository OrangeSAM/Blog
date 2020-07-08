---
title: 虚拟DOM
---
## from 拉勾
为什么需要虚拟DOM，直接创建DOM的成本太大了。

虚拟DOM 就是一个JavaScript对象。
为什么使用virtual DOM
手动操作DOM比较麻烦，还需要考虑浏览器兼容性问题，虽然有jQuery等库简化DOMæ作，但是随着项目的复杂DOM操作复杂提升
- 为了简化DOM的复杂操作于是出现了各种MVVM框架，MVVM框架解决了视图和状态的同步问题
- 为了简化视图的操作我们可以使模板引擎，但是模板引擎没有解决跟踪状态变化的问题，于是VirtualDOM出现了
- VirtualDOM的好处是当状态改变时不需要立即更新DOM，只需要创建一个虚拟树来描述DOM,VirtualDOM内部将弄清楚如何有效（diff）的的更新DOM

参考github上virtual-dom的描述
- 虚拟DOM可以维护程序的状态，跟踪上一次的状态
- 通过比较前后两次状态的差异更新真实DOM

虚拟DOM的作用
- 维护视图和状态的关系
- 复杂视图情况下提升渲染性能
- 除了渲染DOM以外，还可以实现SSR(next.js nuxt.js)、原生应用（Weex / React Native）、小程序（mpvue/uni-app）等

virtual dom库
- snabbdom
- virtual-dom