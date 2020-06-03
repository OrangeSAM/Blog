---
title: MongoDB
---

## 安装与配置

- 使用环境变量的目的是可以在命令行中直接使用，而不需要输入很长的路径。是不是跟 git bash 的 bias 有点像。
- 启用服务端的命令是 mongod
- 成功启动服务端之前需要在 C 盘根目录建立 data/db 这两个文件夹
- 默认端口是 27017

- 再次打开一个命令行链接服务端，命令是 mongo
- 几个简单的命令 show dbs db.version()

## shell 命令

- var 声明命令， print 打印
- 进入某个数据库 use admin
- 查看集合 show collections
- 查看当前库 db

库的下面是集合，集合下面是文件

mongo 小驼峰命名法

mongo 没有列的概念

- use db 名 建立数据库
- db.集合.insert() 新建数据集合和插入文件(数据)
- db.集合.find() 查询所有数据
- db.集合.findOne() 查询第一个数据文件
- db.集合.update({查询},{修改}) 当查询到有多个值,只修改第一个
- db.集合.remove(条件)删除文件数据
- db.集合.drop() 删除整个集合
- db.dropDatabase()删除整个数据库,需要先进入某个数据库

#### 用 js 文件写 mongo 命令

使用 let 可能会遇到 mongo 兼容的问题，用 var

执行写好的 mongo 文件，用 mongo + 文件名, 而且需要在当前路劲下

干啥之前都要先启动 mongo 的服务

用 load 来执行 js 文件是另一种操作?

爬虫相关模块合集
superagent(chart-set || retry)
cheerio
fs
excel

- node xlsx
- async
