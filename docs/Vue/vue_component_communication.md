---
title: 组价通信
---
## 父传子 
	props
	
## 子传父
	this.$emit('父组件中定义好的事件名'，需要传递的数据)
	
	方方的eventbus为什么也可以在各组件间传递消息
	
## 没有父子关系的
	vuex
	state
	mutation  this.$store.commit
	actions     this.$store.dispatch
	
	actions提交的是mutation，而不能直接变更状态
	actions可以包含异步操作，但是mutation只能包含同步操作
	
	getters     this.$store.getters
	
## vuex 状态管理的流程
	view actions mutations state view 
