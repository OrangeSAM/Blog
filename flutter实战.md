## 起步

### 移动开发技术简介

三种跨平台技术

1. H5+原生（Cordova、Ionic、微信小程序）
2. JavaScript 开发+原生渲染 （React Native、Weex、快应用）
3. 自绘 UI+原生(QT for mobile、Flutter)

hybrid 技术
H5+ 原生混合开发

- 通过诸如 Webview 的原生网页加载控件来加载 App 中的动态变动内容。我们称这种 h5+原生的开发模式为混合开发 ，采用混合模式开发的 APP 我们称之为混合应用或 Hybrid APP ，如果一个应用的大多数功能都是 H5 实现的话，我们称其为 Web APP 。
- 把依赖于 WebView 的用于在 JavaScript 与原生之间通信并实现了某种消息传输协议的工具称之为 WebView JavaScript Bridge, 简称 **JsBridge**，它也是混合开发框架的核心。

React Native

- RN 中的虚拟 DOM 会通过 JavaScriptCore 映射为原生控件树。

Weex

快应用

- 原生 JS 开发

自绘 UI ＋原生
注意，自绘引擎解决的是 UI 的跨平台问题，如果涉及其它系统能力调用，依然要涉及原生开发。

### 初识 Flutter

flutter 使用 skia 作为他的 2D 渲染引擎.

目前,程序主要有两中国运行方式, 静态编译 和 动态解释.静态编译的程序在执行前全部被翻译为机器码，通常将这种类型称为 AOT （Ahead of time）即 “提前编译”(C C++)；而解释执行的则是一句一句边翻译边运行，通常将这种类型称为 JIT（Just-in-time）即“即时编译”(JS python)。

### Dart 语言简介(面向对象 动态类型)

#### 变量声明

- 一旦复制, 类型即确定且不可改变.
- object 是 dart 所有对象的根基类, 即所有类型都是 object 的字类,包括 function 和 null, 所以任何类型的数据都可以复制给 object 声明的对象.
- dynamic 与 var 一样都是关键词,声明的变量可以赋值任意对象。 而 dynamic 与 Object 相同之处在于,他们声明的变量可以在后期改变赋值类型。
- dynamic 与 Object 不同的是,dynamic 声明的对象编译器会提供所有可能的组合, 而 Object 声明的对象只能使用 Object 的属性与方法, 否则编译器会报错。
- final & const
  声明一个值不会变的变量, 使用 final 或 const. 一个 final 变量只能被设置一次，两者区别在于：const 变量是一个编译时常量，final 变量在第一次使用时被初始化。

#### 函数

1. 函数是对象, 类型为 function,
2. 函数可以赋值给变量
3. 可以作为参数传递给其他函数.
4. 函数声明需要声明返回值类型, 不声明默认为 dynamic, 且没有类型推断
5. 支持箭头函数
6. 可选的位置参数, 用[]标记
7. 可选的命名参数, 用{}标记

#### 异步支持

future, 可理解为 JS 的 promise, 表示一个异步操作的最终状态标识.

## 第一个 flutter 应用

### 计数器示例
- Flutter在构建页面时，会调用组件的build方法，widget的主要工作是提供一个build()方法来描述如何构建UI界面（通常是通过组合、拼装其它基础widget）。
- home为flutter应用的首页，它也是一个widget。
- MaterialApp 是Material库中提供的Flutter APP框架，通过它可以设置应用的名称、主题、语言、首页及路由列表等。MaterialApp也是一个widget。
- StatefulWidget类 表示他是一个有状态的组件，即可以拥有状态，且这些状态在widget生命周期中是可以变得。
- Stateful widget至少有两个类组成
  - 一个StatefulWidget 类
  - 一个State类，StatefulWidget 类本身是不变的，但是state类中持有的状态在widget生命周期中可能发生变化。
  - scaffold是material库中提供的页面脚手架，他提供了默认的导航栏、标题和包含主屏幕widget树的body属性。

### 路由管理
- 路由在移动开发中通常指页面，这跟web开发中单页应用的Router概念意义是相同的。
- MaterialPageRoute继承自PageRoute类，PageRoute类是一个抽象类，表示占有整个屏幕空间的一个模态路由页面，它还定义了路由构建及切换时过渡动画的相关接口及属性。
- Navigator是一个路由管理的组件，他提供了打开和退出路由页的方法。通过一个栈来管理活动路由集合。通常当前屏幕显示的页面就是栈顶的路由。
  - future push (BuildContext, Route route)
    - 将给定的路由入栈，返回值是一个future对象，用以接手新路由出栈（关闭）时的返回数据。
  - bool pop(BuildContext context, [result])
    - 将栈顶路由出栈，result为页面关闭时返回给上一个页面的数据。