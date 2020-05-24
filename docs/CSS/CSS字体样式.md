
字体大小的单位，可以被归为两类绝对单位和相对的。 in cm mm pt pc
xx-small等也是绝对定位
相对定位
px
em相对父元素，字体的大小。
ex %
larger smaller

字体粗细
font-weight
normal   bold
border lighter，这是相较于normal字体粗细而言

100 200 300 400 500 600 700 800 900
默认是normal 相当取值400
bold表示粗体，相当于取值700或使用b标签

斜体
font-style
normal
italic 斜体
oblique倾斜的字体 仅对拉丁文有效

装饰线
除去none 还有 underline  overline line-through
blink
在css2中 text-decoration属于文本属性，在css3中则把text-decoration归位独立的一类：文本装饰，同时拓展多个子属性。
text-decoration-line  color   style  skip   position

 字体大小写
text－transform：none | capitalize | lowercase

文本水平对齐
text－align：center | left | right | justify(两端对齐)
css3 为text －align属性新增四个值支持较少 ，暂且不踢

## text- align 是文本属性,仅作用于行内文本或内联元素如img a 。
如果是设计块级元素水平对齐，需要使用到margin属性或者float 属性

文本垂直对齐
略？

字间距和词间距
letter－spacing 属性定义字符间距
word－spacing 属性定义单词间距
词间距 其本身需要有空格
几乎不用到，无需记住

行高
Line-height:normal | length
Normal 是默认值一般为1.2em,length 表示百分比数组，或者由浮点数字和单位标识符组成的
长度值，允许为负值
em是相对数值，pt为绝对数值
行间距一般使用em或百分比

首行缩进 
text－indent 
text－ indent：length    length表示百分比数字也可以是由浮点数字和单位标识符组成的长度值，允许为赋值
eg  p{text-indnet:2em}

实例
	Display:inline语句的作用就是把元素设置为行内元素
	特点如下：
		多个inline元素可以在一行内显示
		行高和上下边界不可改变
		文字或图片的宽度也不可改变
	Span a label input img strong em 等都是inline元素
	
	text-align：center与margin:0 auto配合适用，目的居中

浏览一遍完成
