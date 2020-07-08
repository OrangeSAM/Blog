---
title: Vuex文档
---
## what is Vuex

Vuex 是一个 Vue.js 应用程序开发的**状态管理模式**，采用集中式存储管理应用所有的组件状态。

如果是小应用，一个简单的 Store 模式就够了；中大型单页应用还是得上 Vuex。

Vuex 和单纯的全局对象(比如 window)有以下两点不同：

- Vuex 的状态存储是响应式的，当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

- store 中的状态，不能直接被改变。改变 store 中的状态的唯一途径是显示地提交(commit)mutation，这样使得我们可以方便地跟踪每一个状态的变化。

通过 store.state 来获取对象，以及通过 store.commit 方法触发状态变更。
由于 store 中的状态是响应式的，在组件中调用 store 中的状态只需要在计算属性中返回即可，触发变化也仅仅是在组件的 methods 中提交 mutation。

## the core concept

### State

Vuex 使用单一状态树，即一个对象包含全部的应用层级状态。这意味着，每个应用将仅仅包含一个 store 实例。

在 Vue 组件中获得 Vuex 状态的几种方法

```
1.
	count () {
	  return store.state.count
	}
// 每当store.state.count变化的时候，都会重新求取计算属性，并且触发更新相关联的DOM。
// 然而这种模式导致组件依赖全局状态单例。
2.
	const app = new Vue({
		el: '#app',
		store,
		...
		// 把 store 对象提供给 "store" 选项，这可以把 store 的实例诸如所有的子组件。
		// 通过在根实例注册store选项，该store会注入到根组件下的所有子组件中。
		// 且子组件能通过this.$store访问到。
	})
3.
	// 当一个组件需要获取多个状态时，可以使用mapState辅助函数帮助我们生成计算属性
	computed: mapState({
		count: state => state.count
	})
	当映射的计算属性名称与state的子节点名称相同时，也可以给mapState传一个字符串数组。
	computed: mapState([
		'count'
	])
```

对象展开运算符？存在与否的不同之处在哪呢

### Getter

可以认为时 store 的计算属性。
Getter 接收返回值作为其第一个参数

Getter 接受 state 作为其第一个参数
```javascript

const store = new Vuex.Store({
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    }
})
```

访问 getters 的几种方式

```
# 属性访问
store.getters.doneTodos
// 在组件中使用
computed: {
	doneTodoCount () {
		return this.$store.getters.doneTodoCount
	}
}
# 方法访问
getters: {
	getToDoId: (state) => (id) => {
		return state.todos.find(todo => todo.id === id)
	}
}
store.getters.getToDoById(2)
```

mapGetters 辅助函数可以将 store 中的 getter 映射到局部计算属性

```
computed: {
	...mapGetters([
		'course'
	])
}
// 使用对象展开运算符将getter混入到computed对象中
// 如果不使用呢
// 留下的疑问，如何在helloworld页面使用main.js编写的store
```

### Mutation

更改 Vuex 的 store 中的状态的唯一方法时提交 mutation。Vuex 中的 mutation 非常类似于事件

这就是单个组件里不用单独引入store的原因？
为了在 Vue 组件中访问 this.$store property，你需要为 Vue 实例提供创建好的 store。
Vuex 提供了一个从根组件向所有子组件，以 store 选项的方式“注入”该 store 的机制：
```javascript
new Vue({
  el: '#app',
  store: store,
})
```
通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。

this.$store.commit
this.$store.dispatch

