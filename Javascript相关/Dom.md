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

节点树
浏览器原生提供document节点，代表整个文档。
文档的第一层只有一个节点，就是HTML网页的第一个标签<html>，它构成了树结构的根节点。
除了根节点，其他节点都有三层关系
	父节点关系 parentNodes 
	子节点关系 childNodes 
	同级节点关系 sibling 拥有同一个父节点的节点
	


Node接口
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

