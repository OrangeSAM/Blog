---
title: Vue.js全家桶及源码剖析
---

## 1. Vue全家桶原理和实现

### 问题
1. Vue.use到底做了什么
   1. 目的是安装Vue插件
   2. 会将Vue作为参数传入插件的install方法(如果插件是个函数，那么他就是install方法本身)
   3. Vue.use的核心方法在`src/core/global-api/use.js`下
      1. 总计不到20行，核心逻辑如下
      2. 获取已安装的插件数组，如果存在则直接返回this
      3. 不存在则执行插件的install方法
2. 为什么要把router的实例挂载到Vue实例的选项中
   1. 
3. 为什么要加上router-view
4. 为什么可以直接用router-link和router-view

### 官方文档中的插件
```markdown
Vue.use( plugin )
参数：

{Object | Function} plugin
用法：

安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

该方法需要在调用 new Vue() 之前被调用。

当 install 方法被同一个插件多次调用，插件将只会被安装一次。
```
```markdown
Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
```
```javascript
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

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
    - 从Vue源码中可以发现，Use函数的参数应该是函数或者对象
      - export function initUse (Vue: GlobalAPI) {
          Vue.use = function (plugin: Function | Object) {}
        }
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
10.Vue生态内实现数据响应式的两个方案，vue.util.defineReactive && new Vue({})

### 疑惑
1. 在视频59‘左右说到，在实现router-view的时候不能直接写模板，因为我们cli环境下，用的是runtime版本的vue。
疑惑在于，我们写业务代码不是写了很多模板吗，为什么就可以呢。临时贴图如下。
![](https://s2.loli.net/2021/12/19/tbBgV2ZFaixD6jI.png)

重看到1.30分


### 作业
1. 解决router无限循环的问题



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
更新dom的两种策略
1. 一块视图对应一个updater，数据更新，对应的视图就会被更新
2. 使用虚拟dom，更新视图的事交给patch去解决 // patch(oldvdom, vdom)
数据响应式原理
Object.defineProperty()
Vue.util.defineReactive()
Vue.observable()
new Vue({
    data(){}
})

1. MVVM框架的三要素：数据响应式、模板引擎及其渲染
 
依赖收集  


## 3. Vue2源码剖析01
```markdown

.
|-vue
  |-.circleci
  |-.git
  |-.github
  |-.idea
  |-benchmarks
  |-dist
  |-examples // 范例
  |-flow
  |-packages // 核心代码之外的独立库
  |  |-vue-server-renderer
  |  |  |-types
  |  |-vue-template-compiler
  |  |  |-types
  |  |-weex-template-compiler
  |  |-weex-vue-framework
  |-scripts // 构建脚本
  |  |-git-hooks
  |-src // 源码
  |  |-compiler // 编译器相关
  |  |  |-codegen
  |  |  |-directives
  |  |  |-parser
  |  |-core // 核心代码，重要
  |  |  |-components // 通用组件如keep-alive
  |  |  |-global-api // 全局api Vue.component
  |  |  |-instance // 构造函数
  |  |  |-observer // 响应式相关
  |  |  |-util
  |  |  |-vdom // 虚拟dom
  |  |-platforms
  |  |  |-web
  |  |  |  |-compiler
  |  |  |  |-runtime
  |  |  |  |-server
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
  |-types // ts 类型声明，上面flow是针对flow的类型声明
  |  |-test

```

运行时和编译器又是啥

|  版本\模块化方式         | UMD       | CommonJS              | ES Module(基于构建工具使用) | ES Module(直接用于浏览器) | 
| ---- | ---- | ---- | ---- | ---- |
|  完整版                 | vue.js              | vue.common.js         | vue.esm.js                | vue.esm.browser.js      |
|  只包含运行时版          | vue.runtime.js      | vue.runtime.common.js | vue.runtime.esm.js        | -                       |
|  完整版(生产环境)        | vue.min.js          | -                     | -                         | vue.esm.browser.min.js  |
|  只包含运行时版(生产环境) | vue.runtime.min.js  | -                     | -                         | -                       |

- *完整版*： 同时包含编译器和运行时的版本
- *编译器*： 用来将模板字符串编译成为JavaScript渲染函数的代码
- *运行时*： 用来创建Vue实例，渲染并处理虚拟DOM等的代码，基本就是除去编译器的其他一切
- *UMD*  ： UMD版本可以通过`<script>`标签直接用在浏览器上
- *CommonJS*：CommonJS版本用来配合老的打包工具比如Browserify 或webpack1，这些打包工具的默认文件pkg.main是只包含运行时的CommonJS版本(Vue.runtime.common.js)
- *ES Module*： 为打包工具提供的ESM(webpack2、Rollup)；为浏览器提供的ESM

1. 为啥webpack打包不需要编译器版本的？21.45


2. 把new vue到页面渲染的全流程写下来，直到页面呈现

3. 各种文件
    - src/platforms/web/entry-runtime-with-compiler.js
        - 打包入口文件，拓展$mount
    - src/platforms/web/runtime/index.js 
        - 安装平台特有patch函数，patch作用是将vdom转换为dom
            - init 完整创建
            - update diff oldvnode & vnode
        - 实现挂载方法
    - src/core/index.js
        - 初始化所有全局API Vue.component/filter
    - src/core/instance/index.js
        - 声明Vue
    - src/core/instance/init.js
        - 初始化Vue
    - src/core/instance/lifecycle.js
        - 挂载
        - updateComponent
        - new Watcher 一个组件一个watcher
        - 执行render获得虚拟dom
        - patch => dom

浏览器快捷键
打开文件 ctrl + p
运行命令 ctrl + shift + p
D:\Repo\openSource\famous\vue\src\platforms\web\entry-runtime-with-compiler.js // 打包入口文件
render > template > el




## Vue2源码剖析02

## Vue2源码剖析03



## 6.Vue组件化实践
slotProps


## Vue2源码剖析03

1. 父子组件的创建挂载
- 创建过程自上而下
- 挂载过程自下而上
- 异步组件另当别论
parent
    created
    child
        created
        mounted
    mounted

