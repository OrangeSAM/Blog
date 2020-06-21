---
title: Vue组件间的通信机制
---
[[toc]]

在编写Vue的代码时，组件间的通信是永远绕不开的话题。在日常的开发中，最常见的当属父子组件间的通信，除去父子组件，还有兄弟组件等。
通信的内容包含数据的传递和事件的传递，即要搭建不同组件间的桥梁。

model和viewmodel的区别。
vue是双向绑定单向数据流。

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
```vuejs
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
获取的子组件有明确的目前，因为需要在使用该对象的组件中标明具体的`ref`。

::: warning 请注意
$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs。
:::
也就是说在`mounted`阶段才能获取到存在的`ref`，如果这个组件的`v-if`状态是false也获取不到。

## `provide`和`inject`
这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。
`provide` 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property。
`inject` 选项应该是一个字符串数组，或一个对象，对象的 key 是本地的绑定名。

:::warning
provide和inject绑定并不是可响应的，这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的property还是可响应的。
:::

在2.2.1之后，可以使用注入的值作为`props`或者`data`中的默认值。另外，在2.5.0以上的版本中，你甚至可以为注入设置默认值。
```vue
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

vuex
state
mutation  this.$store.commit
actions   this.$store.dispatch

actions提交的是mutation，而不能直接变更状态
actions可以包含异步操作，但是mutation只能包含同步操作

getters     this.$store.getters
	
$on 能见监听到子组件的emit事件吗
文档中有说$on 监听的是当前实例上的自定义事件，事件有vm.$emit触发，回调函数会接收所有传入事件触发函数的的额外参数。
即需要保证$emit的实例和$on的实例是同一个实例才能监听到对应的事件触发。而如果需要在子组件中触发父组件中的事件，可以借由$parent属性。
即 childCompo.$parent.$emit('test', 'test')

https://juejin.im/post/5bb355dae51d450ea4020b42
## vuex 状态管理的流程
view actions mutations state view 
