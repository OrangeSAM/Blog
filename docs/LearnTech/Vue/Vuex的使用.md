---
title: Vuex的使用
---

## 关键概念

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。

*state*: 所有状态的统称

*getters*: 对于状态的计算属性

*mutation*: 改变状态的必经之路

*action*: 提交对于mutation的更改

## vuex的创建

本质上来说，Vuex就是一个对象，只不过这个对象中包含了特殊标记的key-value键值对。

以下，是一个Vuex文件的典型样例。

Vuex 3.X的版本中

声明Vuex的方式
```vue
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

<!--这一步是为了配合main.js中的注册，以期实现将状态从根组件“注入”到每一个子组件中-->
<!--这也就是说，你可以不写Vue.use(Vuex)这一行，也可以不讲store传入到实例化Vue的选项中，而也可以使用-->

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    count: 0
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  },
  mutations: {
    setCountMutation(state, payload) {
      state.count = payload
    }
  },
  actions: {
    setCountAction({commit}, payload) {
      commit('setCountMutation', payload)
    }
  }
})
```

注册 vuex 到 Vue 中，需要这样做的原因

> 为了在 Vue 组件中访问 this.$store property，你需要为 Vue 实例提供创建好的 store。
> Vuex 提供了一个从根组件向所有子组件，以 store 选项的方式“注入”该 store 的机制。

```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store'
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
```

不注册到vue中，其实也没用大问题，除了无法通过this.$store获得store的操控外，其他无二致。

*注意*，如果在业务中有模块重用的需要，在声明状态的时候建议使用一个函数来声明模块状态，而不是直接使用一个纯对象。

```javascript
// it ok 
state: {
  count: 1
}

// it would be better
state: () => {
  count: 1
}
```

*注意*，在具体的实例化方法中，3.x版本和4.x版本不同。

```javascript
// 3.x 
import Vuex from 'vuex'
const store = new Vuex.Store({
  ...
})
// 4.x
import {createStore} from 'vuex'
const store = new createStore({
  ...
})
```

## state
state的定义很简单，但需要注意的是，但凡需要动态地往状态中赋值，都需要提前在state中声明。

不然，后续获取会失效，即便你能够打印出赋值在state中的数据，*这是为什么呢，猜测和vue的响应式有关，之前没有添加监听，后续再出现也无法实现变动*。

在vue文件中获取state有两种方式，一般来说更倾向于使用mapState工具函数。

使用mapState工具函数
```vue
...mapState({
  <!-- 一般写法-->
  count: state => state.count,
  <!-- 简化写法-->
  count: 'count',
  <!-- 和局部状态混用-->
  countPlus(state) {
    return state.count + this.localCont
  }
})
```

通过this.store获取 
```vue
computed: {
  count() {
    return this.$store.state.count
  }
}
```

开了module的情况

开了命名空间的情况

## 使用getters

与state的声明不同，getters的声明使用的是状态中已经存在的值，比如state，而除了state， getters还可以使用其他getters作为参数。
```javascript
getters: {
  doubleCount(state) {
    return state.count * 2
  },
  fourfoldCount(state, getters) {
    return getters.doubleCount * 2
  }
}
```
```vue
  computed: {
    ...mapGetters(['doubleCount', 'fourfoldCount']),
    <!--为getters取一个别名-->
    <!--但是如果将getters的直接取用和别名取用混用一行，就会导致别名的取用报错-->
    <!--这是为什么呢-->
    ...mapGetters({
      fourfoldCountAlias: "fourfoldCount"
    }),
  },
```

## mutation

Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。

我觉得对于mutation而言，就像我们正常定义一个函数，然后再使用，只不过这个函数的参数有限制，这个函数的使用亦有限制。

在函数的参数上，第一个参数是state，第二个参数是payload。重点在于第二个参数，他是你希望传递到这个函数中的数据。

mutation的声明
```javascript
mutations: {
  resetCount(state) {
    state.count = 0
  },
  setCountMutation(state, payload) {
    state.count = payload
  }
},
```

mutation的使用
```vue
methods: {
  increase() {
    store.commit('addCount', count)
    <!--对象风格-->
    <!--直接使用包含type属性的对象-->
    store.commit({
      type: 'increment',
      count: 10
    })
    <!--在使用对象风格时，如果payload是一个基本类型，而不是对象，那相应的在mutation要做处理，因为使用对象风格提交mutation时，必须使用key value-->
    <!--也就是说，得由之前的state.count = payload 改成 payload.count-->
    <!--this.$store.commit-->
  }
}
<!--当然，也还可以使用mapMutations工具函数-->
methods: {
  ...mapMutations(['addCount'])
  <!--类似的，该工具函数也支持别名-->
  ...mapMutations({
    add: 'addCount’
  })
  add() {
    this.addCount(10)
  }
}

```

## action的使用

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。

前面这句话有点绕，

与mutation不同的是，action内支持执行一步操作。


```javascript
actions: {
  setCountAction({commit}, payload) {
    commit('setCountMutation', payload)
  }
}
```


触发action

与mutation类似的是，action同样支持载荷和对象方式进行分发
```vue
this.$store.dispatch('setCountAction', 29)

this.$store.dispatch({
  type: 'setCountAction',
  value: 29
})
```

再次，和mutation一样，你可以直接使用this.$store来分发一个action，也可以使用mapAction辅助函数映射。
```vue
methods: {
  ...mapActions(['setCountAction']),
  setCount() {
    this.setCountAction(19)
  }
}
```

前面提到action支持异步操作。
```javascript
actions: {
  actionC ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```



## 命名空间
最开始的时候说到，vuex是单一状态树，这也就意味着如果一个程序的状态等非常多，那结果就是即便有业务逻辑可对其加以区分，也导致五花八门的状态还有mutation等糅杂在一块。

对于这个问题，vuex也提供了模块的概念。

我们就像之前初始化一个store一样，初始化一个模块，每个模块都拥有自己的state，mutation，action，getter。

但不同的是，相较之前，模块内的mutation和getter，接收的第一个参数是模块的局部状态对象。
也就是你写一个mutation，其中state的值，到底是什么，取决于当前是处于模块还是顶级store中

```javascript
mutation: {
  addCount(state) {
    
  }
}
```
对于模块的action也是类似的，模块内的状态通过ctx.state获得，顶级store的状态通过ctx.rootState获得

```javascript
action: {
  addCountAction({state, commit, rootState}) {
    
  }
}
```
对于模块内的getter，根节点状态会作为第三个参数暴露出来。

```javascript
getters: {
  doubleCount(state, getter, rootState) {
    return state.count + rootState.count
  }
}
```

默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。
个人不建议，这样只能通过名字来区分模块间的action、mutation和getter，容易混淆。

## 注册Vue中与否
上面的说明中，都是默认已经将Vuex的实例注册到vue中，但实际上，即便不注册其中，我们也能使用，只不过需要手动引入Vuex实例的文件。前面又说到，Vuex的本质就是一个对象，所以可以像导出导入一个常见的对象一样使用。
获取state

获取getters

触发action

触发commit

除了在组件中访问store的内容，还可以在js文件中访问，与未注册在vue中类似，在js文件中，只是无法使用this.$store对store进行操作，其他方法和状态的获取与平常并无二致。

