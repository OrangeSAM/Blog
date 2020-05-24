---
title: 盒模型
---
盒模型是网页布局的基础，每个元素都被表示为一个矩形的方框

Width  min-width max-width
Height  min-height max-height

Boder默认为0
外边距有一个特别的行为被称作 外边距塌陷 margin collapsing
当两个框彼此接触时，他们的间距蒋取两个相邻外边界的最大值，而非两者的总和。

外边距塌陷和外边距合并是个值得研究的问题。

默认情况下background-color/background-Image 延伸到了border的边缘。
框的高度不遵守百分比的长度，框的高度总是采用框内容的高度，除非指定一个绝对的高度。
boder也忽略百分比宽度设置。

Background-clip是个好东西

Outline 在margin之内

对行内元素设置宽高无效，设置padding，margin，border都会更新周围文字的位置，但是对于周围的边框block box 不会有影响。
行内块状框inline-box，不会重新另起一行，但会像行内框inline一样随着周围文字流动，而且它能够设置宽高，并且像块框一样保持了其块特性的完整性，不会在段落中断开。

只有普通文档流中块框的垂直外边距才会发生外边距合并。行内框，浮动框或绝对定位之间的外边距不会合并。


• 如果盒子的高度被设置为百分比长度，那么盒子高度不会遵循这个设置了的百分比长度，而是总会采用盒子内容的高度，除非给它设置了一个绝对高度（例如，像素或者 em）。这比把页面上每个盒子的高度默认设置为视口高度的 100% 更方便。

来自 <https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_boxes/Box_model_recap> 

• 边界（border）也会忽略百分比宽度设置。
• 外边距（margin）有一个特殊的行为，称为 外边距塌陷： 当两个盒子挨在一起时，二者之间的距离为两个挨着的外边距中最大的那个值，而不是二者的和。

来自 <https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_boxes/Box_model_recap> 


Max-width
max-width属性的另一个好处是可以将容器内的媒体（例如图像和视频）控制在容器内。 回到上面的例子，图像会引起一个问题——起初它的显示正常，但当容器变得比图像更窄时，图像开始溢流容器（因为它是一个固定的宽度）。 要应对这类图像的问题，我们可以在其上设置以下声明：
display: block;
margin: 0 auto;
max-width: 100%;
前两条样式规则可以使它的展示行为像一个块元素并且在父容器内居中。真正神奇的是第三条——这个限制了图像的宽度使它的最大宽度与父容器的宽度相等。因此，当父容器宽度缩小到小于图像的宽度时，图像会一起缩小。
您可以在 min-max-image-container.html (看代码) 尝试以上修改过的代码。

来自 <https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_boxes/Box_model_recap> 


常见的display的类型
 display 可以有很多种不同的值, 其中三种常见的值为 block, inline, 和 inline-block.
• 块盒(block box)是被定义为堆放在其它盒子之上的盒子（即盒子之前以及之后的内容出现在不同的行上），并且可以给它设置高度和宽度。上面所述的整个盒模型都适用于块盒。
• 行内盒（inline box）与块盒相反：它跟随文档的文本流堆放（即，它会与周围的文本和其它行内元素出现在同一行，并且其内容会像段落中的文本行一样，随着文本流换行）。宽度和高度设置对行内盒无效；在行内盒上的所有内边距、外边距和边界设置会改变周围文本的位置，但是不会影响周围块盒的位置。
• 行内块盒（inline-block box）介于前两者之间： 它会像行内盒一样，跟随周围的文本流堆放，不会在其前后创建换行；不过，它可以像块盒一样，使用宽度和高度设置大小，并且维护其块完整性 — 它不会跨段落行换行（对于一行文本容纳不下的行内盒，会落到第二行上，因为第一行上没有足够的空间容纳它，并且不会跨两行换行）。

来自 <https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_boxes/Box_model_recap> 




