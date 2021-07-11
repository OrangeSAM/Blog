---
title: Vue.js全家桶及源码剖析
---

## 1. Vue全家桶原理和实现

### 问题
1. Vue.use到底做了什么
2. 为什么要把router的实例挂载到Vue实例的选项中
3. 为什么要加上router-view
4. 为什么可以直接用router-link和router-view

### Vue-Router需求分析
单页面应用程序中，url发生变化时候，不能刷新，显示对应视图内容

1. SPA页面不能刷新
    - hash （#/about
    - history （api /about
    
2. 根据url显示对应的内容
    - router-view
    - 数据响应式：current变量持有url地址，一旦变化，动态重新执行render

### 思路
1. 实现一个插件
    - 实现VueRouter类
        - 处理路由选项
        - 监控url变化，hashchange
        - 响应这个变化
    - 实现install方法
        - $router注册
        - 两个全局组件

### 笔记
1. this.$options 获得当前组件的选项配置
2. h 函数是什么，
    - h是render函数调用是，框架传入的createElement
    - 等同于react中createElement，返回vdom
    - 再多研究下
3. 什么是jsx
4. Vue.util. defineReactive() 
5. 再研究下Object.defineProperty
6. vue插件的核心
    - 提供一个名为install的方法
    - Vue.use的时候会调用这个方法
    - （所以可以理解我们在用组件库的时候，Vue.use其实就是全局注册了那个组件罢了，当然，install远不止可以做组件注册的事。）
    - 来自官方文档：安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。
      如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
      该方法需要在调用 new Vue() 之前被调用。
    - Vue.use 中的Vue是一个构造函数，而不是一个实例
7. new Vue({
     router,
     store,
     render: h => h(App)
   }).$mount('#app')
   router只能在根实例中拿到
8. Vue.Component的参数及用法
    - 参数：
        - {string} id
        - {Function | Object} [definition]
    - 用法：
        - 注册或获取全局组件。注册还会自动使用给定的 id 设置组件的名称
        - // 注册组件，传入一个扩展过的构造器
        - Vue.component('my-component', Vue.extend({ /* ... */ }))
        - // 注册组件，传入一个选项对象 (自动调用 Vue.extend)
        - Vue.component('my-component', { /* ... */ }) // 常用
        - // 获取注册的组件 (始终返回构造器)
        - var MyComponent = Vue.component('my-component')
    我们注册组件的常用无非如下两种，但实际都是借助component实现的，区别在于手动和自动
    - Vue.use(SForm)
    - Vue.component('SForm', SForm)
9. ![](https://i.loli.net/2021/07/10/AJlxji5vCV9EOFH.png)
    从如上图可以看出，只有根实例的options中才有传入的VueRouter实例，但是每个组件都能直接获取到VueRouter
    但又感到迷惑的是，每个子组件上都直接的拥有$router属性，本以为是挂载Vue的原型上，顺着原型链去获取使用的，#迷惑

### 作业
1. 解决router无线循环的问题



2. 实现getters

*写第一课作业实现getters遇到的问题*
1. getters本质上就是用户给我们一个函数的实现，当用户在使用这个函数的时候，通过运算这个函数为用户返回一个确认的值。
2. 像commit那样处理getters的话，为啥getters没反应（更新，因为getters不是函数）
3. 后面又觉得应该像state那样处理getters，但是get方法不能拿到参数
4.   
```javascript
get state() {
   // 我想为这个getters bind 到当前state上，但是我不知道他的getters是啥
   return this._vm._data.$$state
}
```

最开始我是没有很明确的思路，看到state、commit和dispatch的实现就想着先照着抄。但实际上后面就陷阱里头了。
现在醒悟过来分析一看，state的实现思路是一类，commit和dispatch的实现思路又是一类。state只需要实现获取就好了，后两个是需要实现方法。
但这两者的思路，getters都套用不上。

*错误思路一*，这个思路没用的原因是getters点出来的东西不是个函数，他是一个直接取的动作。所以如下的方法不会被触发。有点牛头不对马嘴的感觉。
```javascript
  getters(value) {
    // 拿到的value，应该是用户想要用的getters，比如这里的doubleCounter
    const getter = this._getters(value)
    if (!getter) {
      console.error('unknown getters')
      return
    }
    getter(this.state)
  }
```
*错误思路二*，这个思路是完全走到了死胡同。问题在于，get不知道当前用户点的是啥。
```javascript
get getters() {
  // 我想为这个getters bind 到当前state上，但是我不知道他的getters是啥
  console.log(this._vm._data.$$getters)
  return this._vm._data.$$getters
}
  
set getters(v) {
    console.error('222')
}
```


---

## 2. 手写Vue

数据响应式原理
Object.defineProperty()
Vue.util.defineReactive()
Vue.observable()
new Vue({
    data(){}
})

1. MVVM框架的三要素：数据响应式、模板引擎及其渲染
 
依赖收集  


## Vue2源码剖析01
```markdown

.
|-vue
  |-.circleci
  |-.git
  |  |-hooks
  |  |-info
  |  |-logs
  |  |  |-refs
  |  |  |  |-heads
  |  |  |  |-remotes
  |  |  |  |  |-origin
  |  |-objects
  |  |  |-info
  |  |  |-pack
  |  |-refs
  |  |  |-heads
  |  |  |-remotes
  |  |  |  |-origin
  |  |  |-tags
  |-.github
  |  |-ISSUE_TEMPLATE
  |-.idea
  |  |-inspectionProfiles
  |-benchmarks
  |  |-big-table
  |  |-dbmon
  |  |  |-lib
  |  |-reorder-list
  |  |-ssr
  |  |-svg
  |  |-uptime
  |-dist
  |-examples // 范例
  |  |-commits
  |  |-elastic-header
  |  |-firebase
  |  |-grid
  |  |-markdown
  |  |-modal
  |  |-move-animations
  |  |-select2
  |  |-svg
  |  |-todomvc
  |  |-tree
  |-flow
  |-packages // 核心代码之外的独立库
  |  |-vue-server-renderer
  |  |  |-types
  |  |-vue-template-compiler
  |  |  |-types
  |  |-weex-template-compiler
  |  |-weex-vue-framework
  |-scripts
  |  |-git-hooks
  |-src
  |  |-compiler // 编译器相关
  |  |  |-codegen
  |  |  |-directives
  |  |  |-parser
  |  |-core // 核心代码，重要
  |  |  |-components // 通用组件如keep-alive
  |  |  |-global-api // 全局api
  |  |  |-instance // 构造函数
  |  |  |  |-render-helpers 
  |  |  |-observer // 响应式相关
  |  |  |-util
  |  |  |-vdom // 虚拟dom
  |  |  |  |-helpers
  |  |  |  |-modules
  |  |-platforms
  |  |  |-web
  |  |  |  |-compiler
  |  |  |  |  |-directives
  |  |  |  |  |-modules
  |  |  |  |-runtime
  |  |  |  |  |-components
  |  |  |  |  |-directives
  |  |  |  |  |-modules
  |  |  |  |-server
  |  |  |  |  |-directives
  |  |  |  |  |-modules
  |  |  |  |-util
  |  |  |-weex
  |  |-server
  |  |  |-bundle-renderer
  |  |  |-optimizing-compiler
  |  |  |-template-renderer
  |  |  |-webpack-plugin
  |  |-sfc
  |  |-shared
  |-test
  |  |-e2e
  |  |  |-specs
  |  |-helpers
  |  |-ssr
  |  |  |-fixtures
  |  |-unit
  |  |  |-features
  |  |  |  |-component
  |  |  |  |-directives
  |  |  |  |-filter
  |  |  |  |-global-api
  |  |  |  |-instance
  |  |  |  |-options
  |  |  |  |-transition
  |  |  |-modules
  |  |  |  |-compiler
  |  |  |  |-observer
  |  |  |  |-server-compiler
  |  |  |  |-sfc
  |  |  |  |-util
  |  |  |  |-vdom
  |  |  |  |  |-modules
  |  |  |  |  |-patch
  |  |-weex
  |  |  |-cases
  |  |  |  |-event
  |  |  |  |-recycle-list
  |  |  |  |  |-components
  |  |  |  |-render
  |  |  |-compiler
  |  |  |-helpers
  |  |  |-runtime
  |  |  |  |-components
  |-types
  |  |-test

```

运行时和编译器又是啥

浏览器快捷键
打开文件 ctrl + p
运行命令 ctrl + shift + p
D:\Repo\openSource\famous\vue\src\platforms\web\entry-runtime-with-compiler.js // 打包入口文件
render > template > el

## Vue2源码剖析02

## Vue2源码剖析03
