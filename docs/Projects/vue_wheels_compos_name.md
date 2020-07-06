---
title: Vue组件中的名称探究
---
调试Bug不是太难的事，更难的事是取名字，而如何取好一个名字就显得尤为重要。在Vue中，有多处涉及到组件名称的使用，各处的风格有框架内的既定要求。


## 缘由
写这篇的缘由是之前在编写UI库的时候，遇到了引入组件时名称不规范的问题。

在写测试用例时，有个测试用例一直无法通过，但是来回看了很多遍代码逻辑和实例使用都没有问题，唯独报了个组件名称错误，改动后再测试，果然如此。
在单文件组件中局部注册组件时，没有安装规范取名，而正确的应该是`import WIcon from './icon'`
```javascript
import Wicon from './icon'
components: {Wicon}
```
上面代码在语法上虽然没有问题，但是在使用会有问题，如果在template中像这样使用引入的组件`<w-icon>`，
测试用例是会报错的。
```shell script
[vue warn] unknown custom element <w-icon>, did you resgister the components correctly?
For recursive components make sure to provide the "name" option
```
![](https://i.loli.net/2020/07/05/hoAviT1rZstkxOE.png)

## 官方建议
阅读了Vue文档中有关组件名的要求和建议后，罗列要点如下：

1. 组件名称中的两种风格

    组件名需要为多个单词（字母全小写且必须包含一个连字符，根组件以及`<transition>``<component>`之类的Vue内置组件除外）。这样做可以
    避免跟现有的以及未来的HTML元素向冲突，因为所有的HTML元素名称都是单个单词的。 
    
    a. **kebab-case**(短横线)(烤肉串)
    
    用短横线串联起各单词（是不是很有烤肉串的感觉），定义时使用kebab风格，在使用的时候也必须是kebab风格。
    比如注册时`Vue.component('my-component-name', { /* ... */ })`, 使用时`<my-component-name>`。

    b. **PascalCase**(单词首字母大写)
    
    使用Pascal风格定义组件时，使用时两种命名风格都可以使用。比如注册时`Vue.component('MyComponentName', { /* ... */ })`，
    使用则`<my-component-name>` 和 `<MyComponentName>`都可以。但是，如果直接在DOM(不是单文件组件中的`<template>`)中使用时只有kebab-case是有效的。
    这一点，即便我们很少直接HTML中使用组件，但还是要注意下。(经测试，不会报错，但无法渲染对应组件)
    
    在局部注册时，对于 components 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。
        
    ```javascript
        new Vue({
          el: '#app',
          components: {
            'component-a': ComponentA,
            'component-b': ComponentB
          }
        })
    ```
    
    但在使用用ES6之后，一般都是直接写成：
    ```javascript
        new Vue({
          el: '#app',
          components: {ComponentA, ComponentB}
        })
    ```
    项目中和组件名称相关的几个地方，新建组件时Option中的name、注册组件时组件的名称、在使用组件时的标签名、在Vue Devtools中查看组件结构时的组件名称。
    
    以button组件为例，在入口文件中注册的w-button, 是供在template里使用组件时编写的。而在组件内部声明的name, 可以在vue-devtools中看到组件的名称，可以用来标识组件，但并非唯一。

2. 对于标签名称的编写
    
    官方文档中风格指南里强烈推荐的写法是：
    
    a. **在单文件组件、字符串模板和JSX中没有内容的组件应该是自闭合的，但在DOM模板里永远不要这样做。** 因为HTML
    并不支持自闭合的元素（除了官方的空元素）。
    
    b. **对于绝大多数项目来说，在单文件组件和字符串模板中组件名应该是PascalCase的，但是在DOM模板中总是kebab-case的。**
    
    即如下是推荐的写法
    ```html
        <!-- 在单文件组件、字符串模板和 JSX 中 -->
        <MyComponent/>
        <!-- 在 DOM 模板中 -->
        <my-component></my-component>
    ```

3. prop的风格

    **在声明prop的时候，其命名应该始终使用camelCase，而在模板和JSX中应该始终使用kebab-case**。在JavaScript中更自然的是camelCase，
    而在HTML中则是kebab-case。
    ```javascript
        props: {
          isShow: {
           type: Boolean       
          }
        }
    ```
    ```html
     <Dialog is-show="false">
    ```
