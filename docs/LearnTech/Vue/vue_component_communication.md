---
title: Vue组件间的通信机制
---
[[toc]]

在编写Vue的代码时，组件间的通信是永远绕不开的话题。在日常的开发中，最常见的当属父子组件间的通信，除去父子组件，还有兄弟组件等。
通信的内容包含数据的传递和事件的传递，即要搭建不同组件间的桥梁。

## 父子关系间的`props`和`emit`
**`props`** 和 **`emit`**
props可以说是最常用的父组件向子组件传递数据的方式。
> Prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个 property。
一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。访问props就跟访问data中的数据一样。 --- Vue文档

举个例子：
```javascript
// 子组件
// 简单的由数组组成props
props: ['title', 'id']
// 复杂的对象形式的props，可规定props的类型、默认值和校验规则
props: {
  title: {
    type: 'String',
    default: '文章标题',
    validator (value) => {
      // 这个值必须匹配下列字符串中的一个
      return value.length > 1 && value.length < 20
    }
  }
}
```
```vue
// 父组件
<demo :title='diamond'></demo>
```

而由于Vue中单向数据流的限定，子组件不能直接更改`props`中的值。
> 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。 --- Vue文档

::: warning 请注意
在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。
:::

但总会遇到需要改动props的情况。比如一个弹窗组件，组件提供`isShow`来控制弹窗的显示与否，而关闭的行为还是由弹窗内部来控制的。如果要关闭该怎么办呢。
1. 使用`$emit`告诉父组件把我关闭了吧。

`$emit`方法可以有多个参数，一是事件名，事件名之外是想传的参数，附加的参数都会传给监听器回调。而对于接受，在对应使用子组件的地方用`@`符号监听，
回调函数会接收所有传入事件触发函数的额外参数。

测试发现，如果需要获取由子组件传递的多个参数，无法使用`@fromChild='childEvent($event, $event1)'`的方式获得，
且`$event1`还会报错。此时需要用到`arguments`，即`@fromChild="childEvent(arguments, $event)"`，arguments会以对象的形式获得子组件传递的所有参数，而 `$event`
只能获取到子组件`$emit`中的第一次参数。具体可见尤大的[回复](https://github.com/vuejs/vue/issues/5735)。

在子组件的关闭按钮中添加事件，事件中通过`$emit`通知父组件将弹窗关闭。虽然可行，但显得很笨拙。
```vue {5}
// 子组件
<template>
    <div v-if="isShow">
        <span >弹窗内容</span>
        <button @click="hidden">弹窗内的点他</button>
    <div>
</template>

<script>
methods: {
    hidden() {
      this.$emit("hidden", false);
    }
}
</script>
```

```html
<DemoTest :isShow="show" @hidden="show = false"></DemoTest>
```

2. 使用2.3.0新增的`update`和`sync`修饰符"默默"把值改了。
todo 探索下如何在父子组件中通过v-model实现双向绑定。 
```vue
// 子组件
<span v-if="isShow">弹窗内容</span>
<button @click="hidden">弹窗内的点他</button>
hidden() {
  this.$emit("update:isShow", false);
}
```
```vue
// 父组件
<DemoTest :isShow.sync="show"></DemoTest>
```
虽然是默默，但也通知了父组件修改，而不是在子组件内就直接改了。这个`.sync`修饰符本质上还是一个语法糖（让你觉得甜的东西），不甜的代码如下。
```vue
<DemoTest :isShow="show" @update:isShow="show = $event"></DemoTest>
```

::: warning 请注意
1. 带有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 `property` 名，类似 v-model。

2. 将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。
:::

在这个场景中，`isShow`是内外联动的，如果不是内外联动，而又需要在组件内部对`props`中的值进行修改，可以在子组件内部声明一个`computed`或者`data`来承接。

## 父子关系间的`$parent`、`children`和`$refs`
**`$parent`** property 可以用来从一个子组件访问父组件的实例。它提供了一种机会，可以在后期随时触达父级组件，以替代将数据以 prop 的方式传入子组件的方式。

比如在刚刚弹窗的场景中，可以直接在子组件总使用$parent来改变父组件data中的`show`属性值，`this.$parent.show = false`。但直接在子组件中改变父组件中数据的方式并不提倡，
或者说通用性并不强。仍旧以弹窗组件为例，在其他的父组件中，其`data`值或许并不是`show`而是其他的，此时弹窗子组件的关闭方法就会失效。

所以，使用`$parent`属性直接更改父组件属性值的方式并不可靠。即便要使用，也建议只使用在非公共组件而只是为了代码整洁而抽离的组件中。

**`$children`** property 以数组的形式获取当前实例的直接子组件，**需要注意$children 并不保证顺序，也不是响应式的**。如果需要通过该属性操纵具体的子组件，会显得很笨拙。
表现为，使用`$children`属性的组件内，并不一定只有一个子组件，子组件数量多的用该属性获取并不方便。

**`$refs`** 对象持有注册过`ref`attribute的所有DOM元素和组件实例。该对象比上述二者更厉害的一点在于，除去组件实例外，它还能获取到DOM元素。而相较于`$children`属性，`$refs`对象对于需要
获取的子组件有明确的目前，因为需要在使用该对象的组件中标明具体的`ref`。通过`$refs`，几乎可以获取到对应组件上的任何属性或者方法。

::: warning 请注意
$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs。
:::
也就是说在`mounted`阶段才能获取到存在的`ref`，如果这个组件的`v-if`状态是false也获取不到。

## EventBus
前面说到父传子和子传父可以分别用props和event实现。但要是在兄弟组件仍然用这套方法就显得很累赘了。毕竟props和event的实现在代码结构上需要是父子的结构，兄弟组件并不满足。虽然可以借由父组件实现，
但也仅限于层级不多的情况，如果是更深一层的子孙组件就麻烦多了。

如下图所示，要实现根组件分别和子组件AB的通信可以借助props和event很方便的实现，
但是要实现子组件A和子组件B的通信，甚至，实现孙子组件C和孙子组件D的通信用之前的法子就不是易事了。
![](https://i.loli.net/2020/06/27/AlYbOupqxJeNQoj.png)

这个时候需要引入一个事件总线的概念，英文为`EventBus`。我觉得英文比事件总线这个四个字好理解多了。通俗点说就是，有一辆巴士游走于各组件中(需要各组件自行引入)，组件如果需要知道消息或者发布消息都可以让巴士告诉他($on和$emit)。

在使用之前，需要创建用于承载事件监听和发布的接口，其实就是创建一个空的Vue实例。
```javascript
import Vue from 'vue'
let eventBus = new Vue()
export default eventBus
```

**为什么通过新建一个Vue实现就能实现事件的发送和监听功能呢？是因为 Vue 内部实现了一个事件分发接口，以至于可以在实例中使用`$emit` `$on` `$off` 分别来发布、监听、取消监听事件。**
其实在单个组件内也可以使用`$on`来监听组件内的事件，但一般都是由相关的事件直接就触发了，所以在单个组件内用的会少些。

在[文档](https://cn.vuejs.org/v2/api/#vm-emit)中我们看到，`$emit`和`$on`都是作为实例上的方法存在的，所以在一个实例上自然可以监听到对应的事件。
另外，在这里分享我遇到的一个小问题。$on 是否能监听到子组件的emit事件，答案是不能，因为二者的this并不同。

文档中有说$on 监听的是当前实例上的自定义事件，事件由vm.$emit触发，回调函数会接收所有传入事件触发函数的的额外参数。
即需要保证$emit的实例和$on的实例是同一个实例才能监听到对应的事件触发。而如果需要在子组件中触发父组件中的事件，可以借由$parent属性。
即 `childCompo.$parent.$emit('test', 'test')`。

在子组件中需要引入实例化eventBus的文件，然后直接在`mounted`或`mounted`中编写相关代码。详情可参考[具体代码](https://codesandbox.io/s/quirky-mirzakhani-wdjll?file=/src/App.vue)
```javascript
// 发布事件
methods: {
    testClick() {
      eventBus.$emit("helloFromApp", "来自test");
    }
}
// 监听事件
mounted() {
    eventBus.$on("helloFromApp", e => {
      console.log(e);
    });
}
```

但需要注意的是：
1. 文件式的eventBus上的事件不会随着组件的销毁而销毁
2. eventBus允许同名事件存在，即不会被覆盖
3. 组件被重新创建会再次绑定注册事件

所以在销毁组件的时候需要打扫战场，用`$off`将监听的事件移除。
```javascript
beforeDestroy () {
    eventBus.$off('helloFromApp')
}
```
在移除事件监听器的时候:
1. 如果没有提供参数，则移除所有的事件监听器
2. 如果只提供了事件，则移除该事件所有的监听器
3. 如果同时提供了事件与回调，则只移除这个回调的监听器

我们刚刚对于eventBus的应用是为其创建一个单独的文件。但也可以在main.js上直接创建全局的eventBus添加到实例原型上。
```javascript
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})
```


问题，为啥都是在一个实例上，子组件$emit的事件却无法在父组件上用$on监听到呢。

## `provide`和`inject`
这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。
`provide` 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property。
`inject` 选项应该是一个字符串数组，或一个对象，对象的 key 是本地的绑定名。

:::warning
provide和inject绑定并不是可响应的，这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的property还是可响应的。
:::

在2.2.1之后，可以使用注入的值作为`props`或者`data`中的默认值。另外，在2.5.0以上的版本中，你甚至可以为注入设置默认值。
```javascript
const Child = {
  inject: ['foo'],
  // 默认值的形式
  inject: {
    foo: {default: 'foo'}
  }
  props: {
    bar: {
      default () {
        return this.foo  
      }
    }
  },
  data () {
    return {
      bar: this.foo
    }
  }
}
```

但如果只是用provide向下为其后代的组件提供一些数据，还是稍显鸡肋了。此时可以结合前面提到的eventBus理念，直接在provide中使用。
因为provide的值需要是对象，此时将value变成一个eventBus，后代组件注入inject就可以愉快地使用eventBus了。
```javascript
data () {
  return {
    eventBus: new Vue()
  }
},
provide () {
  return {
    eventBus: this.eventBus
  }
}
```

Provide、inject和EventBus的关系：
1. eventBus可以不借助provide和inject实现各组件的通信，原理就是vue内部实现的`$emit` `$on ` `$off`事件机制。
2. provide、inject能够方便地实现各组件间的通信，但方向单一，数据形式单一，即只能由祖宗组件向下提供数据。
3. provide、inject和eventBus的结合可以更好的实现组件间的通信。

## `$attrs`和`$listeners`
在前面有提到，我们使用`props`来规定使用当前组件需要的参数，使用`emit`来暴露当前组件的事件。

但当子组件中还包含了一个组件，而对于孙子组件需要传入的属性和使用孙子组件的事件，是不是都要在子组件写一遍呢。
有`$attrs`和`$listeners`之后，就不用了。举个例子，很多小厂内部的组件库中有些组件是基于elementUI封装的，如下。
```vue
<template>
  <el-radio v-bind="$attrs"
            v-on="$listeners">
    <slot></slot>
  </el-radio>
</template>
```
在对外使用上，这个组件的名称可能是`xx-radio`，但实际上内部就是完全使用`el-radio`，而不用自行编写任何`props`或者事件，直接使用`$listener`和`$attrs`将
在父组件使用时的相关参数传递到`el-radio`。

但需要注意的是`class`和`style`并不会被传递到孙子组件。

## vuex
上面说的这些都是组件级别的通信，但如果涉及到项目内级别的全局通信，eventBus也会稍显力不从心。此时就需要用到`Vuex`。

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
	
对于Vuex的使用和原理就可以写好几篇文章了，此处就不展开介绍。