### 有关造轮子

#### 造轮子的原因

由程序员要经历的几个阶段来看，

1. 自学基础(实习)
2. 在别人的指导下工作
3. 独立完成工作
4. 别人能够复用自己写的代码
5. 有一套完整的编程方法论和代码仓库

造轮子其实这里面的第四步，算是程序员进阶路上绕不开的槛。

#### 造轮子的益处

1. 系统而有效地提升编码水平
2. 让能力不止于解决问题，更在于分析问题，更像是在做一款产品
3. 提升自身影响力，在社区能混个"脸熟"

#### 工具

1. 配色 [adobe color](https://color.adobe.com/zh/create/color-wheel/)	[colorhunt](https://colorhunt.co)	[material palette](https://www.materialpalette.com)
2. 原型设计 [Adobe XD](https://www.adobe.com/cn/products/xd.html)	[墨刀](https://modao.cc)

### 给前端的知识粗略分个类

- 工具 `scss webpack parcel vuecli babel`

- 语言特性 `promise css 选择器 html 语义化 框架 语言也分框架和原生`

- 抽象 `代码组织 流程化 设计模式 前端工程化`

#### 其他知识

有关开源许可证，查看阮一峰文章。

Npm i -D parcel-bundler 加 D 的原因是给开发者用。

建仓库遇到的问题

在 GitHub 上新建一个仓库并包含诸如 licsence 或者 readme 等文件时，如何与本地已有 git 仓库融合。

- 前端学习不要妄图掌握所有知识点，即不要有执念
- 梳理做每个组件需要考虑的东西

#### button 组件

实现 icon 位置的骚操作，
`<button class="w-button" :class="{'left': true}">`

css 竟然有变量了，了解详情及如何使用。

在 iconfont 网站可以对图标进行简单的编辑，比如左箭头，可以变成下箭头和上箭头 右箭头。

使用属性检查器来避免用户传入没用或者造成异常的 props。

匿名插槽，就是不管你在组件里插啥，我都给你显示。

如果有重复代码，那么就应该视情况抽离为组件使用。

常用组件全局引入，不常用组件局部引入。

#### 单元测试
BDD behavior driven develop
TDD test driven develop 

console.assert() 如果断言为false，则将一个错误消息写入控制台，如果断言为true， 没有任何反应。

 // parcel去打包test目录下的所有一级文件，不要缓存， 不要最小化，启动 karma, 只允许一次
    "test": "parcel build test/* --no-cache --no-minify && karma start --single-run"

windows中运行这句话，需要开两个bash窗口，分别同时运行这两句命令
"dev-test": "parcel watch test/* --no-cache & karma start",

> 将 dev-test 对应的命令 parcel watch test/* --no-cache & karma start 分别运行，运行方式如下
新开一个 Git Bash 窗口运行 npx parcel watch test/* --no-cache
再开一个 Git Bash 窗口运行 npx karma start

持续集成
- 持续集成
- 持续交付
- 持续部署

#### 开发时遇到的一些有意思的bug
Node.js 默认入口是index.js，但是如果有index.js文件，而且不是一个有效的入口，那么项目启动就会有问题，而parcel也没有提示这个问题。
所以需要在npx parcel后手动加上index.html，因为我们的入口是index.html.

#### input组件
组件中的name可写可不写？写了能在vue开发者工具中看到对应的标签名。

vue采用HTML语法，即不允许自闭合，所以当自己编写input组件时， 使用`<w-input />`会出现bug。

#### 网格系统
网格系统解决的是横向布局的问题。 

git branch  新建分支 多元宇宙。

vue的一些规则，不能在template里面些style代码

使用flex布局时，即使其中的规定了宽度占50%，且有三个子项。这样在父级没有规flex-wrap为wrap时，子项只是压缩每个的宽度而不会换行。如果要让子项换行，可以在父级设置flex-wrap 为wrap。如果要子项不换行还不压缩，使用flex-shrink: no。

先声明空数组并log, 此时无论从内外看，数组都为空。再往数组里push内容，此时再去看log内容会发现，内部不为空，而外部看依然为空。
也就是时间差的问题，log的那一刻并没有值，而是后面添加的。

重写，大调整。
重构，持续地对代码进行微小的调整以使得代码变得更好。

栅格组件就是工程师与设计师妥协以及提高效率的产物。

UI库的历史
UI BootStrap Material

自适应 和 响应式的差别