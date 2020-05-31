---
title: Flex布局
---
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

---
实现flex布局需要先指定一个容器，任何一个容器都可以被指定为flex布局，
这样容器内容的元素才可以使用flex来进行布局。
display：flex|inline-flex
	如果使用如div等块级元素就使用flex，如果使用行内样式，就使用inline-flex
	当设置flex布局之后，子元素的float、clear、vertical-align的属性将会失效
	有六种属性可以设置在容器上：
		○ flex-direction
		○ flex-wrap
		○ flex-flow
		○ Justify-content
		○ align-items
		○ Align-content
	
	Flex-direction，决定主轴的方向
			Row:主轴为水平方向，起点在左端（默认）
			row-reverse：主轴为水平方向，起点在右端 
			Column：主轴为垂直方向，起点在左端
			column-reverse：主轴为垂直方向，起点在右端
	Flex-wrap，决定容器内项目是否换行
			Nowrap:不换行，当主轴尺寸固定时，当空间不足时，
				项目尺寸会随之调整到而并不会挤到下一行；（默认）
			wrap：项目主轴总尺寸超出容器时换行，第一行在上方
			wrap-reverse：换行，第一行在下方
	flex-flow：flex-direction|flex-wrap
	Justify-content，定义了项目在主轴的对齐方式
			Flex-start：左对齐（默认）
			flex-end：右对齐
			center：居中
			space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙
			space-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边
					缘的间隔大一倍
	Align-items，定义了项目在交叉轴上的对齐方式（可理解为纵轴）
			stretch：默认值，即如果项目未设置高度或者设为auto，将占满整个容器的高度
			Flex-start：交叉轴的起点对齐
			Flex-end：交叉轴的终点对齐
			center：交叉轴的中点对齐
			Baseline:项目的第一行文字的基线对齐
	Align-content，定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性
			将不起作用 
			Flex-start：轴线全部在交叉轴上的起点对齐；
			Flex-end：轴线全部在交叉轴上的终点对齐；
			center：轴线的全部在交叉轴的中间对齐；
			Space-between：轴线两端对齐，之间的间隔相等，即剩余空间等分成间隙
			space-around：每个轴线之间的间隔相等，所以轴线之间的间隔比轴线与边缘的间隔大一倍
					
	有六种属性可运用在item上
		○ Order
		○ flex-basis
		○ Flex-grow
		○ flex-shrink
		○ Flex
		○ align-self
			
		order：定义项目在容器中的排列顺序，数值越小，排列越考前，默认值为0
		Flex-basis：定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性
			计算主轴是否有多余空间。当主轴为水平方向时，当设置了flex-basis，
			项目的宽度设置会失效，flex-basis需要跟flex-grow和flex-shrink配合使用才能发挥效果
			§ 当flex-basis值为0%时，是把该项目视为零尺寸的，故即使声明该尺寸为140px，也没用
			§ 当flex-basis值为auto时（项目本来大小），则根据尺寸的设定值（假定为100px），则这100px不会纳入剩余空间
		Flex-grow：定义项目的放大级别
			默认值为0，即如果存在剩余空间，也不放大
			当所有的项目都以flex-basis的值进行排列后，仍有剩余空间，那flex-grow就起作用了
			如果所有项目的flex-gro w属性都为1，则他们讲等分剩余空间（如果有的话）
			如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍，
			当然如果当所有项目以flex-basis的值排列完后发现空间不够了，且flex-wrap；nowrap时，此时flex-grow则不起作用了，这时候就需要flex-shrink
		flex-shrink：
			默认值:1，即如果空间不足，该项目将缩小，负值对该属性无效
			如果所有项目的flex-shrink属性都为1，当空间不足时，将等比例缩小
			如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小
		flex：flex-grow，flex-shrinkhe和flex-basis
		align-self：允许单个项目有与其他项目不一样的对齐方式
			单个项目覆盖align-items定义的属性
			默认为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch
			这个跟align-items属性一样的，只不过align-self是对单个项目生效的，而align-itms则是对
			容器下的所有项目生效的。
	
