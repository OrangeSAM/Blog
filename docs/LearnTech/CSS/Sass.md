---
title: Sass
---
## 慕课网sass
css预处理器用一种专门的编程语言，进行web页面样式设计，然后再编译成正常的css文件，以供项目使用。
css预处理器为css增加了编程的特性，无需考虑考虑浏览器兼容的问题
	变量 简单的逻辑程序 函数等等

sass是一门高于css的源语言，他能用来清晰地、结构化描述文件样式，有着比普通css更加强大的功能。
用ruby语言编写的 诞生于2007年 最大的成熟css预处理语言

字符和变量的组合
$border:5;
.border{

  border:solid #{$border}px
}

编译风格
Nested 嵌套缩进的css的代码是默认值
使用 --style compressed  //压缩风格的 

所有变量用$开头，如果变量需要嵌套在字符串中，就必须写在#{}之中

sass可进行运算
变量与值之间可使用除加法外的所有运算

复用
sass允许一个选择器继承另外一个选择器
@extend 

Mixin
	是可重用的代码块
	可传值 
@mixin center（$f）{
	Text-align:$f;
}
.~{
@include center(center);
} 

sass文件导入sass文件 
@import

可以是用 if
If else
If else if

//sass这样的注释不会出现在生存的css文件中
/**/这种注释内容会出现在生成的css文件中

### sass中文网
- 使用变量
	- 声明$与引用
	- 变量名用中划线
  
- 嵌套css规则
	- 父选择器的标识符 &
	- 群组选择器的嵌套
		- 群组选择器
			- .button,button{ margin:0;}
		- 群组选择器的嵌套
			.container{
				H1,h2,h3{margin-bottom:0.8em}
			}
	- 子组合选择器和同层组合选择器    >    +    ~
		- Article >section{border: 1px solid #ccc}
			选择article下紧跟着的子元素中命中section选择器的元素
		- Hearder + p {font-size:1.1em}
			选择hearder元素后紧跟的p元素
		- Article ~article {border-top：1px dashed #ccc}
			选择所有跟在article后的同层article元素，不管他们之间隔了多少元素
	- 嵌套属性
		- Nav{
			Border:{
			Style:solid;
			Width:1px;
			Color:#ccc;
			}
		}
		- 例外规则的缩写形式
		- Nav{
                Border:1px solid #ccc{
                    Left:0 px;
                    Right:0 px;
               }
            }
	- 导入sass文件
		- @import， e.g @import "colors"
			- sass的@import规则在生成css文件时就把相关文件导入进来
			- 所有在被导入文件定义的变量和混合器均可在导入文件中使用
		- 专门为@import命令而编写的sass文件，并不需要生成对应的独立css文件这样的sass文件称为局部文件。
			- 约定：sass局部文件的文件名以下划线开头
		- 默认变量值
			- ！default用于 变量，即如果这个变量被声明赋值了，那就用它声明的值，否则就用这个值
	- 嵌套导入
		- Aside{
			Background:blue;
			Color:white;
		}
		- .blue-theme{@import "blue-theme"}
		- 编译后
        .blue-theme{
			Aside{
			Background:blue;
			Color:white;
			}
		}
	- 注释
		//sass这样的注释不会出现在生存的css文件中
		/**/这种注释内容会出现在生成的css文件中
	- 混合器
		@mixin 名字
		@include 名字圈子2
		混合器可以传参
