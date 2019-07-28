#### 04 小列表demo

```vue
<input type="text" name="" id="" v-model="info" />
<button @click="handleClick">添加</button>
<ul>
    <li v-for="(item, index) in items">{{ item }}</li>
    <todo-item v-for="(item,index) in items" :item="item"></todo-item>
</ul>

Vue.component("todo-item", {
        props: ["item"],
        template: '<li class="item">{{item}}</li>'
      });
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
```



#### 05 单文件组件

- to-do-item组件

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

- 使用to-do-item的父组件

  ```vue
  <!-- 子组件标签名的使用跟所引用组件的文件名没有关系-->
  <!-- 关键在于引入时取的名称，在引入时使用PascalCase命名，具体使用可短横线亦可PascalCase -->
  
  <!-- props传值的方式实现 -->
  <ToDoItem v-for="(item, index) in list" :key="index" :item="item"></ToDoItem> -->
  
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





#### 06 核心概念：属性

 自定义属性`props`，组件中props声明的属性

- 原生属性`attrs`，没有声明的属性，默认挂载到组件根元素上，设置inheritAttr为false可以关闭自动挂载

- 特殊属性`style class`，挂载到组件根元素上，支持字符串、对象、数组等多种语法


**问题**：子组件为什么不可以修改父组件传递的prop，如果修改了，Vue是如何监控到属性的修改并给出警告?



#### 07 核心概念：事件

- 普通事件，@click @input @change @xxx ，通过this.$emit('xxx',)触发

- 修饰符事件，@input.trim @click.stop @submit.prevent，一般用于原生HTML元素，自定义组件需要自行开发支持

**问题**：this.$emit()的返回值是什么，如果上层组件的对应方法返回值，emit()是否可以接收到。



#### 08 核心概念 插槽

- 普通插槽

  2.5 `<template slot="xxx">..</template>`

  2.6 `<template v-slot="xxx">..</template>`

- 作用域插槽

  2.5 `<template slot="xxx" slot-scope="props">..</template>`

  2.6 `<template v-slot:xxx="props">..</template>`

**问题**：相同名称的插槽是替换还是合并，2.5和2.6或有不同。



#### 09 双向绑定与单向数据流不冲突

**双向绑定：**model的更新，触发view的更新；view的更新，触发model的更新

**单向数据流：**model的更新触发view的更新



1. Vue是单向数据流，不是双向绑定
2. Vue的双向绑定不过是语法糖
3. Object.defineProperty是用来做响应式更新的，和双向绑定没有关系

// 那响应式更新又是什么意思。



// 该如何理解Vue的双向绑定不过是语法糖

``` Vue
 语法糖

<personalInfo v-model="phoneInfo"
			  :zip-code.sync="zipcode" />

<personalInfo :phone-info="phoneInfo"
              @change = "val => (phoneInfo = val)"
              :zip-code = "zipcode"
              @update:zipcode="val => (zipcode = val)" />
```



#### 10 理解虚拟DOM及key属性的作用

虚拟DOM的目的是为了更高效的绘制DOM,不是全盘重绘，有选择的重绘。

 

课后习题，为什么不建议用index作为key



#### 11 如何触发组件的更新

数据驱动的视图框架，DOM是由数据来映射的。

Vue中的数据来源

- 来自父元素的属性
- 来自组件自身的状态
- 来自状态管理器 vuex vue.observable

 

状态 data & 属性 props

- 状态是组件自身的数据

- 属性是来自父组件的数据

- 状态的改变未必会触发更新

- 属性的改变未必会触发更新

  

 在对属性中数组类型值进行push操作时，push并不会改变原数组，那是如何更新视图的



当data中正确定义了状态，且也正常改变状态，

但当状态并没有渲染到view上时，这个状态是不会变的。

 

在return里的data和不在return里的data有啥区别

在return里才是响应式？

 

课后习题，课程有哪些方法支持响应式更新，

如不支持如何处理，底层原理如何实现。