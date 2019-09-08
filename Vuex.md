### what is Vuex

Vuex是一个Vue.js应用程序开发的**状态管理模式**，采用集中式存储管理应用所有的组件状态。

如果是小应用，一个简单的Store模式就够了；中大型单页应用还是得上Vuex。

Vuex和单纯的全局对象有以下两点不同：

- Vuex的状态存储是响应式的，当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会相应地得到高效更新。

- store中的状态，不能直接被改变。改变store中的状态的唯一途径是显示地提交(commit)mutation，这样使得我们可以方便地跟踪每一个状态的变化。



### the core concept

#### State

Vuex使用单一状态树，即一个对象包含全部的应用层级状态。这意味着，每个应用将仅仅包含一个store实例。

在Vue组件中获得Vuex状态的几种方法

```
1. 
	count () {
	  return store.state.count
}
// 然而这种模式导致组件依赖全局状态单例。
2.
	
```

