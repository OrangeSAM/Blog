---
title: HTML5
---
localstorage和storageweb存储
Localstorage.pagecount

Sessionstorage.pagecount

Html5新的input类型
	Email   提交时会自动校验是否为邮箱格式
	Url       检查是否为网址格式，前需加传输协议，如http
	Number  检查数值的类型，max min step（间隔） value （默认值）
	Range   显示为滚动条，可限定max min step value
	Date pickers  可选择类型，date month week time datetime datetime-local
	Search  常规文本域
	Color  显示选择颜色框
	
Html 新的表单元素  
	Datalist
		datalist元素规定输入域的选项列表
		列表时通过datalist内的option元素创建的
		可以用输入域的list属性引用datalist的ID
	Keygen
		作用是提供一种验证用户的可靠方法
	Output
		用于不同类型的输出
Html5新的表单属性
	新的form属性
		Autocomplete  可以在表单元素设置打开，可以在单个input元素设置关闭
		Novalidate 不对输入进行验证  novalidate="novadalite"
	新的input属性
		Autocomplete 规定自动填充
		Autofocus自动获得鼠标焦点，当多个输入框皆设置，按文档流顺序
		Form  规定输入域所属表单 一个以上 用空格分隔
		Form overrides 表单重写属性，重新设定form元素的某些属性设定
					可重写的属性有：formaction formenctype formmethod  formnocalidate  formtarget
		Height width 只适用于image类型的input标签
		List   规定输入域的datalist，datalist是输入域的选项列表
			适用于一下类型的input标签text search url telephone email datepickers
			Number range color
		Min max step  规定输入域范围
		Mutiple  规定输入域中可选择多个值  适用于一下标签 email file
		Pattern  规定用于验证input域的模式，也即正则表达式 可用于text search url telephone   
			Email password
		Placeholder 描述所期待的值，提供一种提示
		Required 必填项
	Meter 以图形化形式显示范围值
	Base target_blank  写在head里 以设定连接在新窗口打开
