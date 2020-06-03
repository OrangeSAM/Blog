---
title: 组件的名称探究
---
## 官方建议
认真阅读了Vue文档中有关组件名的要求和建议。罗列如下：
1. 组件名需要为多个单词，（根组件以及`<transition>``<component>`之类的Vue内置组件除外）。这样做可以
避免跟现有的以及未来的HTML元素向冲突，因为所有的HTML元素名称都是单个单词的。 

项目中和名称相关的几个地方，新建组件时Option中的name，注册组件时组件的名称，在使用组件时的标签名，
在Vue Devtools中查看组件结构时的组件名称。

那现在来捋捋这四者间的关系。
以button组件为例，在入口文件中注册的w-button, 是供在template里使用组件时编写的。
而在组件内部声明的name, 可以在vue-devtools中看到组件的名称，可以用来标识组件，但并非唯一。

## 缘由
在写测试用例时，目前遇到了两个因为组件名称的细小问题，导致花了很多时间来排查。
之前遇到的一个问题是，在单文件组件中注册组件时，没有安装规范取名。
```javascript
import Wicon from './icon'
components: {Wicon}
```
上面代码在语法上虽然没有问题，但是在使用会有问题，如果在template中像这样使用引入的组件`<w-icon>`，
是会报错的。
报错如下。
```shell script
[vue warn] unknown custom element <w-icon>, did you resgister the components correctly?
For recursive components make sure to provide the "name" option
```

组件注册中的两种风格
1. kebab-case(烤肉串)
用短横线串联起各单词是不是很有烤肉串的感觉。定义时使用kebab风格，在使用的时候也必须是kebab风格。
比如注册时`Vue.component('my-component-name', { /* ... */ })`, 使用时`<my-component-name>`

2. PascalCase(单词首字母大写)
使用Pascal定义组件时，使用时两种命名风格都可以使用。比如注册时`Vue.component('MyComponentName', { /* ... */ })`，
使用则`<my-component-name>` 和 `<MyComponentName>`都可以。

在局部注册时，对于 components 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。

拓展一下，对于标签名称的编写。官方文档中风格指南里强烈推荐的写法是：
1. **在单文件组件、字符串模板和JSX中没有内容的组件应该是自闭合的，但在DOM模板里永远不要这样做。**因为HTML
并不支持自闭合的元素（除了官方的空元素）。
2. **对于绝大多数项目来说，在单文件组件和字符串模板中组件名应该是PascalCase的，但是在DOM模板中总是kebab-case的。**

## prop名大小写
**在声明prop的时候，其命名应该始终使用camelCase，而在模板和JSX中应该始终使用kebab-case**。在JavaScript中更自然的是camelCase，
而在HTML中则是kebab-case。
```javascript
props: {
  isShow: Boolean
}
```
```html
<Dialog is-show="false">
```