---
title: 读Vue源码 | 黄轶
---
![](https://i.loli.net/2019/12/13/Ho5bIAyUklwhiaC.png)

## 核心

1. 准备工作, flow 目录结构 源码构建
2. 数据驱动: 数据 -> Dom 创建完整流程
3. 组件化: 组件创建 组件相关核心概念
4. 响应式原理: 完整讲述响应式实现原理

## 编译

1. parse: 模板 -> AST 树
2. optimize: 优化 AST 树

## 拓展

1. event & v-model: 事件和 v-model 的实现原理
2. slot & keep-alive 内置组件的实现原理
3. transition: 过渡的实现原理

## 生态

1. Vue-router: 官方路由实现原理
2. Vuex: 官方状态管理实现原理

## 准备工作

flow 是一个静态类型检查工具.
类型检查通常分为

1. 类型推断, 写代码后让 flow 推断
2. 类型注释, 写代码时告诉 flow

vue 源码结构设计.
编译相关的代码都在 compiler

Vue.js 源码基于 rollup 构建.
