---
title: Vue造轮子之input组件
---


组件中的 name 可写可不写？写了能在 vue 开发者工具中看到对应的标签名。

vue 采用 HTML 语法，即不允许自闭合，所以当自己编写 input 组件时， 使用`<w-input />`会出现 bug。