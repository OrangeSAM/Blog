---
title: Flutter学习记录
---
## 一些疑惑

- final string name 中的 name 是什么意思
- @override 之前的代码就是声明的参数？
- return home 和 return scaffold 的差别, 还有 MaterialApp
- 页面一般分两个部分？ appbar 和 body
- flutter 就是以部件（widget）的方式来写代码？
  诸如 Center RaisedButton 这些都是 flutter 这个框架提供的。
- stateless 对应 statsful
- 多个 child 就用 children?
- child 是不是所有 widget 都有的属性
- super 是干嘛用的
- ProductDetail({Key key ,@required this.product}):super(key:key);
  这是在干嘛
- 没有写 pop 也有返回上一级页面的按钮，是 flutter 框架整的？

### 一些要点

- flutter 一切皆组件！
- Navigator.push 跳转到下一个页面，接手两个参数，上下文 context 和 要跳转的函数
- Navigator.pop 返回到上一个页面
- MaterialPageRoute 传递路由参数

### 一些命令

- flutter create 项目名
- flutter run 跑项目
- flutter packages get == npm install
-

### 官方文档中的笔记

- Material 是一种标准的移动端和 web 端的视觉设计语言。 Flutter 提供了一套丰富的 Material widgets。
- main 函数使用了(=>)符号, 这是 Dart 中单行函数或方法的简写。即 JS 中的箭头函数。
- 该应用程序继承了 StatelessWidget，这将会使应用本身也成为一个 widget。 在 Flutter 中，大多数东西都是 widget，包括对齐(alignment)、填充(padding)和布局(layout)。
- Scaffold 是 Material library 中提供的一个 widget, 它提供了默认的导航栏、标题和包含主屏幕 widget 树的 body 属性。widget 树可以很复杂。可以认为是每个页面的骨架。
- widget 的主要工作是提供一个 build() 方法来描述如何根据其他较低级别的 widget 来显示自己.
- Stateless widgets 是不可变的, 这意味着它们的属性不能改变 - 所有的值都是最终的.
- Stateful widgets 持有的状态可能在 widget 生命周期中发生变化. 实现一个 stateful widget 至少需要两个类: 一个 StatefulWidget 类, 一个 State 类。StatefulWidget 类本身是不变的，但是 State 类在 widget 生命周期中始终存在。
- 在 Flutter 的响应式框架柱，调用 setState() 会为 state 对象触发 builde 方法 从而导致对 UI 的更新

* Flutter widget 的中心思想是用 Widget 构建你的 UI。
* Widget 描述了他们的视图在给定其当前配置和状态时应该看起来像什么。当 widget 的状态发生变化时，widget 会重新构建 UI，Flutter 会对比前后变化的不同， 以确定底层渲染树从一个状态转换到下一个状态所需的最小更改。
* 框架强制耿 Widget 覆盖整个屏幕。
* 在编写应用程序时，通常会创建新的 widget，这些 widget 是无状态的 StatelessWidget 或者是有状态的 StatefulWidget， 具体的选择取决于您的 widget 是否需要管理一些状态。widget 的主要工作是实现一个 build 函数，用以构建自身。一个 widget 通常由一些较低级别 widget 组成。Flutter 框架将依次构建这些 widget，直到构建到最底层的子 widget 时，这些最低层的 widget 通常为 RenderObject，它会计算并描述 widget 的几何形状。

-

#### 使用外部包

- 通过 pubspec 文件进行配置, 类似 package.json 文件.
- 下载项目中的用到的包, 点击右上角的 package get,(命令 flutter package get) 类似 npm install
- 在页面中使用, import 'package:'
  类似 npm

  flutter packages get 获取项目所有的依赖包。
  flutter packages upgrade 获取项目所有依赖包的最新版本。

### 有哪些组件

常用的布局 widget
Text Row Column Stack Container

- Text Widget

  - TextAlign
  - maxLines
  - overflow
  - style

- RaisedButton

  - color
  - child
  - onPressed 点击事件的响应
  - onTap

- container

  - alignment 规定容器内子元素对齐方式
  - width
  - height
  - color
  - padding
  - margin
  - decoration 背景和边框

- Image

  - asset
  - network
  - file
  - memory
  - fit
    - BoxFit.fill
    - BoxFit.contain
    - BoxFit.cover
    - BoxFit.fitWidth
    - BoxFit.fitHeight
    - BoxFit.scaleDown
  - colorBlendMode
    - BlendMode.darken
  - repeat
    - ImageRepeat.repeat
    - ImageRepeat.repeatX
    - IamgeRepeat.repeatY

- ListView

  - children
  - scrollDirection 列表展示的方向
    - Axis.horizontal
    - Axis.vertical
  - builder 方法

- ListTile

- GridView

  - crossAxisSpacing
  - mainAxisSpacing
  - crossAxisCount
  - padding
  - childAspectRatio

- Expanded

- Row

- Column
- CrossAxisAlignment

- Stack
- alignment 控制层叠的位置

- Positioned
- circleAvatar
- radius
