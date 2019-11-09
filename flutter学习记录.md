一些疑惑

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

一些要点

- flutter 一切皆组件！
- Navigator.push 跳转到下一个页面，接手两个参数，上下文 context 和 要跳转的函数
- Navigator.pop 返回到上一个页面
- MaterialPageRoute 传递路由参数

有哪些组件

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
