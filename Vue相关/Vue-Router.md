## 起步

如果在一个模块化工程中使用他,必须要通过vue.user()明确地安装路由功能

Import Vue from 'vue'

Import VueRouter from 'vue-router'

 

Vue.use(VueRouter)

如果使用全局的script标签,则无需这样.

 

 如果在一个模块化工程中使用他,必须要通过vue.user()明确地安装路由功能

`Import Vue from 'vue'
Import VueRouter from 'vue-router'
Vue.use(VueRouter)`

如果使用全局的script标签,则无需这样.

Vue-Router的功能

模块化的、基于组件的路由配置

路由参数、查询、通配符

基于Vue过度系统的视图过渡效果

细粒度的导航控制

带有自动激活的CSS Class的链接

HTML5历史模式或hash模式，在IE9中自动降级

自定义的滚动条行为

 

使用routerlink组件来导航，通过传入 to 属性指定链接

router-view是路由出口，路由匹配到的组件将渲染在这里

 

通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器

也可以通过this.$route访问当前路由

 

当<router-link>对应的路由匹配成功，将自动设置class属性值.router-link-active

##动态路由匹配

一种很常见的情况，需要我们把某种模式匹配的所有路由，全部映射到同一个组件。

比如文章详情页，个人中心页。

 

一个路径参数使用冒号：标记，当匹配到一个路由时，参数值会被设置到this.$route.params,

可以在组件内使用。

 

可以在一个路由中设置多段“路径参数”

/user/:username/
 /user/:username/post/:postd

 

响应路由参数的变化

当从相同的组件跳转到相同的组件时，原来的组件会被复用，

这也意味着组件的生命周期钩子不会再被调用，意味着数据不能得到更新。

 

对此的两个解决方法

使用watch监听$route对象的变化

使用beforeRouteUpdate导航守卫

 

捕获所有路由或404路由

使用通配符*匹配任意路径

path:'*'

path:'/user-*'

含有通配符的路由应该放在最后

使用通配符时，$route内会自动添加一个名为pathMath参数

该参数包含url通过通配符被匹配的部分

 

高级匹配模式

待了解

 

匹配优先级

谁先定义的，谁的优先级就最高



## 嵌套路由

app.vue中的`<router-view>`是最顶层的出口，渲染最高级路由匹配的组件。

同样的，一个被渲染组件同样可以包含自己的`<router-view>`。要在嵌套的出口中渲染组件，需要在VueRouter的参数中使用`children`配置。

以`/`开头的嵌套路径会被当做根路径，使得开发者充分的使用嵌套组件而无需设置嵌套的路径。

#### 编程式的导航

除了使用`<router-link>`创建a标签来定义导航链接，还可以借助router的实例方法，通过编写代码来实现。

语法 router.push(location, onComplete？, onAbort?)

this.$router.push 和 router.push的不同？？？？



当在页面上点击`<router-link>`时，push 方法会在内部调用，所以说，点击`<router-link :to="...">`等同于调用`router.push(...)`，一个是声明式一个是编程式。





...



#### 命名路由

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
//即多了name属性
在routerlink和push方法中的使用
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
router.push({ name: 'user', params: { userId: 123 }})
```

#### 命名视图

在一个页面中想要展示多个view时





#### 导航守卫

导航表示路由正在发生改变。

`Vue-router`提供的导航守卫主要用来通过跳转或取消的方式守卫导航。

参数或查询(query ?|version )的改变并不会触发进入/离开的导航守卫。



全局前置守卫

全局解析守卫

全局后置钩子



#### 组件内的守卫

beforeRouter

beforeRouterUpdate

beforeRouteLeave



## 路由元信息

meta