---
title: 图片拉伸的解决方案
---
## 图片锲合度的概念
大部分人接触到“填充、适应、拉伸、平铺、居中”这几个概念应该是在给电脑桌面设置壁纸时。但对于他们确切的概念又是怎样的，不知道各位，反正我是挺模糊的。所以在分享解决方案之前，先来捋下这几个概念。

**填充** 
图片等比缩放，溢出部分不会显示，优先满足长边。

**适应**
整体展示图片，如果图片比例和包裹区比例不一致，则按照图片比例显示。

**拉伸**
图片不会等比缩放，拉伸图片使其填满包裹区域，拉伸不够的地方，但能够保证图片整体都在包裹区内。

**平铺**
如果图片没有包裹区大，则图片会重复地铺在包裹区域内，直至填满包裹区。如果图片大于包裹区，则无视包裹大小，该多大就多大，溢出部分不会显示。

**居中**
图片按照原大小，整体居中处于包裹区水平垂直居中。

以上效果总结至windows的桌面壁纸设置项，不一定全，欢迎大家补充。另外，也并不一定和CSS中概念一致。

如下图所示，这就是图片拉伸的效果。本是一个长图，但硬是塞在了一个不等比的矩形区域内。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d960861d93344882beb4409adfd59f8b~tplv-k3u1fbpfcp-zoom-1.image)


图片拉伸的问题在日常的开发中也很常见，即便你会温柔地提示用户“请上传770 * 450 大小或符合此比例的图片”，然而还是会遇到没按照上传的情况。下面分享两种处理图片拉伸的解决方案。废话少说，先上[代码](https://codepen.io/Samliu/pen/ZEWLxGj)。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/301d13f019d544b4ad79551af41b095a~tplv-k3u1fbpfcp-zoom-1.image)


## background 属性
相对于另一种方式而言，通过背景图片的方式实现图片样式的各式调整应该各为人所知。
```html
  <div class="solution3">
    <h3>解决方案3</h3>
    <div class="tips">使用background属性解决</div>
    <div class="backimg"></div>
  </div>
```
### `background-size`的方案
```css
.solution3 .backimg {
  width: 100%;
  height: 100%;
  background-image: url("http://wechatapppro-1252524126.file.myqcloud.com/apppcHqlTPT3482/image/ke27xpa00vfhev5xuxgl.png");
  background-size: cover;
}
```
对于`background-size`属性而言，我们知道其可以设置如下类型的值用于指定背景图片的大小
- length 

	e.g background-size: 100px 200px; 设置背景图片的高度和宽度，第一个值设置宽度，第二个值设置高度。如果只给一个，另一个为auto。
- percentage
	
    e.g background-size: 100% 80%; 将计算相对于背景定位区域的百分比。第一个值设置宽度，第二个值设置高度。如果只给一个，另一个为auto。
- cover
	
    e.g background-size: cover; 此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最大大小。
- contain

	e.g background-size: contain; 此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最小大小。
    
设置`length` 和 `percentage`在当前的场景中我觉得还是略微鸡肋的，设置图片的宽高他还是会有个上边和左边的起点，这样就无法从整体上控制背景图。

而对于`cover`和`contain`文档的解释比较拗口，不是那么容易理解。（另外，菜鸟教程中对于这两个的值最大大小和最小大小解释是反的，但结合MDN文档和语义理解，我觉得cover为最大大小才是正确的。属性设置的主体是背景图，那cover即为覆盖意，若不是最大，如何覆盖整个背景。contain意味包含，同理。就这一点，欢迎大家补充内容）我觉得通过下面两张图就很容易这两个概念的不同了。
![cover](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e19616613044ff68ce22c71cd9ca26f~tplv-k3u1fbpfcp-zoom-1.image)
![contain](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dccbc1106b7b47d69dbba5d13e5668ae~tplv-k3u1fbpfcp-zoom-1.image)

总体来说，这个方案我觉得不够灵活，无法做到像下面的position一样指哪打哪。

### `background-position`的方案
```css
.solution3 .backimg {
  width: 100%;
  height: 100%;
  background-image: url("http://wechatapppro-1252524126.file.myqcloud.com/apppcHqlTPT3482/image/ke27xpa00vfhev5xuxgl.png");
  background-position: 50% 50%;
}
```
对于`background-position`属性而言，我们可以设置其如下的属性
- 方位值
	
  e.g left center; 即由 left top center bottom right等方位组成的值
  
- 百分比

  e.g 50% 50%; 即控制背景图片相对于包裹区的位置，第一个设置水平位置，第二个值设置垂直位置。
  
- 角度值

  e.g 10pos 20pos; 我目前还没有这个值如何设置
  
- inherit

  指定属性值从父元素继承

对于当前的场景，不管是长图或者是高图，我都可以通过百分比来确切地控制到底展示完整背景图中的哪一部分。

## object-fit 属性
前面说到，object-fit属性不那么为人所知晓（反正我是做这个需求时才知道=_= ），一个主要原因是该属性是CSS3中才有的。

`Object-fit`属性指定元素的内容应该如何去适应容器的高度与宽度，一般用于img和video标签。

对于`object-fit`属性，我们可以对其设置如下属性值。
- fill, 不保证保持原有的比例，内容拉伸填充整个内容容器
- contain, 保持原有尺寸比例。内容被缩放。
- cover, 保持原有尺寸比例，但部分内容可能被剪切。
- none, 保留原有元素内容的长度和宽度，也就是说内容不会被重置。
- scale-down, 保持原有尺寸比例，内容的尺寸与none或contain中的一个相同。
- initial, 设置默认值。
- inherit, 从该元素的父元素继承属性。

这里的`cover`和`contain`与上面在`background-size`中说到的还是较为一致的，而`fill`的效果就是我们想解决的问题。确切的效果体验还是到编辑器中会好一些，点击[这里](https://codepen.io/Samliu/pen/ZEWLxGj)。

