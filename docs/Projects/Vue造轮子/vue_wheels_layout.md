---
title: Vue造轮子之container组件
---
根据我们惯常的开发经验，传统常见的布局方式有以下四种，当然也还有诸如现在常见于咨询类网站的两侧固定中间无限加载式的布局方式。

但在实际开发过程中，不知道各位，栅格系统还好一点，想偷个懒可能就用了，但UI库中的布局组件我其实是比较少用的。

![](https://i.loli.net/2020/09/21/O9yusJmHk5gXthS.png)

```vue
<!--1. 自上而下，头部，中间内容，底部。-->
<w-layout>
  <w-header></w-header>
  <w-content></w-content>
  <w-footer></w-footer>
</w-layout>

<!--2. 自上而下，头部，中间内容和侧边栏，底部-->
<w-layout>
  <w-header></w-header>
  <w-layout>
      <w-sider></w-sider>
      <w-content></w-content>
  </w-layout>
  <w-footer></w-footer>
</w-layout>

<!--3. 自上而下，头部，侧边栏中间内容，底部-->
<w-layout>
  <w-header></w-header>
  <w-layout>
      <w-content></w-content>
      <w-sider></w-sider>
  </w-layout>
  <w-footer></w-footer>
</w-layout>

<!--4. 自左而右，侧边栏，中间主体，包括头部、中间内容和底部-->
<w-layout>
  <w-sider></w-sider>
  <w-layout>
      <w-header></w-header>
      <w-content></w-content>
      <w-footer></w-footer>
  </w-layout>
</w-layout>
```

layout组件在实现中唯一值得一提的点是，如何实现layout组件内部元素，在没有`aside`组件时正常垂直呈现，在有`aside`组件时以水平方向呈现。

目前的解决方案是：在layout组件mounted钩子中判断其组件是否包含aside组件，如果存在则为当前layout组件添加`flex-direction: row`样式。

