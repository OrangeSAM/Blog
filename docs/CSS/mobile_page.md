---
title: 移动端页面
---
要回媒体查询 media query
必须得有设计图才写代码
学会隐藏元素
手机端需要加一个meta 
	meta vp 是为了解决之前ipone3gs时遇到的问题
	防止手机页面模拟980像素宽度document.documentElement.clientWidth
	
pc站和手机站的两种方式 
	两套代码 一套pc用  一套移动端用  music.163.com  music.163.com/m
	后端返回根据不同的useagent返回的HTML文档

手机端的交互方式不一样

使用link 标签时也可以使用媒体查询，会下载好，等到满足媒体查询条件才执行

为什么用了flex  float 就可以去死了
	因为使用父元素使用display:flex后，子元素的默认排布方向是横向，所以不需要浮动

移动端布局常用属性？
	flex  calc(50%-10px)

做一个媒体查询菜单栏的demo


所谓的响应式到底是什么？
	优点
	为什么用的不光

