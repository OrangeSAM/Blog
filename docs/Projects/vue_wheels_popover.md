---
title: Vue造轮子之popover组件
---

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

**解决方案2.** 异步添加事件监听，有可能会遇到`$nextTick()`失效的问题，可以用`setTimeout`替换。
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
      console.log('2. 新增document监听')
      document.body.addEventListener('click', function handle () {
        this.visible = false
        console.log('3. 点击body就关闭popover')
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
    console.log('新增document监听')
    let eventHandler = () => {
      console.log('点击body就关闭popover')
      this.visible = false
      document.removeEventListener('click', eventHandler)
    }
    document.addEventListener('click', eventHandler)
  }, 0)
}
```

### 多次关闭
**问题6.** 在点击组件内的按钮时，由于冒泡机制的原因，关闭时会导致组件关闭一次，`document`又关闭一次。

**解决方案6.** 在按钮处添加`.stop`阻止冒泡。

### 内容点击
**问题7.** 点击内容区域也会导致内容隐藏

**解决方案7.** 在内容区域的`wrap`添加`@click.stop`阻止冒泡。

### 内容隐藏
**问题8.** 如果用户(使用这个UI库的人)在组件上加一个`wrap`，并设置`overflow: hidden`。会导致显示后的内容区域被隐藏。

**解决方案.** 设置内容区域的`z-index`，但并不能治本。由此，目前的思路行不通。