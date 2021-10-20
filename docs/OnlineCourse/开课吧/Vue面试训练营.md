---
title: Vue面试训练营
---
1. `v-if`和`v-for`优先级
   1. `v-for`高于优先于`v-if`解析。
      1. 自己写例子获得render函数返回证明
      2. 源码中`compiler/codegen/index`第64行，处理`for`的逻辑在处理`if`逻辑之前
   2. 如果同时出现，每次渲染都会先执行循环再执行判断
   3. 在外层嵌套template，可以避免

```html
<div id="sam">
 <span v-for="item in arr" v-if="is">{{item}}</span>
</div>
```
```javascript
const a = new Vue({
el: '#sam',
data() {
   return {
      arr: [1, 2, 3],
      is: true
      }
   }
})
console.log(a.$options.render,29292)

function anonymous() {
  with(this){return _c('div',
          {attrs:{"id":"sam"}},
          _l(
            (arr),
            function(item){
              return (is) ? _c('span',[_v(_s(item))]) : _e()
            }),0
  )}
}
```

2. Vue组件的data为什么是要函数形式
   1. 不论是全局组件还是局部组件（未确认），在注册组件的时候都只是执行一次，而不是用一次执行一次，如果data只是个对象，那么会导致数据的共用。
   2. 举个具体的例子，比如有个按钮组件，默认背景颜色为绿色，页面有十个按钮，随便更改一个按钮的背景颜色，会观察到其他九个按钮的背景颜色也被影响。
   3. Vue是如何在代码层面检测拦截的。
      1. 在core/util/options.js文件的121行中，会判断data是否为一个函数，不是则会触发警告。
      2. 如果把这段逻辑注释，可以复现上述行为。
      3. 如下代码，使用前一个data逻辑时，点击页面上任一个元素，都会观察到其他元素有自增行为。
      4. 而使用后一个data逻辑，则不会。
   4. 采用函数形式定义，在initData时会将其作为工厂函数返回全新data对象，从而规避多实例之间状态污染问题。
   5. 而在根实例创建过程中则不存在该限制，因为根实例只有一个，且源码中也对组件创建和根实例创建有不同的处理逻辑。

```html
<div id="sam">
  <sam></sam>
  <sam></sam>
  <sam></sam>
  <sam></sam>
</div>
```
````javascript
Vue.component('sam', {
   template: `<div @click="sam +=1">{{sam}}</div>`,
   data: {
   sam: 1
   },
   // data() {
   //   return {
   //     sam: 1
   //   }
   // }
})

const app = new Vue({
   el: '#sam'
})
````

3. Key的作用和原理
   1. todo
4. 怎么理解Vue中的diff算法
   1. todov 
5. 对Vue组件化的理解
   1. 分层次答，定义、优点、使用场景和注意事项
   2. 全局和局部的源码实现方式
   3. 一个组件一个watcher，合理地拆分组件便于提高页面性能
   4. 组件是独立和可复用的代码组织单元，组件系统是Vue核心特性之一，它使开发者使用小型、独立和可复用的组件构建大型应用。
   5. 组件开发能大幅提高应用开发效率、测试下和复用性。
   6. 组件使用按分类有：页面组件、业务组件、通用组件。
   7. Vue的组件是基于配置的，我们通常编写的组件是组件配置而非组件，框架后续会生成其构造函数，他们基于VueComponent，拓展于Vue。
   8. Vue常见的组件化技术有：prop，自定义事件，插槽。
   9. 合理地划分组件，有助于提升应用性能。
   10. 组件应该是高内聚、低耦合的。
   11. 遵循单向数据流的原则。
6. 
