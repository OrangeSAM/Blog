---
title: VuePress搭建博客
---
## 侧边栏设置
### 数组形式
以如下代码为例，`sidebar`为一个对象数组，一个对象即一个可收缩的侧边栏分组，我们把用对象的形式分割开各路由称为**侧边栏分组**，
这样的侧边栏默认出现在几乎所有页面。路由配置不限制markdown文件目录，可随意配置有效的文件路径。甚至，你还可以往数组中添加不分组单独存在的文件路径，
```js
let sidebar = [ 
  {
    title: "浏览器",
    collapsable: true,
    sidebarDepth: 2,
    children: [
      "/Browser/character_byte_chinese",
      "/Browser/how_browser_works",
      "/Browser/url_to_display",
    ]
  },
  "/Browser/how_browser_works",
]
```
### 对象形式
这种形式跟上面一种刚好相反，主要由数组构成了对象的value，如下代码所示。`/brower/`意味着这是一个单独的侧边栏，这样就可以实现为不同的页面组
显示不同的侧边栏。同样，你也可以直接在数组中写markdown文件的路径，而不用分组的形式。
```javascript
let sidebar = {
  "/browser/": [
    "/Browser/url_to_display",
    {
      title: "浏览器",
      sidebarDepth: 2,
      children: [
        "/Browser/url_to_display",
      ]
    }
  ]
}
```