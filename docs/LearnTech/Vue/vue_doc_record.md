---
title: Vue文档学习
---
v-bind这样的东西称为指令，指令带有前缀v-，以表示他们是vue提供的特殊特性，他们会在渲染的DOM上应用特殊的响应式行为。

使用Vue的省心之处在于，不用触碰DOM，所有的DOM操作都有VUE处理，编写代码时只要关心逻辑层就好了

组件系统是Vue的另一个重要概念，因为他是一种抽象，允许我们使用小型、独立和同城可复用的组件构建大型应用。

所有的Vue组件都是Vue实例，并且接受相同的选项对象（一些根实例特有的选项除外）

`for(var msg of ["how","are","you"])`

一个Vue应用由一个通过new Vue创建的根vue实例，以及可选的嵌套的、可复用的组件数组成。


所有的Vue组件都是Vue实例，并且接受相同的选项对象。
Vue组件提供了纯自定义元素所不具备的一些重要功能，最突出的是跨组件数据流、自定义事件通信以及构件工具集成。

当一个Vue实例被创建时，他向Vue的响应式系统中加入了其data对象中能找到的所有属性。当这些属性的值发生改变时，视图将会产生 “响应”，即匹配更新为新的值。
要注意的是，只有当实例被创建时data中存在的属性才是响应式的。
但是使用object.freeze()会阻止现有属性的修改。

实例生命周期钩子
每个Vue实例被创建时都要经过一系列的初始化过程，在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己代码的机会。
生命周期钩子的this上下文指向调用他的Vue实例。
beforecreate          created
beforemounte       mounted 
beforeupdate        updated 
beforedestroy       destroyed

模板语法
在底层的实现上，Vue将模板编译成虚拟DOM渲染函数。
	插值
		文本	```data```,使用v-once指令，可以执行一次性地插值。
		原始HTML	使用v-html输出真正的HTML`<p v-html="rawhtml"></p>`
		特性	双大括号语法不能作用在HTML特性上，应使用v-bind指令
		使用js表达式	每个绑定都只能包含单个表达式， ```{ok?'yes':'no'}}```
	指令 directive
		指令是带有v-前缀的特殊特性。
		指令特性的值预期是单个JavaScript表达式。
		指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于DOM。
	参数 
		一些指令能够接收一个‘参数’，在指令名称后之后以冒号表示。
			v-bind:href           v-on:click
	修饰符 modifiers
		修饰符是以 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。
		.prevent 
		.lazy
	缩写
		v-前缀作为一种视觉提示，用来识别模板中Vue特定的特性。 
		v-bind b-on
		v-bind:href => :href
		v-on:click => @click
	
计算属性和侦听器
	计算属性 computed
		对于任何复杂的逻辑，都应当使用计算属性，避免模板过重导致难以维护
		可以像绑定普通属性一样在模板中绑定计算属性。
		计算属性默认只有getter,不过在需要的时候也可以写一个setter。
		计算属性缓存VS方法
			计算属性是基于他们的依赖进行缓存的，只在相关依赖发生改变时他们才会重新求值。
			每当触发重新渲染时，调用方法总会再次执行函数。
			计算属性的意义：避免重复的计算开销
		计算属性vs侦听属性
			Vue提供了一种更通用的方式来观察和响应Vue实例上的数据变动：侦听属性。
			watch
		计算属性的setter
			计算属性默认只有getter,在需要的时候可以提供一个setter
	
	侦听器 watch
		Vue提供了一种更通用的方式来观察和响应Vue实例上的数据变动：侦听属性。
		

class与style绑定
操作元素的class列表和内联样式是数据绑定的一个常见需求。
	绑定HTML class
		数组语法：可以给v-bind:class 传一个对象，以动态切换class;可以与普通的class属性共存。也可以在这里绑定一个返回对象的计算属性。
		对象语法：还可以把一个数组传给v-bind:class,以应用一个class列表。
		在数组语法中也可以使用对象语法。
		用在组件上
			```
			Vue.component('my-component', {
			  template: '<p class="foo bar">Hi</p>'
			})
			<my-component class="baz boo"></my-component>
			```
			
			`<p class="foo bar baz boo">Hi</p>`
		带数据绑定class也同样适用
			`<my-component v-bind:class="{ active: isActive }"></my-component>`
			`<p class="foo bar active">Hi</p>`
	
	绑定内联样式
		对象语法：直接绑定到一个样式对象通常更好，会让模板更清晰
		数组语法：数组语法可以将多个样式对象引用到同一个元素上
		Vue 会自动添加浏览器引擎前缀
		多重值：可以为style绑定中的属性提供一个包含多个值的数组，常用于带前缀的值。
	
条件渲染
	v-if  v-else  v-else必须紧跟v-if 或者 v-else-if的元素后
	在`<template>`上使用v-if渲染分组
	```Vue
	<template v-if="ok">
	  <h1>Title</h1>
	  <p>Paragraph 1</p>
	  <p>Paragraph 2</p>
	</template>
    ```

	用key管理可复用的元素
	
	v-show 
	另一个用于根据条件展示元素的选项是v-show 
	带有v-show的元素始终会被渲染并保留在DOM中，v-show只是简单地切换元素的CSS属性display
	
	v-if VS v-show
	v-if 是真正的条件渲染，会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建
	v-if也是惰性的，在初始渲染条件为假时，则什么都不做，直到条件为真才开始渲染条件块
	v-show始终会渲染，只是基于CSS进行切换。
	v-if有更高的切换开销，v-show有更高的初始渲染开销。
	
列表渲染
	v-for指令需要使用item in items形式的特殊语法，
	item是源数据数组并且item是数组元素迭代的别名。
	
	在V-for块中，拥有对父作用域属性的完全访问权限，
	v-for还支持一个可选的第二个参数为当前项的索引（item,index）in items。
	用of 也行
	
	也可以用v-for通过一个对象的属性来迭代。
	v-for="(value,key,index) in object"
	在遍历对象时，是按Object.keys()的结果遍历，但在不同的js引擎或有不同。
	
	数组更新检测
		Vue包含一组观察数组的变异方法，所以他们也将会出发视图更新
			push() pop()  & shift() unshift() 
			splice() sort() reverse()
			
		替换数组
			变异方法会改变被这些方法调用的原始数组。
			相比之下，也有非变异方法，如filter() concat() slice() 
			这些不会改变原数组，但总是返回一个新数组。
			
		注意事项
			当利用索引直接设置一个项时，vue不能检测到变动的数组
			当修改数组的长度时，Vue不能检测到变动的数组
			使用Vue.set(vm.item,indexOfItem,newValue)或者
			vm.items.splice(indexOfItem,1,newValue)解决
			
		对象更改注意事项
			Vue不能检测对象属性的添加或删除。
			使用set解决
			
		显示过滤/排序结果
			想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据，
			在这种情况下，可以创建返回过滤或排序数组的计算属性。
			v-for="n in evennumbers" evennumbers为计算属性
			在计算属性不适用的情况下，可以使用一个method方法
			v-for="n in even(numbers)" even为methods
			
		一段取值范围的v-for
			v-for="n in 10"
			
		v-for on a <template>
			利用带有v-for的template渲染多个元素
			
		v-for with v-if
			当他们处于同一个节点时，v-for优先级比v-if更高，这意味着v-if将分别重复允许与每个v-for循环中。
			
		一个组建的v-for
			在自定义组建里，可以像任何普通元素一样使用v-for
			暂缺
			
事件处理
	监听事件
		可以用v-on指令监听DOM事件，并在触发时运行一些JavaScript代码
	事件处理方法
		当事件处理逻辑变得复杂是，v-on需要调用一个方法来处理
	内联处理器中的方法
		除了直接绑定到一个方法，也可以在内联JavaScript语句中调用方法。
		可以用特殊变量$event把它传入方法，以访问原始的DOM事件。
	事件修饰符
		方法只有纯粹的逻辑，而不是去处理DOM事件细节。
		.stop	阻止单击事件继续传播
		.prevent	提交事件不再重载页面
		.capture	添加事件监听器时使用事件捕获模式
		.self	只当在event.target是当前元素自身时触发处理函数
		.once	点击事件只会触发一次
		.passive	滚动事件的默认行为，将会立即触发，不等onScroll

		修饰符可以串联，但要注意顺序；也可以只有修饰符
	按键修饰符
		`<input @:keyup.enter="submit">`
		.enter	.tab	.delete
		.esc	.space	.up
		.down	.left	.right
		可以通过全局config.keycodes对象自定义按键修饰符别名
		Vue.config.keyCodes.f1=112
	系统修饰符
		可以用以下修饰符实现仅在按下相应按键才触发鼠标或键盘事件的监听器
		.ctrl	.alt	.shift	.meta(徽标键)	.exact
		`<input @keyup.alt.67="clear">`
		`<input @click.ctrl="dosomething">`
		.exact 修饰符允许你控制由精确的系统修饰符组合触发的事件
		鼠标修饰符
			`.left .right .middle`
		
表单输入绑定
	基础用法
		可以用v-model指令在表单`<input><textarea><select>`元素上创建双向数据绑定。
		v-model本质是语法糖，负责监听用户的输入事件以更新数据。
		v-model会忽略所有表单元素的value checked selected 等特性的初始值，
		而将Vue实例中的`data`作为数据来源。
		
		在文本区域插值<textarea>不会生效，应使用v-model代替。
		
		复选框，单个&多个，多个使用数组存放
		
		单选按钮，和单个复选框类似需要有value
		
		下拉选择框，单选多选v-model都应该放在select中，多选时应声明multiple，
		用数组存储选择的值。可配合v-for动态渲染选项
		
	值绑定
		可以通过v-bind实现v-model绑定动态属性 
	修饰符
		.lazy
			将实时同步的input事件变为change事件
		.number
			自动将用户的输入值转为数值类型
		.trim
			自动过滤用户输入的首尾空白字符
	在组件上使用v-model
		
		
### 组件基础
组件基础
	组件是可复用的Vue实例。
	也因此，他们与new Vue接收相同的选项，data computed watch methods。
	组件可以进行任意次数的复用。
	
	data必须是个函数，也因此每个实例可以维护一份被返回对象的独立的拷贝，这样就不会影响到其他组件实例的值。
	
	通过prop向子组件传递数据
		prop是可以在组件上注册的一些自定义特性，prop数量不限，类型不限。
		prop在组件中的配置是一个字符串数组
	
	单个根元素，每个组价必须只有一个根元素
	
	监听子组件事件
		在子组件中调用内建的$emit方法并传入事件名称来触发一个事件
	
	使用事件抛出一个值
		可以直接在自定义事件上表达式或者到父组件中写方法
		
	在组件上使用v-model
		<input v-model="search">
		
		等价于
		<input :value="search" @input="search=$event">
		
		当v-model使用在组件上时，组件内的input 必须
			将其 value 特性绑定到一个名叫value的prop 是上
			在其input事件被触发时，将新的值通过自定义的input 事件抛出
		<custom-input
		v-bind:value="searchText"
		v-on:input="searchText = $event"
		></custom-input>
		
		Vue.component('custom-input', {
		props: ['value'],
		template: `
		<input
		v-bind:value="value"
		     v-on:input="$emit('input', $event.target.value)"
		   >
		`})
		
	通过插槽分发内容
		slot
	
	动态组件
		使用is特性实现在不同的组件之间切换
	
	解析DOM模板时的注意事项
		由于HTML元素本身的限制，自定义组件有可能会被作为无效内容提升到外部，
		此时可以通过is 特性解决 <tr is="blog-post-row"></tr>
		但如果从以下来源使用模板的话，是没有这种限制的
			字符串 template:''单文件组件   .vue
			<script type="text/x-template"
		
### 深入了解组件
组件注册
	组件始终需要一个名字，组件名即Vue.Component的第一个参数。
	组件名命名规范使用小写字母加连字符-
	
	组件注册分为全局注册和局部注册
		Vue.component & Vue({ components:{} })
	局部注册的组件在其子组件中不可以用
		变为可用的trick是，把组件A的变量名写到B组件名的后面
	模块系统
		暂缺
	
Prop
	prop的大小写问题
		在js中用驼峰，HTML中用短横杆-
	
	prop类型
		字符串数组
		也可以是对象的形式，以规定该prop的更多属性（类型，初始值，必需项等）
		
	传递动态或静态prop
		可以通过v-bind给prop动态赋值，任何类型的值都可以传给一个prop
		但凡希望Vue正确的知道你传递的值类型都需要使用v-bind，不然传递的值
		一直都是字符串
	
		传入一个对象的所有属性
	单向数据流
		所有的prop都使得其父子prop之间形成了单向下行绑定：父级prop的更新会向
		下流动到子组件中，但是反过来不选。
		如果需要再子组件中修改prop值，两个建议：
			在组件内定义一个data属性
			使用计算属性进行值得转换
	
	prop验证
		指定prop的类型、设置prop的默认值、自定义prop验证函数
		
	非prop特性
	？？？
	
	替换/合并已有的特性
		对于绝大多数特性来说，从外部提供给组件的值会替换掉组件内部设置好的值。
		class和style特性稍微智能一些，两边的值会被合并。
	禁用特性继承
	
自定义事件
	事件名
		使用短横杠对事件进行命名，因为v-on 事件监听器在DOM模板中会被自动转换为全小写
	自定义组件的v-model
	
插槽
	具名插槽和作用域插槽引入的统一语法，v-slot指令
	取代slot & slot-scope

	插槽内容
		<slot>
	编译作用域
		父级模板里的所有内容都是在父级作用域中编译的，
		子模板里的所有内容都是子作用域中编译的。
	后备内容
		在具体组件中的<slot>里，放置默认的插槽内容，已在父组件没有设置内容时显示
	具名插槽
	作用域插槽
		绑定在<slot>元素上的属性被称为插槽prop。
	独占默认插槽的缩写语法
	
动态组件 & 异步组件
	在动态组件上使用keep-alive
	异步组件
		处理加载状态
		 
处理边界情况
	访问元素&组件
		访问根实例
			$root
		访问父组件实例
			$parent
		访问子组件实例或子元素
			$refs
		依赖注入
			Provide inject
	程序化事件监听器
		$on $once $off
	循环引用
		递归组件
	
	

		
		

		
		
		
		
		
		
