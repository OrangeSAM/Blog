---
title: VueRouter懒加载在打包中的效果
---

> 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
> 结合 Vue 的异步组件 (opens new window)和 Webpack 的代码分割功能 (opens new window)，轻松实现路由组件的懒加载。

在Vue Router文档中看到上述 [描述](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html) ，好奇具体效果是怎样的，以下是验证的内容。

在后续描述中

我们称如下为**按需**
```vue
component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
```
称如下为**预先**
```vue
import Home from '../views/Home.vue'
{
    path: '/',
    name: 'Home',
    component: Home,
},
```

验证之后，我遇到了与文档描述相左的结果，文档描述说，使用我们称为预先的写法就能达到按需的效果，但实际上并非如此。当然，也有可能是我对文档的描述有误。

在实验中，我通过四个不同的case验证代码效果。在模板代码中，存在home和about两个路由，实验中使用此模板代码。

1. 都使用按需
2. 都使用预先
3. home使用预先，about使用按需
4. home使用按需，about使用预先

在呈上四个case的效果之前，我们先来看一些共性的东西。

在最简单（vue-cli初始化项目的默认配置）的vue-cli打包结果中，在`<head>`标签中，会有对后续即将加载的文件进行预处理的逻辑，此处以**home预先about按需**情况为例。

```html
<link href="/js/about.c2621545.js" rel="prefetch">
<link href="/css/app.5154eb61.css" rel="preload" as="style">
<link href="/js/app.141babc3.js" rel="preload" as="script">
<link href="/js/chunk-vendors.52cb3d10.js" rel="preload" as="script">
<link href="/css/app.5154eb61.css" rel="stylesheet">
```
以上就是vue-cli打包后，塞在模板中head标签的内容。

```html
<script src="/js/chunk-vendors.52cb3d10.js"></script>
<script src="/js/app.141babc3.js"></script>
```
而上述是vue-cli打包后，塞在模板里body标签的内容。

通过观察，我们可以发现，打包后的内容link标签里既有`prefetch`的值，也有`preload`的值，二者的区别这里不展开聊，
具体可以点击 [这里](https://stackoverflow.com/questions/52764401/what-are-the-differences-between-html-preload-and-prefetch) ，
简单来说就是preload优先级较prefetch更高，preload用于必定需要的资源，prefetch用于可能需要的资源。

在上述代码中，`about.js`是另外的路由，访问默认路由的时候，并不会用到，所以这里是使用prefetch。

而后面的`app.js`、`chunk-vendors.js`、`app.css`都是会在当前页面用到，所以使用preload。

我们再来各个情况的表现。

1. 都使用按需
- ![](https://s2.loli.net/2021/12/19/SjMln5czRYmaFLy.png)
- 访问home路由时
  - 会产生对home路由js和css文件的prefetch请求，
  - 会产生对about路由js文件的prefetch请求
  - 会产生对app.js文件及app.css文件的preload和真实请求
  - 会产生对chunk-vendors.js文件的真实请求（按理应该还有preload请求，但是network一栏并未体现
- 访问about路由时
  - 会产生对about路由js文件css文件的真实请求

2. 都使用预先
- ![](https://s2.loli.net/2021/12/19/XdIOyS435pBHjZ6.png)
- 访问home路由时
  - 不会产生任何对页面路由js文件的单独请求
  - 会产生对app.js文件及app.css文件的preload和真实请求
  - 会产生对chunk-vendors.js文件的真是请求（按理应该还有preload请求，但是network一栏并未体现
- 访问about路由时
  - 不会产生对about路由的js及css文件请求

3. home预先about按需
- ![](https://s2.loli.net/2021/12/19/qHLxBRitNs2CkJA.png)
- 访问home路由时
  - 不会产生对home路由js和css文件的单独请求
  - 会产生对about路由js文件的单独prefetch请求
  - 会产生对app.js文件及app.css文件的prefetch和真是请求
  - 会产生对chunk-vendors.js文件的单独请求（按理应该还有preload请求，但是network一栏并未体现
- 访问about路由时
  - 会产生对about路由js文件的真实请求

4. home按需about预先
- ![](https://s2.loli.net/2021/12/19/PHWQTDOkwL8xsIr.png)
- 访问home路由时
  - 会产生对home路由js文件及css文件的prefetch请求和真实请求
  - 会产生对app.js文件和app.css文件的preload请求和真实请求
  - 会产生对chunk-vendors.js文件的单独请求（按理应该还有preload请求，但是network一栏并未体现
- 访问about路由时
  - 不会产生对about路由js文件css文件的真实请求

从以上四个case，我们可以得出对于页面加载速度优化的一点结论，**页面作为默认路由的时候，没有必要为此路由实现按需效果**，因为单独分包的目的在于减少首次请求加载的压力，
而默认路由是一定会出现在首次请求中的，所以没有必要多这一个请求，而是合并在app.js文件就够了。

