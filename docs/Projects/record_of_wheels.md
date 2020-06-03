---
title: 造轮子记录
---
[[toc]]


## 造轮子的原因

::: details 点击查看代码
```js{1}
console.log('你好，VuePress！')
```
:::

{{1 + 1}}
{{this.$page.lastUpdated}}
由程序员要经历的几个阶段来看，

1. 自学基础(实习)
2. 在别人的指导下工作
3. 独立完成工作
4. 别人能够复用自己写的代码
5. 有一套完整的编程方法论和代码仓库

造轮子其实这里面的第四步，算是程序员进阶路上绕不开的槛。

## 造轮子的益处

1. 系统而有效地提升编码水平
2. 让能力不止于解决问题，更在于分析问题，更像是在做一款产品
3. 提升自身影响力，在社区能混个"脸熟"

## 工具

1. 配色 [adobe color](https://color.adobe.com/zh/create/color-wheel/) [colorhunt](https://colorhunt.co) [material palette](https://www.materialpalette.com)
2. 原型设计 [Adobe XD](https://www.adobe.com/cn/products/xd.html) [墨刀](https://modao.cc)

## 给前端的知识粗略分个类

- 工具 `scss webpack parcel vuecli babel`

- 语言特性 `promise css 选择器 html 语义化 框架 语言也分框架和原生`

- 抽象 `代码组织 流程化 设计模式 前端工程化`

## 其他知识

有关开源许可证，查看阮一峰文章。

Npm i -D parcel-bundler 加 D 的原因是给开发者用。

建仓库遇到的问题

在 GitHub 上新建一个仓库并包含诸如 licsence 或者 readme 等文件时，如何与本地已有 git 仓库融合。

- 前端学习不要妄图掌握所有知识点，即不要有执念
- 梳理做每个组件需要考虑的东西


## 单元测试

BDD behavior driven develop
TDD test driven develop

console.assert() 如果断言为 false，则将一个错误消息写入控制台，如果断言为 true， 没有任何反应。

// parcel 去打包 test 目录下的所有一级文件，不要缓存， 不要最小化，启动 karma, 只允许一次
"test": "parcel build test/\* --no-cache --no-minify && karma start --single-run"

windows 中运行这句话，需要开两个 bash 窗口，分别同时运行这两句命令
"dev-test": "parcel watch test/\* --no-cache & karma start",

> 将 dev-test 对应的命令 parcel watch test/_ --no-cache & karma start 分别运行，运行方式如下
> 新开一个 Git Bash 窗口运行 npx parcel watch test/_ --no-cache
> 再开一个 Git Bash 窗口运行 npx karma start

持续集成

- 持续集成
- 持续交付
- 持续部署

## 开发时遇到的一些有意思的 bug

Node.js 默认入口是 index.js，但是如果有 index.js 文件，而且不是一个有效的入口，那么项目启动就会有问题，而 parcel 也没有提示这个问题。
所以需要在 npx parcel 后手动加上 index.html，因为我们的入口是 index.html.

项目中使用CSS变量了，具体使用如下
```
<!-- 声明 -->
 --main-color: lightGray
<!-- 使用 -->
 var(--main-color)
```

## input 组件

组件中的 name 可写可不写？写了能在 vue 开发者工具中看到对应的标签名。

vue 采用 HTML 语法，即不允许自闭合，所以当自己编写 input 组件时， 使用`<w-input />`会出现 bug。

## 网格系统

网格系统解决的是横向布局的问题。

git branch 新建分支 多元宇宙。

vue 的一些规则，不能在 template 里面些 style 代码

使用 flex 布局时，即使其中的规定了宽度占 50%，且有三个子项。这样在父级没有规 flex-wrap 为 wrap 时，子项只是压缩每个的宽度而不会换行。如果要让子项换行，可以在父级设置 flex-wrap 为 wrap。如果要子项不换行还不压缩，使用 flex-shrink: no。

先声明空数组并 log, 此时无论从内外看，数组都为空。再往数组里 push 内容，此时再去看 log 内容会发现，内部不为空，而外部看依然为空。
也就是时间差的问题，log 的那一刻并没有值，而是后面添加的。

重写，大调整。
重构，持续地对代码进行微小的调整以使得代码变得更好。

栅格组件就是工程师与设计师妥协以及提高效率的产物。

UI 库的历史
UI BootStrap Material

自适应 和 响应式的差别

对于 gutter 的实现，element 是通过 this.\$parent 获取父级的 gutter, 但这里就存在一个问题，实际使用中是不是用户一定会 el-col 写为 el-row 的直接子元素呢，也不一定。所以黄轶说用 provide 和 inject 实现。

## toast 组件

用例

- 弹出 toast
  - 自动关闭
    - N 秒
  - 点击后关闭
  - 关闭的回调
- 弹出第二个
  - 保证只有一个 toast
  - 允许多个 toast
