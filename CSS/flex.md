flex之前
	normal flow 正常流
	float + clear
	position relative  + absolute
	display inline block 
	负margin
	
有flex
	块级布局侧重垂直方向，行内布局侧重水平方向 flex布局和方向无光
	flex 布局可以实现空间自动分配，自动对齐
	flex 适用于简单的额线性布局，更复杂的布局交给grid布局
	flex-direction 方向
	flex-wrap 换行
	flex-flow 上面两个的简写
	justify-content 主轴方向对齐方式
	align-items 侧轴对齐方式
		baseline 项目的第一行文字的基线对齐
		stretch  如果项目未设置高度或设或auto 子元素将占满整个容器的高度
	align-content 多行/列内容对齐方式 控制行与行 
基本概念
flex container的六个属性
flex item 的六个属性
	order 定义项目的排列顺序，数值越小， 排列越靠前，默认为0
	flex-basis 定义了在分配多余空间之前，项目占据主轴的空间。浏览器根据这个属性，计算主轴是否有多余空间，默认auto，即项目本来大小
	flex-grow:定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大，
		如果所有项目的flex-grow属性都为1,则他们将等分
![](https://i.loli.net/2020/04/01/aywiFSuCnfZJ7Ov.png)

flex-wrap:换行的条件是什么  一条轴线排不下   那是不是不换行 但宽度又不够，会自动压缩子元素的宽度

设置flex布局以后，子元素的float clear vertical-align 属性会失效  因为flex 有属性来实现这些效果。

网格布局

