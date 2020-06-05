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

问题1. 点击body应该也能将内容部分隐藏。
解决方案1. 在body中添加事件监听，有click事件就将内容部分隐藏。
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
问题2. 由于冒泡机制的原因，导致wrap的点击事件传递到body，显示完就又立马被关闭。
解决方案2. 异步添加事件监听
```javascript
wrapClick () {
  this.visible = !this.visible
  if (this.visible === true) {
    this.$nextTick(() => {
      document.body.addEventListener('click', () => {
        this.visible = false
        console.log('点击body就关闭popover')
      })
    })
  } 
}
```
问题3. 由于监听的是`body`，而不是`document`，导致页面高度不够的时候，无法点击隐藏内容部分。
解决方案3. 监听`document`而不是`body`
