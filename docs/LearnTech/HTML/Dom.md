---
title: Dom是什么
---

## DOM 是浏览器中的document对象。
window 对象表示一个包含DOM文档的窗口，其 document 属性指向窗口中载入的 DOM文档 。

DOM的作用是将网页转为一个JavaScript对象，从而可以用脚本进行各种操作。
浏览器会根据DOM模型，将如HTML这样的结构化文档解析成一系列的节点，再由这些节点组成一个树状结构。

DOM的最小组成单位叫做节点 node,文档的树形结构 DOM树，就是由各种不同类型的节点组成。

节点的类型有7种
Document 整个文档树的节点
DocumentType doctype标签
Element 网页的各种HTML标签
Attribute 网页元素的属性
Text 标签之间或标签包含的文本
Comment 注释
DocumentFragment 文档的片断
浏览器提供一个原生的节点对象Node，上面的七种节点都继承了Node，因此具有一些共同的属性和方法。

那么问题来了，DOM的继承机制和js的继承机制有没有关系呢

## 节点树
浏览器原生提供document节点，代表整个文档。
文档的第一层只有一个节点，就是HTML网页的第一个标签`<html>`，它构成了树结构的根节点。
除了根节点，其他节点都有三层关系
	父节点关系 parentNodes 
	子节点关系 childNodes 
	同级节点关系 sibling 拥有同一个父节点的节点
	


## Node接口
所有DOM节点对象都继承了Node接口，拥有一些共同的属性和方法。这是DOM操作的基础。
属性
	Node.prototype.Nodetype
	Node.prototype.NodeName
	Node.prototype.NodeValue
	Node.prototype.textContent
	Node.prototype.baseURI
	Node.prototype.ownerDocument
	Node.prototype.nextSibling
	Node.prototype.previousSibling
	Node.prototype.parentNode
	Node.prototype.parentElement
	Node.prototype.firstChild
	Node.prototype.lastChild
	Node.prototype.childNodes
	Node.prototype.isConnected
方法
	Node.prototype.appendChild()
	Node.prototype.hasChildNodes()
	Node.prototype.cloneNode()
	Node.prototype.insertBefore()
	Node.prototype.removeChild()
	Node.prototype.replaceChild()
	Node.prototype.contains()
	Node.prototype.compareDocumentPosition()
	Node.prototype.isEqualNode()
	Node.prototype.isSameNode()
	Node.prototype.normalize()
	Node.prototype.getRootNode()
	
NodeList接口，HTMLCollection接口
节点都是单个对象，DOM提供两种节点集合，用于容纳多个节点Nodelist和HTMLCollection
这两种集合都属于接口规范，两者区别Nodelist可以包含各种类型的节点，HTML只能包含HTML元素节点。


## 理解DOM结构
核心DOM，针对任何结构化文档的标准模型
XMLDOM，针对XML文档的标准模型
HTML DOM，针对HTML文档的标准模型


DOM节点，根据W3C的HTML DOM标准，HTML文档中的所有内容的都是节点
整个文档是一个文档节点
每个HTML元素是元素节点
HTML元素内的文本是文本节点
每个HTMl属性是属性节点
注释是注释节点

Document对象是HTML文档的根节点
Document对象使我们可以从脚本中对HTML页面中的所有元素进行访问
（Document对象是window对象的一部分，可通过window.document属性对其进行访问）
向文档添加事件句柄是什么意思
HTML DOM节点树
HTML文本 会被解析为DOM树，树中所有的节点均可通过JavaScript进行访问，所有HTML元素均可被修改，也可以创建或删除节点

### DOM元素对象
在HTML中，元素对象代表着一个HTML元素
元素对象的子节点可以是元素节点 文本节点 注释节点
NodeList对象代表了节点列表，类似于HTML元素的子节点集合
元素可以有属性，属性属于属性节点


DOM属性对象
HTMLDOM节点
ATTR对象，在HTMLDOM中，Attribute对象代表一个HTML属性
HTML属性总是属于HTML元素

NameNodeMap对象

HTML DOM事件 
DOM 事件允许JavaScript在HTML文档元素中注册不同事件处理程序
事件通常与函数结合使用，函数不会在事件发生前被执行

可以用于所有HTML元素的属性和方法http://www.w3school.com.cn/jsref/dom_obj_all.asp

### DOM事件对象
鼠标事件
拖动事件
键盘事件
框架/对象事件
表单事件
剪贴板事件
打印事件
多媒体事件
动画事件
过渡事件
其他事件


事件对象

## 节点属性
在DOM中 ，每个节点都是一个对象。DOM节点由三个重要的属性
nodeName:节点名称
nodeValue:节点的值
nodeType:节点的类型

nodeName:节点的名称，是只读的。
元素节点的nodeName与标签名相同
属性节点的nodeName是属性的名称
文本节点的nodeName永远是#text
文档节点的nodeName永远是#document

nodeValue 属性：节点的值
1. 元素节点的 nodeValue 是 undefined 或 null
2. 文本节点的 nodeValue 是文本自身
3. 属性节点的 nodeValue 是属性的值

nodeType 属性: 节点的类型，是只读的。以下常用的几种结点类型:
元素类型    节点类型
  元素          1
  属性          2
  文本          3
  注释          8
  文档          9



