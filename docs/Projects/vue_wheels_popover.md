---
title: Vue造轮子之popover组件
---

popover组件，实现上拍脑袋一想的话，其实很简单，主要是两部分组成，一是触发器，而是显示的内容，通过触发器和其他条件来判断是否显示内容区就Ok了。

但做完会发现，拍脑袋拍出来的都是坑。下面一一分解。


## 代码实现
**demo版本**

```html
  <div class='popover' @click='wrapClick'>
    <div class='content-wrapper' v-if='visible'>
      <slot name='content'></slot>
    </div>
    <slot></slot>
  </div>
```
```javascript
wrapClick () {
  this.visible = !this.visible
}
```
```scss
  .popover{
    display: inline-block;
    vertical-align: top;
    position: relative;
    .content-wrapper{
      position: absolute;
      bottom: 100%;
      border: 1px solid lightcoral;
    }
  }
```
组件内部包含两部分，按钮和要显示的内容。在最外层添加点击事件，点击显示内容部分，再次点击隐藏内容。
位置上将外层包裹容器定位设为`position: relative`，内容部分定位设置`position: absolute`。
示例如下(不知codesandbox有没有被限制)：

<div>   
    <iframe src="https://codesandbox.io/embed/exciting-stallman-klzsf?fontsize=14&hidenavigation=1&theme=dark"
         style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
         title="exciting-stallman-klzsf"
         allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
         sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
       ></iframe>
</div>

## 遇到的各式问题

### body点击
**问题1.** 点击body应该也能将内容部分隐藏。

**解决方案1.** 在body中添加事件监听，有click事件就将内容部分隐藏。
```javascript
wrapClick () {
  this.visible = !this.visible
  if (this.visible === true) {
     document.body.addEventListener('click', () => {
      this.visible = false
      console.log('点击body就关闭popover')
     })
  } 
}
```

### 冒泡机制
**问题2.** 由于冒泡机制的原因，导致wrap的点击事件传递到body，显示完就又立马被关闭。

**解决方案2.** 异步添加事件监听，有可能会因为Vue版本不同遇到`$nextTick()`失效的问题，详见这篇[文章](https://juejin.im/post/5c7674b5e51d4506304edb99)，可以用`setTimeout`替换。
```javascript
wrapClick () {
  this.visible = !this.visible
  console.log('1. 切换visible')
  if (this.visible === true) {
    this.$nextTick(() => {
      console.log('2. 新增document监听')
      document.body.addEventListener('click', () => {
        this.visible = false
        console.log('3. 点击body就关闭popover')
      })
    })
  } 
}
```

### body高度
**问题3.** 由于监听的是`body`，而不是`document`，导致页面高度不够的时候，无法点击隐藏内容部分。

**解决方案3.** 监听`document`而不是`body`。

### 事件注销
**问题4.** 第一次点击和第二次点击都是正常的（无论是点击按钮、还是页面。第一次点击显示，第二次点击隐藏）

**原因4.** 原因是，每一次的点击都会在`document`上添加`click`事件监听。第三次点击的时候会显示三个log。
因为在第一次点击时，`visible`为true，会为`document`添加一个`click`事件，供第二次点击隐藏使用。但这个监听事件没有被销毁，
一直存在，在第三次点击时，`visible`为true，又为document添加了一个`click`事件。同时，因为上次的监听事件没被销毁，第三次在
按钮上的点击冒泡到document，没被销毁的事件会被执行。
由下图可知，document上现在有两个事件监听，也打印了两次序号为2的log。
![打印的log](https://i.loli.net/2020/06/05/qtVPap7XWDGRM1u.png)
![document绑定的事件](https://i.loli.net/2020/06/05/mdFvkXONZwhtHJy.png)

**解决方案4.** 隐藏内容后，使用`removeEventListener`移除刚刚的事件监听器。但因为使用的是箭头函数没有名称，需要使用function 来为
handle声明函数。而由于function的使用会导致内外`this`不一致，使用`bind`往内部传入`this`。代码如下：
```javascript
if (this.visible === true) {
    this.$nextTick(() => {
      console.log('2. 新增document监听');
      document.body.addEventListener('click', function handle () {
        this.visible = false;
        console.log('3. 点击body就关闭popover');
        document.removeEventListener('click', handle)
      })
    }).bind(this)
} 
```

### 注销失败
**问题5.** bind返回是一个新函数，并不是`handle`。所以解决方案四的handle并不是最终事件处理函数，bind方法返回的才是。

**解决方案5.** 声明一个变量保存事件处理的箭头函数，见代码如下。
```javascript
if (this.visible === true) {
  setTimeout(() => {
    console.log('新增document监听');
    let eventHandler = () => {
      console.log('点击body就关闭popover');
      this.visible = false;
      document.removeEventListener('click', eventHandler)
    };
    document.addEventListener('click', eventHandler)
  }, 0)
}
```

### 多次关闭
**问题6.** 在点击组件内的按钮时，由于冒泡机制的原因，关闭时会导致组件关闭一次，`document`又关闭一次。

**解决方案6.** 在组件的`wrap`处添加`.stop`阻止冒泡。

### 内容点击
**问题7.** 点击内容区域也会导致内容隐藏

**解决方案7.** 在内容区域的`wrap`添加`@click.stop`阻止冒泡。

### 点击失效
**问题8.** 因为在组件上添加了阻止冒泡，如果用户在使用组件的时候对组件添加点击事件的监听会无效，因为被阻止了冒泡。

**解决方案8.** 目前无解，即当前阻止冒泡的机制是不行的。

### 内容隐藏
**问题9.** 如果用户(使用这个UI库的人)在组件上加一个`wrap`，并设置`overflow: hidden`。会导致显示后的内容区域被隐藏。

**解决方案9.** 设置内容区域的`z-index`，但并不能治本。由此，目前的思路行不通。目前的解决方案是将内容区层级提至`body`的直接子元素。
即点击的时候将内容区移动至`body`直接子元素级别，同时将内容区视觉上的位置处理到按钮边上。代码如下，`HTML`部分的代码略过，此处有两个需要注意的点是，
当元素的`v-if`为`false`时，无法通过`ref`拿到对应的元素，因为`v-if`处理的是元素是否会存在DOM中；通过`ref`也无法拿到`slot`标签的元素，需要在外面再包裹一层。
```javascript {3}
document.body.appendChild(this.$refs.content);
let {top, left} = this.$refs.trigger.getBoundingClientRect();
this.$refs.content.style.left = left + window.scrollX + 'px';
this.$refs.content.style.top = top + window.scrollY 'px';
```
在计算content的位置时，需要考虑到可视区域和页面高度的问题。screenX 和scrollX的区别在于?

但即便完成这些，相比ElementUI的Popover组件，也还是很多没实现的地方。这里就不放源码一一比较了。

## 最终效果
![](https://i.loli.net/2020/10/25/1RqJY6gWQsX9SZf.gif)