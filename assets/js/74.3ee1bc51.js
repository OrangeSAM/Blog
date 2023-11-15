(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{274:function(n,t,e){"use strict";e.r(t);var r=e(3),o=Object(r.a)({},(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("p",[n._v("要解决的问题\n各个名词的概念\n页面的加载过程是怎样的")]),n._v(" "),e("p",[n._v("浏览器的高层架构\n用户界面 除当前显示标签页的其他部分\n浏览器引擎 在用户界面和呈现引擎之间传送指令\n呈现引擎 负责显示请求的内容，如HTML\n网络 用户网络调用，比如http请求，\nJavaScript解释器 用于解析和执行JavaScript代码\n数据存储 持久层，浏览器需要在硬盘上保存各种数据，cookie 缓存等\n用户界面后端 用于绘制基本的窗口小部件")]),n._v(" "),e("p",[n._v("值得注意的是，和大多数浏览器不同，Chrome 浏览器的每个标签页都分别对应一个呈现引擎实例。每个标签页都是一个独立的进程。")]),n._v(" "),e("p",[n._v("来自 "),e("a",{attrs:{href:"https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#1_1",target:"_blank",rel:"noopener noreferrer"}},[n._v("https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#1_1"),e("OutboundLink")],1)]),n._v(" "),e("p",[n._v("呈现引擎\n即渲染请求得到的内容，现在的使用场景中大部分是用来渲染和CSS一起的HTML和图片。\n分类\n呈现引擎(排版引起)主要分为两种\nGecko，Mozilla公司自研，Firefox使用\nWebkit，被用于Apple Safari，分支blink被用于基于chromium的网页浏览器（Opera Chrome）\n主流程\n解析HTML文档并开始构建DOM树，同时也解析外部CSS文件以及样式元素中的样式数据，这些带有视觉指令的样式信息将用于创建另一个树结构：呈现树。\n呈现树（由呈现对象组成）构建完后，进入布局阶段，即为每个树节点分配一个屏幕坐标\n最后是绘制，呈现引擎会遍历呈现树，由用户界面后端层将每个节点绘制出来。\n对于元素的放置，webkit使用的术语是布局，\n对于连接DOM节点和可视化信息从而创建呈现树的过程，webkit的术语是附加")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[n._v("解析文档是指将文档转化成有意义的结构，也就是可让代码理解和使用的结构。\n\n解析器和词法分析器的组合\n解析的过程可以分为两个子过程，词法分析和语法分析。\n词法分析是将输入内容分割成大量标记的过程，标记是构成内容的单位。\n语法分析是应用语言的语法规则的过程。\n词法分析器将输入内容分解成一个个有效标记后，语法分析根据语言的语法规则分析文档的结构，从而构建解析树。\n\n编译\n编译器将源代码解析成解析树，然后将解析树翻译成机器代码文档。\n\n解析器类型\n有两种基本类型的解析器，自上而下解析器和自下而上解析器\n\nHTML解析器，任务是将HTML标记解析成解析树。\n\nDOM 解析器的输出——“解析树”是由DOM元素和属性节点构成的树结构。DOM是HTML文档的对象表示，同时也是外部内容（JavaScript）与HTML元素之间的接口（我自己的一点看法，这一点非常重要，是使得前端能够繁荣很重要的原因。)\n解析树的根节点是Document对象\n\n解析算法\nHTML无法用常规的自上而下或自下而上的解析进行解析，因此，浏览器就创建了自定义的解析器进行解析HTML。\n算法包括标记化和树构建，由于HTML是由各种标签构成，标记化即是将输入内容(HTML文档)解析成多个标记。标记生成器识别标记，传递给树构造器，循环到标记完所有输入。\n\n解析结束后的操作\n这个阶段，浏览器会将文档标注为交互状态，并开始解析哪些处于defer模式的脚本，也就是那些应在文档解析完成后才执行的脚本。\n\nCSS解析\nWebkit CSS解析器\nWebkit 使用flex 和bison解析器生成器，通过CSS语法文件自动创建解析器，\nbison会创建自下而上的移位归约解析器\nFirefox使用的是人工编写的自上而下的解析器。\n这两种解析器都会将CSS文件解析成stylesheet对象，且每个对象都包含CSS规则。\n\n在DOM树构建的同时，浏览器还会构架另一个树结构：呈现树。\nwebkit对于树中元素的称呼称为呈现器或者呈现对象。\n\n每一个呈现对象都代表了一个矩形的区域（是不是即我们通常说的css盒子），通常对应于相关节点的CSS框。\n框的类型会受到与节点相关的display样式属性的影响。\n\n呈现树和DOM树的关系\n呈现器是和DOM元素想对应的，但并非一一对应。非可视化的DOM元素不会插入呈现树中。\n有一些呈现对象对应于DOM节点，但在树种所在的位置与DOM 节点不同，浮动定位和绝对定位的就是这样，他们处于正常的流程之外，放置在树中的其他地方，并映射到真正的框架，而放在原位的是占位框架。\n\n构建呈现树的流程\n在webkit中，解析样式和创建呈现器的过程称为附加，每个DOM节点都有一个attach方法。附加是同步进行的，将节点插入DOM树需要调用新的节点attach方法。\n\n样式计算\n构建呈现树时，需要计算每一个呈现对象的可视化属性，这是通过计算每个元素的样式属性来完成的。\n样式包含\n\t样式表\n\t\t浏览器默认样式表\n\t\t网页作者提供的样式表\n\t\t浏览器用户提供的用户样式表\n\tinline样式元素\n\tHTML中的可视化属性\n")])])])])}),[],!1,null,null,null);t.default=o.exports}}]);