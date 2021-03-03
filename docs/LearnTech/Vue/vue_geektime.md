---
title: 唐金洲Vue实战
---

## 基础篇

### 01 课程介绍
略

### 02 Vue 简介
略

### 03 内容综述

> 前三节无重要内容, 篇幅简短, 略过.

### 04 第一个Vue程序

1. 开发版本与生产版本的不同:

   1. 开发版本包含完整的警告和调试模式.
   2. 生产版本删除了警告.

2. 花括号里面支持表达式.

```
// 编写template的方式
<input type="text" name="" id="" v-model="info" />
<button @click="handleClick">添加</button>
<ul>
    <li v-for="(item, index) in items">{{ item }}</li>
</ul>
new Vue({
  el: "#app",
  data() {
    return {
      msg: "hello sam",
      info: "",
      items: []
    };
  },
  methods: {
    handleClick() {
      this.items.push(this.info);
      this.info = " ";
    }
  }
});

// 封装成模板的方式
<todo-item v-for="(item,index) in items" :item="item"></todo-item>

Vue.component("todo-item", {
        props: ["item"],
        template: '<li class="item">{{item}}</li>'
      }
);

```

---

### 05 组件基础及组件注册

- to-do-item 组件

  ```vue
  <li class="item">
      <input type="checkbox" v-model="checked" />
      {{item}}
      <slot name="item" v-bind="{checked}"></slot>
  </li>
  <!-- 这里的checked是怎么传递出去的 -->
  <!-- 绑定在一个具名slot上，那在父组件的对应slot上就可以拿到该值了？ -->
  <!-- 因为渲染的li是一个单独的组件，每个组件都保存着各自的checked值所以不会互相干扰 -->
  ```

- 使用 to-do-item 的父组件

  ```vue
  <!-- 子组件标签名的使用跟所引用组件的文件名没有关系-->
  <!-- 关键在于引入时取的名称，在引入时使用PascalCase命名，具体使用可短横线亦可PascalCase -->

  <!-- props传值的方式实现 -->
  <ToDoItem v-for="(item, index) in list" :key="index" :item="item"></ToDoItem>
  -->

  <!-- 插槽和props对于值传递的方式是不一样的 -->
  <!-- 插槽里面的作用域仍然是子组件 -->
  插槽作用域的问题
  <!-- 插槽方式实现 -->
  <to-do-item v-for="(item, index) in list" :key="index">
      <!-- 如果没有对应的slot是不是就不渲染了，那不具名插槽呢 -->
      <!-- 不管父级这边还是组件里头没有对应的slot都不会显示 -->
      <!-- 2.5slot语法 -->
    <span slot="item" style="font-size:20px">{{item + '2.5'}}</span>
  
  <!-- 2.6slot语法 -->
  <!-- itemProps对应组件中传递出的bind值 -->
  
    <!-- 如果插槽中渲染组件的值，组件内也渲染组件的值，那组件内的值显示默认值，如果有的话 -->
  
    <template v-slot:item="itemProps">
    	<span :style="{fontSize: '20px', color: itemProps.checked ? 'red' : 'blue' }">			{{item}}
      </span>
    </template>
  
      <!-- 有两个插槽的时候只渲染一个，后面的会覆盖之前的 -->
   </to-do-item>
  ```

一些疑惑
main.js文件是用来干嘛的
里面的new vue({
    render: h=>h(App)
}).$mount('#app')
是用来生成最顶层的vue实例吗
入口文件怎么理解 我能理解index.html里的#app元素
以及他的多种写法
```Vue
new Vue({
el: '#app',
components: { App },
template: '<App/>'
})
```

为什么index.html和APP.vue里的id  app 不会重复
在vue文件中是地址的图片，到浏览器是base64的图片
为什么在子组件的slot里写v-bind传个对象，父组件就能用到呢

---

### 06 核心概念: 属性

自定义属性`props`，组件中 props 声明的属性

- 原生属性`attrs`，没有声明的属性，默认挂载到组件根元素上，设置 inheritAttr 为 false 可以关闭自动挂载

- 特殊属性`style class`，挂载到组件根元素上，支持字符串、对象、数组等多种语法

**问题**：子组件为什么不可以修改父组件传递的 prop，如果修改了，Vue 是如何监控到属性的修改并给出警告?

---

### 07 核心概念: 事件

- 普通事件，@click @input @change @xxx ，通过 this.\$emit('xxx',)触发

- 修饰符事件，@input.trim @click.stop @submit.prevent，一般用于原生 HTML 元素，自定义组件需要自行开发支持

**问题**：this.\$emit()的返回值是什么，如果上层组件的对应方法返回值，emit()是否可以接收到。

---

### 08 核心概念: 插槽

- 普通插槽

  2.5 `<template slot="xxx">..</template>`

  2.6 `<template v-slot="xxx">..</template>`

- 作用域插槽

  2.5 `<template slot="xxx" slot-scope="props">..</template>`

  2.6 `<template v-slot:xxx="props">..</template>`

**问题**：相同名称的插槽是替换还是合并，2.5 和 2.6 或有不同。

### 09 双向绑定与单向数据流不冲突

**双向绑定：** model 的更新，触发 view 的更新；view 的更新，触发 model 的更新

**单向数据流：** model 的更新触发 view 的更新

1. Vue 是单向数据流，不是双向绑定
2. Vue 的双向绑定不过是语法糖
3. Object.defineProperty 是用来做响应式更新的，和双向绑定没有关系

// 那响应式更新又是什么意思。

// 该如何理解 Vue 的双向绑定不过是语法糖

```Vue
// 语法糖
<personalInfo v-model="phoneInfo"
			  :zip-code.sync="zipcode" />

<personalInfo :phone-info="phoneInfo"
              @change = "val => (phoneInfo = val)"
              :zip-code = "zipcode"
              @update:zipcode="val => (zipcode = val)" />
```
有课后习题，
跑起demo代码后做完。

响应式更新是什么概念
双向绑定又是什么概念
单向数据流又是什么概念

---

### 10 理解虚拟 DOM 及 key 属性的作用

虚拟 DOM 的目的是为了更高效的绘制 DOM,不是全盘重绘，有选择的重绘。

课后习题，为什么不建议用 index 作为 key

---

### 11 如何触发组件的更新

数据驱动的视图框架，DOM 是由数据来映射的。

Vue 中的数据来源

- 来自父元素的属性
- 来自组件自身的状态
- 来自状态管理器 vuex vue.observable

状态 data & 属性 props

- 状态是组件自身的数据

- 属性是来自父组件的数据

- 状态的改变未必会触发更新

- 属性的改变未必会触发更新

在对属性中数组类型值进行 push 操作时，push 并不会改变原数组，那是如何更新视图的

当 data 中正确定义了状态，且也正常改变状态，

但当状态并没有渲染到 view 上时，这个状态是不会变的。

在 return 里的 data 和不在 return 里的 data 有啥区别

在 return 里才是响应式？

课后习题，课程有哪些方法支持响应式更新，

如不支持如何处理，底层原理如何实现。

---

### 12 合理应用计算属性和侦听器
computed
	减少模板中的计算逻辑
	数据缓存 数据没有变化则不计算，不过依赖的数据必须是响应式的
	依赖固定的数据类型(响应式数据)
	
computed和method的不同之处
在对data中的某一个状态进行处理时，只有状态变化才会引起computed的重新计算，
而method是机械的按要求计算，不论该状态是否有变化。因此，computed的性能要比method的好

watch
更加灵活、通用
watch中可以执行任何逻辑，如函数节流，AJax异步获取数据，甚至操作DOM。

computed vs watch
computed能做的，watch都能做，反之则不行
能用computed的尽量用computed

课后习题
对watch1 demo 进行防抖改造
直到用户停止输入500毫秒后，才更新fullName

## 生态篇


## 实战环节

1. 引入的时候可以按需引入，为啥use的时候不可以。
```
  import { Button, Layout, Icon, Drawer, Radio } from "ant-design-vue";
  // 为啥use的时候又只能挨个use呢
  Vue.use(Button);
  Vue.use(Layout);
  Vue.use(Icon);
  Vue.use(Drawer);
  Vue.use(Radio);
```

2. webpackchunk在这里是啥意思；这跟公司项目先用变量保存引入的有没有区别
```
   component: () =>
      import(/* webpackChunkName: "user" */ "../layout/UserLayout.vue"),
```

3. 用
```
    // 使用JSX语法创建router-view标签
    // component: { render: h => h("router-view") },
```


## 福利篇