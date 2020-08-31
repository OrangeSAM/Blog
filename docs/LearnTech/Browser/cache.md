---
title: 浏览器的缓存机制
---
1没有缓存
	只要请求了就返回
2有缓存，无更新
	请求了就缓存
3缓存加更新机制 
	给定资源过期的时间点信息
	expires:时间点
4缓存加更新升级版
	给定资源过期的时长
	cache-control：max-age=300 s
	
	public private no-cache no-store max-age
5缓存加更新机制终极版
	比对E-tag(If-None-Match)以确认文件是否有更新，没有的更新而返回的请求就是304，有更新就返回新文件
	
	与E-tag类似的 last-modified/If-Modifies-Since
