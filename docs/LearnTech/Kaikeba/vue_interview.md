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
